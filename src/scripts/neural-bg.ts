// Background: a layered neural network drifting in 3D. Signals fire forward from the
// input layer and gently tint each node they reach.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from 'three';

const pointVertex = /* glsl */ `
  attribute float aAct;
  uniform float uSize;
  uniform float uScale;
  varying float vAct;
  void main() {
    vAct = aAct;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uSize * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const pointFragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  uniform float uAlpha;
  varying float vAct;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.3, d) * uAlpha * mix(0.7, 1.0, vAct);
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(uBase, uAccent, vAct), a);
  }
`;

function pointMaterial(size: number, alpha: number) {
  return new ShaderMaterial({
    uniforms: {
      uSize: { value: size },
      uScale: { value: 1 },
      uBase: { value: new Color() },
      uAccent: { value: new Color() },
      uAlpha: { value: alpha },
    },
    vertexShader: pointVertex,
    fragmentShader: pointFragment,
    transparent: true,
    depthWrite: false,
  });
}

interface Edge { from: number; to: number }
interface Pulse { edge: number; t: number; speed: number }

export function start(canvas: HTMLCanvasElement) {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch {
    return; // No WebGL: the page simply has a plain background.
  }

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = innerWidth < 700;

  const scene = new Scene();
  const camera = new PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 16);

  const net = new Group();
  scene.add(net);

  // --- Nodes, arranged in layers along x, each layer a loose disc in y/z.
  const layerSizes = small ? [5, 8, 9, 8, 5] : [7, 11, 14, 14, 11, 7];
  const spanX = 24;
  const nodes: Vector3[] = [];
  const layerOf: number[] = [];
  const layerStart: number[] = [];
  layerSizes.forEach((n, li) => {
    layerStart.push(nodes.length);
    const x = -spanX / 2 + (spanX * li) / (layerSizes.length - 1);
    const radius = 3 + n * 0.32;
    for (let i = 0; i < n; i++) {
      const y = -radius + (2 * radius * (i + 0.5)) / n + (Math.random() - 0.5) * 0.6;
      const z = (Math.random() - 0.5) * 3.5;
      nodes.push(new Vector3(x + (Math.random() - 0.5) * 1.2, y, z));
      layerOf.push(li);
    }
  });

  // --- Connections: each node links to a handful of nodes in the next layer.
  const edges: Edge[] = [];
  const outgoing: number[][] = nodes.map(() => []);
  for (let li = 0; li < layerSizes.length - 1; li++) {
    const nextStart = layerStart[li + 1];
    const nextSize = layerSizes[li + 1];
    for (let a = layerStart[li]; a < layerStart[li] + layerSizes[li]; a++) {
      const targets = new Set<number>();
      const want = Math.min(nextSize, 3 + Math.floor(Math.random() * 3));
      while (targets.size < want) targets.add(nextStart + Math.floor(Math.random() * nextSize));
      for (const b of targets) {
        outgoing[a].push(edges.length);
        edges.push({ from: a, to: b });
      }
    }
  }

  const nodePos = new Float32Array(nodes.length * 3);
  nodes.forEach((p, i) => p.toArray(nodePos, i * 3));
  const nodeAct = new Float32Array(nodes.length);
  const nodeGeo = new BufferGeometry();
  nodeGeo.setAttribute('position', new BufferAttribute(nodePos, 3));
  nodeGeo.setAttribute('aAct', new BufferAttribute(nodeAct, 1));
  const nodeMat = pointMaterial(0.12, 0.9);
  net.add(new Points(nodeGeo, nodeMat));

  const linePos = new Float32Array(edges.length * 6);
  edges.forEach((e, i) => {
    nodes[e.from].toArray(linePos, i * 6);
    nodes[e.to].toArray(linePos, i * 6 + 3);
  });
  const lineGeo = new BufferGeometry();
  lineGeo.setAttribute('position', new BufferAttribute(linePos, 3));
  const lineMat = new LineBasicMaterial({ transparent: true, depthWrite: false });
  net.add(new LineSegments(lineGeo, lineMat));

  // --- Signals travelling along the connections (not drawn; they just light up nodes).
  const firstLayer = layerSizes[0];
  const pulseCount = small ? 22 : 40;
  const pulses: Pulse[] = [];
  const spawn = (p?: Pulse): Pulse => {
    const startNode = Math.floor(Math.random() * firstLayer);
    const list = outgoing[startNode];
    const pulse = p ?? { edge: 0, t: 0, speed: 0 };
    pulse.edge = list[Math.floor(Math.random() * list.length)];
    pulse.t = -Math.random() * 2.5; // stagger starts
    pulse.speed = 0.35 + Math.random() * 0.35;
    return pulse;
  };
  for (let i = 0; i < pulseCount; i++) pulses.push(spawn());


  // --- Colours follow the site theme.
  const applyTheme = () => {
    const css = getComputedStyle(document.documentElement);
    const dark = document.documentElement.classList.contains('dark');
    const ink = new Color(css.getPropertyValue('--color-ink').trim() || '#18212c');
    const accent = new Color(css.getPropertyValue('--color-marigold').trim() || '#e39b2d');
    nodeMat.uniforms.uBase.value.copy(ink);
    nodeMat.uniforms.uAccent.value.copy(accent);
    nodeMat.blending = dark ? AdditiveBlending : NormalBlending;
    nodeMat.uniforms.uAlpha.value = dark ? 0.4 : 0.35;
    lineMat.color.copy(ink);
    lineMat.opacity = dark ? 0.1 : 0.09;
    render();
  };
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  // --- Sizing.
  const resize = () => {
    const w = innerWidth;
    const h = innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const visibleWidth = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect;
    net.scale.setScalar(Math.min(1.15, Math.max(0.55, visibleWidth / (spanX + 4))));
    const scale = h * renderer.getPixelRatio() * 0.5;
    nodeMat.uniforms.uScale.value = scale;
    render();
  };

  // --- Motion: slow drift, a little pointer parallax, a little scroll.
  const pointer = { x: 0, y: 0 };
  addEventListener('pointermove', (e) => {
    pointer.x = e.clientX / innerWidth - 0.5;
    pointer.y = e.clientY / innerHeight - 0.5;
  }, { passive: true });

  function render() {
    renderer.render(scene, camera);
  }

  let last = performance.now();
  let elapsed = 0;
  let running = false;

  const step = (dt: number) => {
    elapsed += dt;
    const scrollTurn = scrollY / Math.max(1, document.body.scrollHeight - innerHeight);
    const targetY = Math.sin(elapsed * 0.08) * 0.28 + pointer.x * 0.25 + scrollTurn * 0.6;
    const targetX = Math.sin(elapsed * 0.06) * 0.12 + pointer.y * 0.15;
    net.rotation.y += (targetY - net.rotation.y) * Math.min(1, dt * 2);
    net.rotation.x += (targetX - net.rotation.x) * Math.min(1, dt * 2);

    for (let i = 0; i < nodeAct.length; i++) nodeAct[i] = Math.max(0, nodeAct[i] - dt * 1.4);

    pulses.forEach((p) => {
      p.t += dt * p.speed;
      const e = edges[p.edge];
      if (p.t >= 1) {
        nodeAct[e.to] = 1;
        const next = outgoing[e.to];
        // Most signals carry on to the next layer; some fade out early.
        if (next.length && Math.random() < 0.85) {
          p.edge = next[Math.floor(Math.random() * next.length)];
          p.t = 0;
        } else {
          spawn(p);
        }
      }
    });

    nodeGeo.attributes.aAct.needsUpdate = true;
  };

  const loop = (now: number) => {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    step(dt);
    render();
    requestAnimationFrame(loop);
  };

  const play = () => {
    if (running || reduceMotion || document.hidden) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(loop);
  };

  // A booking (or anything else) can fire every signal at once from the input layer.
  addEventListener('neural:burst', () => {
    for (let i = 0; i < firstLayer; i++) nodeAct[i] = 1;
    for (const p of pulses) {
      spawn(p);
      p.t = 0;
      p.speed = 0.6 + Math.random() * 0.4;
    }
    if (reduceMotion) {
      step(0.4);
      render();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) running = false;
    else play();
  });
  addEventListener('resize', resize);

  resize();
  if (reduceMotion) step(1.5); // a still frame with a few signals mid-flight
  applyTheme();
  canvas.classList.add('is-ready');
  play();
}
