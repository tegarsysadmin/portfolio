import { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265359
#define TAU 6.28318530718

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash2(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p, int octaves) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 8; i++) {
    if (i >= octaves) break;
    v += a * vnoise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

vec2 dfbm(vec2 p, int octaves) {
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  vec2 d = vec2(0.0);
  float freq = 1.0;
  for (int i = 0; i < 8; i++) {
    if (i >= octaves) break;
    float n = vnoise(p * freq);
    float dx = (vnoise((p + vec2(0.01, 0.0)) * freq) - n) * 50.0;
    d += vec2(dx, 0.0) * a * freq;
    p = p * 2.0 + vec2(100.0);
    a *= 0.5;
    freq *= 2.0;
  }
  return d;
}

float warpField(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + t * 0.04, 4),
    fbm(p + vec2(5.2, 1.3) + t * 0.05, 4)
  );
  vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.03, 4),
    fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.04, 4)
  );
  return fbm(p + 4.0 * r, 5);
}

float energyBand(vec2 uv, float angle, float width, float intensity, float t) {
  vec2 ca = vec2(cos(angle), sin(angle));
  float proj = dot(uv, ca);
  float d = abs(proj) / width;
  float pulse = 0.8 + 0.2 * sin(t * 0.6 + angle * 3.0);
  float n1 = vnoise(vec2(proj * 3.0, t * 0.15));
  float n2 = vnoise(vec2(proj * 8.0, t * 0.3 + 50.0));
  float detail = 0.6 * n1 + 0.4 * n2;
  float shape = exp(-d * d * 2.5);
  float ripple = 0.05 * sin(proj * 15.0 + t * 0.8) * exp(-abs(proj));
  return clamp((shape * pulse + ripple) * intensity * (0.7 + 0.3 * detail), 0.0, 1.0);
}

float halo(vec2 uv, float radius, float t) {
  float d = length(uv);
  float breathe = 1.0 + 0.03 * sin(t * 0.4);
  float db = d / (radius * breathe);
  float ring = exp(-pow(abs(db - 1.0), 2.0) * 30.0);
  float turbulence = 0.15 * vnoise(vec2(atan(uv.y, uv.x) * 6.0, t * 0.2));
  return ring * (0.6 + turbulence);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  float t = u_time;

  vec2 orbit = vec2(cos(t * 0.12) * 0.08, sin(t * 0.09) * 0.06);
  uv += orbit;

  float dist = length(uv);

  float rotation = t * 0.025;
  float ca = cos(rotation);
  float sa = sin(rotation);
  uv = mat2(ca, -sa, sa, ca) * uv;

  float warp = warpField(uv * 1.5, t);

  float b1 = energyBand(uv, 0.3 + warp * 0.15, 0.35, 1.0, t);
  float b2 = energyBand(uv, 0.3 + PI / 3.0 + warp * 0.12, 0.30, 0.85, t + 1.0);
  float b3 = energyBand(uv, 0.3 + 2.0 * PI / 3.0 + warp * 0.10, 0.25, 0.7, t + 2.0);
  float b4 = energyBand(uv, 0.3 + PI + warp * 0.08, 0.20, 0.55, t + 3.0);
  float b5 = energyBand(uv, 0.3 + 4.0 * PI / 3.0 + warp * 0.06, 0.18, 0.4, t + 4.0);
  float b6 = energyBand(uv, 0.3 + 5.0 * PI / 3.0 + warp * 0.05, 0.15, 0.3, t + 5.0);

  vec3 c1 = vec3(0.043, 0.067, 0.125);
  vec3 c2 = vec3(0.086, 0.137, 0.251);
  vec3 c3 = vec3(0.133, 0.224, 0.4);
  vec3 c4 = vec3(0.294, 0.514, 0.949);
  vec3 c5 = vec3(0.549, 0.706, 1.0);

  vec3 col = c1;
  col = mix(col, c2, b1 * 0.5);
  col = mix(col, c3, b2 * 0.4);
  col = mix(col, c4, b3 * 0.3);
  col = mix(col, c4 * 1.1, b4 * 0.25);
  col = mix(col, c5, b5 * 0.2);
  col = mix(col, c5 * 1.2, b6 * 0.15);

  col += c5 * halo(uv, 0.65, t) * 0.08;

  float flicker = pow(vnoise(vec2(t * 0.7, 0.0)), 4.0);
  col += vec3(0.6, 0.75, 1.0) * flicker * 0.03;

  float flicker2 = pow(vnoise(vec2(t * 1.3 + 100.0, 50.0)), 5.0);
  col += vec3(0.5, 0.65, 0.9) * flicker2 * 0.015;

  float vignette = smoothstep(0.0, 1.0, 1.0 - dot(uv, uv) * 0.35);
  col *= 0.6 + 0.4 * vignette;

  float grain = (hash(gl_FragCoord.xy + fract(t * 43.0) * 1000.0) - 0.5) * 0.015;
  col += grain;

  col = col / (1.0 + col * 0.15);
  col = pow(max(col, vec3(0.0)), vec3(0.95));

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface PlasmaCanvasRef {
  pause: () => void;
  resume: () => void;
}

const PlasmaCanvas = forwardRef<PlasmaCanvasRef>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const isRunningRef = useRef(true);
  const timeLocationRef = useRef<WebGLUniformLocation | null>(null);
  const resolutionLocationRef = useRef<WebGLUniformLocation | null>(null);

  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    if (!gl) return;
    glRef.current = gl;

    // Compile vertex shader
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERTEX_SHADER);
    gl.compileShader(vs);

    // Compile fragment shader
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAGMENT_SHADER);
    gl.compileShader(fs);

    // Create program
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    // Create fullscreen triangle
    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Bind attribute
    const aPosLocation = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPosLocation);
    gl.vertexAttribPointer(aPosLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    timeLocationRef.current = gl.getUniformLocation(program, 'u_time');
    resolutionLocationRef.current = gl.getUniformLocation(program, 'u_resolution');

    // Set WebGL state
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    startTimeRef.current = performance.now();
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    if (!canvas || !gl) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      if (resolutionLocationRef.current) {
        gl.uniform2f(resolutionLocationRef.current, w, h);
      }
    }
  }, []);

  const render = useCallback(() => {
    const gl = glRef.current;
    if (!gl || !isRunningRef.current) return;

    resize();

    const time = (performance.now() - startTimeRef.current) * 0.001;
    if (timeLocationRef.current) {
      gl.uniform1f(timeLocationRef.current, time);
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    animFrameRef.current = requestAnimationFrame(render);
  }, [resize]);

  useImperativeHandle(ref, () => ({
    pause: () => {
      isRunningRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
    },
    resume: () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animFrameRef.current = requestAnimationFrame(render);
      }
    },
  }));

  useEffect(() => {
    initGL();
    resize();
    animFrameRef.current = requestAnimationFrame(render);

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      isRunningRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [initGL, resize, render]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
});

PlasmaCanvas.displayName = 'PlasmaCanvas';
export default PlasmaCanvas;
