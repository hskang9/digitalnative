import * as THREE from "three";
import { CSS3DObject, CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";
import { SPACES } from "./spaces";
import { dampTourValue } from "./tour-path.mjs";

// Original storybook architecture: real geometry, not a video background.
export function createGarden(host, onFailure, onReady, onNavigate) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" }); }
  catch { return null; }
  const resources = new Set();
  const keep = (resource) => { resources.add(resource); return resource; };
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x092f35);
  scene.fog = new THREE.Fog(0x092f35, 65, 140);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 180);
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, host.clientWidth < 700 ? 1.25 : 1.5));
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const contentScene = new THREE.Scene();
  const contentRenderer = new CSS3DRenderer();
  contentRenderer.domElement.className = "spatial-content-renderer";
  host.appendChild(contentRenderer.domElement);
  const roomPanels = [], roomMounts = [], destinations = [];
  let panelWidth = 850, panelHeight = 560, narrow = host.clientWidth < 700;
  let seed = 3819;
  const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; };
  const gradient = keep(new THREE.DataTexture(new Uint8Array([90, 170, 225, 255]), 4, 1, THREE.RedFormat));
  gradient.minFilter = gradient.magFilter = THREE.NearestFilter; gradient.needsUpdate = true;
  const toon = (color, map) => keep(new THREE.MeshToonMaterial({ color, map, gradientMap: gradient }));
  const ink = keep(new THREE.LineBasicMaterial({ color: 0x2b3b32, transparent: true, opacity: 0.56 }));
  const cube = keep(new THREE.BoxGeometry(1, 1, 1));
  const cubeEdges = keep(new THREE.EdgesGeometry(cube));
  const foliageGeo = keep(new THREE.IcosahedronGeometry(1, 1));
  const wood = toon(0x815332), cream = toon(0xf0dba1), roof = toon(0xb9663d);
  const teal = toon(0x237a79), dark = toon(0x203e37), glass = toon(0x527574), bark = toon(0x365247);
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = textureCanvas.height = 256;
  const ctx = textureCanvas.getContext("2d");
  let plaster;
  if (ctx) {
    ctx.fillStyle = "#fff7e4"; ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 5200; i++) {
      ctx.fillStyle = `rgba(108,78,39,${random() * 0.1})`;
      ctx.fillRect(random() * 256, random() * 256, 1 + random() * 3, 1 + random() * 2);
    }
    plaster = keep(new THREE.CanvasTexture(textureCanvas)); plaster.colorSpace = THREE.SRGBColorSpace;
  }
  const model = new THREE.Group(); scene.add(model);
  function mesh(geometry, material, x, y, z, parent = model, outlined = false) {
    const item = new THREE.Mesh(geometry, material); item.position.set(x, y, z); parent.add(item);
    if (outlined) item.add(new THREE.LineSegments(geometry === cube ? cubeEdges : keep(new THREE.EdgesGeometry(geometry, 30)), ink));
    return item;
  }
  function box(w, h, d, x, y, z, material, parent = model, outlined = true) {
    const item = mesh(cube, material, x, y, z, parent, outlined); item.scale.set(w, h, d); return item;
  }
  function arch(width, height) {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2, 0); shape.lineTo(width / 2, 0); shape.lineTo(width / 2, height - width / 2);
    shape.absarc(0, height - width / 2, width / 2, 0, Math.PI, false); shape.closePath();
    return keep(new THREE.ExtrudeGeometry(shape, { depth: 0.12, bevelEnabled: false, curveSegments: 16 }));
  }
  const outerArch = arch(1.9, 3.2), innerArch = arch(1.55, 2.92);
  function windowAt(x, y, z, parent, door = false) {
    mesh(outerArch, cream, x, y, z, parent, true);
    mesh(innerArch, door ? wood : dark, x, y + 0.12, z + 0.13, parent, true);
    if (door) {
      for (let i = 0; i < 6; i++) box(0.035, 2.25, 0.025, x - 0.6 + i * 0.24, y + 1.28, z + 0.29, roof, parent, false);
    } else {
      box(1.31, 1.95, 0.05, x, y + 1.25, z + 0.28, glass, parent);
      box(0.08, 2.45, 0.09, x, y + 1.47, z + 0.35, cream, parent);
      box(1.45, 0.08, 0.09, x, y + 1.4, z + 0.35, cream, parent);
      for (const side of [-1, 1]) {
        box(0.43, 2.38, 0.09, x + side * 1.13, y + 1.4, z + 0.11, wood, parent);
        for (let i = 0; i < 9; i++) box(0.38, 0.025, 0.04, x + side * 1.13, y + 0.45 + i * 0.23, z + 0.18, cream, parent, false);
      }
    }
    box(2.16, 0.15, 0.52, x, y - 0.02, z + 0.2, cream, parent);
  }
  const plants = [];
  const plantColors = [0x748546, 0x9b9c46, 0xaab459, 0x4d743e, 0x658443];
  function crown(x, y, z, radius, count = 20, colors = plantColors) {
    for (let i = 0; i < count; i++) {
      const angle = random() * Math.PI * 2, level = random() * 2 - 1;
      const r = Math.sqrt(1 - level * level) * radius * Math.cbrt(random());
      const size = radius * (0.24 + random() * 0.28);
      plants.push({ x: x + Math.cos(angle) * r, y: y + level * radius * 0.8, z: z + Math.sin(angle) * r,
        sx: size, sy: size * (0.65 + random() * 0.35), sz: size, color: colors[Math.floor(random() * colors.length)] });
    }
  }
  function planter(x, y, z, width = 2, parent = model) {
    box(width, 0.43, 0.63, x, y, z, teal, parent);
    box(width + 0.12, 0.12, 0.73, x, y + 0.23, z, cream, parent);
  }
  function railing(x, y, z, width, parent) {
    box(width, 0.1, 0.12, x, y + 0.95, z, wood, parent);
    for (let i = 0; i <= Math.floor(width / 0.38); i++) box(0.055, 0.9, 0.055, x - width / 2 + i * 0.38, y + 0.45, z, wood, parent, false);
  }
  SPACES.forEach((space, index) => {
    const [x, y, z] = space.position;
    const floor = new THREE.Group(); floor.position.set(x, y, z); model.add(floor);
    box(9.4, 5.6, 6.4, 0, 0, -3.35, toon(space.color, plaster), floor);
    box(9.9, 0.22, 7.1, 0, -2.8, -3.15, cream, floor);
    box(10.1, 0.18, 7.3, 0, 2.8, -3.15, cream, floor);
    box(9.8, 0.16, 7, 0, 2.58, -3.15, roof, floor);
    for (const corner of [-1, 1]) for (let i = 0; i < 6; i++) {
      box(i % 2 ? 0.48 : 0.66, 0.24, 0.12, corner * 4.45, -2.5 + i * 0.85, -0.09, cream, floor);
    }
    windowAt(-2.9, -1.94, -0.06, floor); windowAt(0.2, -2.68, -0.06, floor, true); windowAt(3.04, -1.94, -0.06, floor);
    box(4.2, 0.2, 1.5, 0.2, -2.67, 0.56, cream, floor); railing(0.2, -2.52, 1.24, 4.05, floor);
    for (const px of [-3, 3]) { planter(px, -1.98, 0.43, 2, floor); crown(x + px, y - 1.57, z + 0.5, 0.64, 18); }
    for (let i = 0; i < 9; i++) {
      const vineX = x + (i % 2 ? 4.3 : -4.3) + (random() - 0.5) * 0.35, length = 0.8 + random() * 2.8;
      for (let j = 0; j < 7; j++) crown(vineX + Math.sin(j * 1.7) * 0.16, y + 2.8 - j / 7 * length, z + 0.02, 0.22, 4);
    }
    const side = new THREE.Group(); side.position.set(4.76, 0, -3.4); side.rotation.y = Math.PI / 2; floor.add(side); windowAt(0, -1.8, 0, side);
    const plaque = document.createElement("canvas"); plaque.width = 768; plaque.height = 96;
    const label = plaque.getContext("2d");
    if (label) {
      label.fillStyle = "#f7e7bc"; label.fillRect(0, 0, 768, 96);
      label.strokeStyle = "#765632"; label.lineWidth = 3; label.strokeRect(7, 7, 754, 82);
      label.fillStyle = "#3c4636"; label.font = "27px Georgia"; label.textAlign = "center"; label.fillText(space.sign, 384, 57);
      const texture = keep(new THREE.CanvasTexture(plaque)); texture.colorSpace = THREE.SRGBColorSpace;
      const sign = mesh(keep(new THREE.PlaneGeometry(4.5, 0.56)), keep(new THREE.MeshBasicMaterial({ map: texture })), 0, 2.06, 0.09, floor);
      sign.userData.spaceId = space.id; destinations.push(sign);
    }
    const entry = mesh(keep(new THREE.PlaneGeometry(9.3, 5.5)), keep(new THREE.MeshBasicMaterial({ visible: false })), 0, 0, 1.38, floor);
    entry.userData.spaceId = space.id; destinations.push(entry);
    if (index === 3 || index >= 4) {
      for (let i = 0; i < 26; i++) {
        const tile = box(0.4, 0.12, 2.1, -4.9 + i * 0.39, 3.06, -0.12, roof, floor); tile.rotation.x = -0.28;
      }
      box(10.2, 0.17, 0.18, 0, 2.8, 0.92, cream, floor); railing(1, 2.9, -1, 6.4, floor);
      for (const px of [-3, 2.8]) { planter(px, 3.05, -2.3, 1.65, floor); crown(x + px, y + 4.05, z - 2.3, 1.15, 45); }
    }
    const element = document.createElement("div"); element.className = "spatial-room-panel"; element.dataset.space = space.id;
    element.setAttribute("role", "region"); element.setAttribute("aria-label", `${space.en} / ${space.ko}`);
    element.inert = true; element.style.pointerEvents = "none";
    const mount = document.createElement("div"); mount.className = "room-surface t-panel-slide"; mount.tabIndex = 0; mount.dataset.open = "false";
    mount.setAttribute("aria-label", `${space.en} content / ${space.ko} 내용`); element.appendChild(mount);
    const panel = new CSS3DObject(element); panel.position.set(x, y, z + 1.5); panel.scale.setScalar(0.009);
    panel.visible = false; contentScene.add(panel); roomPanels.push(panel); roomMounts.push(mount);
  });
  box(2.2, 3.1, 2.4, -6.4, 25.5, -0.65, toon(0xe8b447, plaster)); windowAt(-6.4, 24, 0.59, model);
  const spire = mesh(keep(new THREE.ConeGeometry(2.15, 3.6, 4)), teal, -6.4, 28.8, -0.65, model, true); spire.rotation.y = Math.PI / 4;
  for (let i = 0; i < 7; i++) { const size = 3.1 * (1 - i / 8); box(size, 0.065, size, -6.4, 27.12 + i * 0.43, -0.65, teal); }
  mesh(keep(new THREE.ConeGeometry(0.13, 1.2, 8)), cream, -6.4, 31.05, -0.65);
  const solar = toon(0x255a64);
  for (let i = 0; i < 3; i++) {
    const panel = box(1.15, 0.08, 1.5, -2.5 + i * 1.22, 24.53, -0.75, solar); panel.rotation.x = -0.2;
    box(0.035, 0.7, 0.035, -2.5 + i * 1.22, 24.17, -1.3, wood);
  }
  box(28, 0.45, 13, -5, 0.38, -0.8, toon(0x899361));
  for (let i = 0; i < 9; i++) box(6, 0.13 * (9 - i), 0.5, -5, 0.065 * (9 - i), 6.1 + i * 0.47, cream);
  const pool = mesh(keep(new THREE.CircleGeometry(3.1, 64)), toon(0x308a83), 4.8, 0.63, 5.3); pool.rotation.x = -Math.PI / 2; pool.scale.y = 0.65;
  const ripples = [];
  for (let i = 0; i < 4; i++) {
    const ring = mesh(keep(new THREE.RingGeometry(0.62 + i * 0.53, 0.64 + i * 0.53, 48)), keep(new THREE.MeshBasicMaterial({ color: 0x92c4a0, transparent: true, opacity: 0.35, side: THREE.DoubleSide })), 4.8, 0.64, 5.3);
    ring.rotation.x = -Math.PI / 2; ring.scale.y = 0.65; ripples.push(ring);
  }
  box(3.1, 0.18, 0.65, -13, 1.27, 6.4, wood);
  for (const x of [-14.15, -11.85]) box(0.17, 0.7, 0.55, x, 0.85, 6.4, dark);
  for (const [x, z] of [[-18, 4.5], [-11, 6], [0.5, 5.1], [8.6, 3]]) { planter(x, 0.85, z, 1.8); crown(x, 1.7, z, 1, 35); }
  const branchGeometry = keep(new THREE.CylinderGeometry(0.065, 0.12, 1, 5));
  function branch(from, to, width = 1) {
    const direction = new THREE.Vector3().subVectors(to, from); const part = mesh(branchGeometry, bark, 0, 0, 0);
    part.position.copy(from).add(to).multiplyScalar(0.5); part.scale.set(width, direction.length(), width);
    part.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  }
  function tree(x, y, z, size, colors) {
    branch(new THREE.Vector3(x, y, z), new THREE.Vector3(x, y + size * 1.8, z), size * 1.5);
    for (let j = 0; j < 5; j++) {
      const a = j * 2.4, px = x + Math.cos(a) * size * 0.55, py = y + size * (1.5 + random() * 0.45), pz = z + Math.sin(a) * size * 0.5;
      branch(new THREE.Vector3(x, y + size, z), new THREE.Vector3(px, py, pz), size * 0.55); crown(px, py, pz, size * 0.65, 20, colors);
    }
  }
  const forestColors = [0x174b50, 0x225a5a, 0x2b6661, 0x16444a, 0x376e64];
  // Large trees stay behind the facade, clear of every camera approach.
  for (let row = 0; row < 3; row++) for (let i = 0; i < 16; i++) tree(-65 + i * 8.2 + random() * 3, row * 2, -15 - row * 14 - random() * 5, 6 + random() * 7, forestColors);
  tree(-24, 0, 0, 5.4, plantColors); tree(17, 0, -3, 5.9, plantColors); tree(-20, 0, 13, 3.4, plantColors);
  for (let i = 0; i < 35; i++) crown(-34 + i * 1.9, -0.3, 15 + random() * 7, 1.4 + random() * 1.5, 16);
  const leafMesh = new THREE.InstancedMesh(foliageGeo, toon(0xffffff), plants.length);
  const dummy = new THREE.Object3D(), color = new THREE.Color();
  plants.forEach((plant, i) => {
    dummy.position.set(plant.x, plant.y, plant.z); dummy.scale.set(plant.sx, plant.sy, plant.sz);
    dummy.rotation.set(random(), random() * 6.28, random()); dummy.updateMatrix();
    leafMesh.setMatrixAt(i, dummy.matrix); leafMesh.setColorAt(i, color.setHex(plant.color));
  });
  leafMesh.instanceMatrix.needsUpdate = true; leafMesh.instanceColor.needsUpdate = true; leafMesh.computeBoundingSphere(); model.add(leafMesh);
  const ground = mesh(keep(new THREE.PlaneGeometry(250, 250)), toon(0x244e43), 0, -0.12, 0, scene); ground.rotation.x = -Math.PI / 2;
  const fill = new THREE.HemisphereLight(0xf7f3d6, 0x315e59, 2); scene.add(fill);
  const sun = new THREE.DirectionalLight(0xffecd0, 2.2); sun.position.set(-24, 42, 28); scene.add(sun);
  const dayColor = new THREE.Color(0xffecd0), eveningColor = new THREE.Color(0xffb66b);
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  let reduced = preference.matches, disposed = false, inView = true, dirty = true, painted = false, motionEnabled = true;
  let frame = 0, lastTime = 0, destination = 0, transition = null, golden = 0, goldenTarget = 0;
  let tourFrame = null;
  const tourEyeFrom = new THREE.Vector3(), tourEyeTo = new THREE.Vector3();
  const tourGazeFrom = new THREE.Vector3(), tourGazeTo = new THREE.Vector3();
  const tourEyeTarget = new THREE.Vector3(), tourGazeTarget = new THREE.Vector3();
  const closeToken = getComputedStyle(host).getPropertyValue("--panel-close-dur").trim();
  const panelCloseDuration = (parseFloat(closeToken) || 350) * (closeToken.endsWith("ms") ? 1 : closeToken.endsWith("s") ? 1000 : 1);
  let dragging = false, downX = 0, downY = 0, lastX = 0, lastY = 0;
  const look = { yaw: 0, pitch: 0 }, lookCurrent = { yaw: 0, pitch: 0 };
  const gaze = new THREE.Vector3(), euler = new THREE.Euler(0, 0, 0, "YXZ");
  const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
  function pose(value, eye, focus) {
    if (value < 1) {
      // The full planted tower is established on frame one, without a scroll gate.
      const t = value / 0.6;
      if (narrow) { eye.set(10 - t * 6, 18 + t * 4, 65 - t * 9); focus.set(-3, 14 + t * 5, 0); }
      else { eye.set(17 - t * 11, 17 + t * 6, 51 - t * 12); focus.set(4.5 - t * 0.5, 14 + t * 6, 0); }
      return;
    }
    const index = Math.min(SPACES.length - 1, Math.floor(value) - 1); focus.copy(roomPanels[index].position);
    const fov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const distance = Math.max(panelHeight * 0.009 / (2 * fov * (narrow ? 0.59 : 0.66)), panelWidth * 0.009 / (2 * fov * camera.aspect * 0.84));
    eye.copy(focus); eye.z += distance;
  }
  function wake() { if (!frame && !disposed && inView && !document.hidden) frame = requestAnimationFrame(draw); }
  function invalidate() { dirty = true; wake(); }
  function resize() {
    const { width, height } = host.getBoundingClientRect(); if (!width || !height) return;
    narrow = width < 700; camera.aspect = width / height; camera.fov = narrow ? 45 : 42; camera.updateProjectionMatrix();
    panelWidth = Math.min(850, width * 0.87); panelHeight = Math.min(560, height * (narrow ? 0.58 : 0.64));
    roomPanels.forEach((panel) => { panel.element.style.width = `${panelWidth}px`; panel.element.style.height = `${panelHeight}px`; });
    renderer.setSize(width, height); contentRenderer.setSize(width, height); transition = null; invalidate();
  }
  function draw(time) {
    frame = 0; if (disposed || !inView || document.hidden) return;
    if (!dirty && time - lastTime < 32) { wake(); return; }
    const delta = Math.min((time - lastTime) / 1000 || 0, 0.1); lastTime = time;
    const ease = reduced ? 1 : 1 - Math.exp(-delta * 9);
    const animated = motionEnabled && !reduced;
    let cameraMoving = false;
    lookCurrent.yaw += (look.yaw - lookCurrent.yaw) * ease; lookCurrent.pitch += (look.pitch - lookCurrent.pitch) * ease;
    golden += (goldenTarget - golden) * ease;
    if (tourFrame && motionEnabled && !reduced) {
      transition = null;
      const travelling = tourFrame.type === "travel";
      const mix = tourFrame.mix;
      const smooth = mix * mix * mix * (mix * (mix * 6 - 15) + 10);
      pose(tourFrame.from, tourEyeFrom, tourGazeFrom); pose(tourFrame.to, tourEyeTo, tourGazeTo);
      tourEyeTarget.lerpVectors(tourEyeFrom, tourEyeTo, smooth);
      if (travelling) tourEyeTarget.z += Math.sin(Math.PI * smooth) * Math.min(4, tourEyeFrom.distanceTo(tourEyeTo) * 0.12);
      tourGazeTarget.lerpVectors(tourGazeFrom, tourGazeTo, smooth);
      for (const axis of ["x", "y", "z"]) {
        camera.position[axis] = painted ? dampTourValue(camera.position[axis], tourEyeTarget[axis], delta) : tourEyeTarget[axis];
        gaze[axis] = painted ? dampTourValue(gaze[axis], tourGazeTarget[axis], delta) : tourGazeTarget[axis];
      }
      cameraMoving = camera.position.distanceToSquared(tourEyeTarget) + gaze.distanceToSquared(tourGazeTarget) > 0.0001;
      destination = tourFrame.to;
      if (tourFrame.type === "read") roomMounts[tourFrame.room].scrollTop = tourFrame.scrollTop;
    } else if (transition && motionEnabled && !reduced) {
      const t = THREE.MathUtils.clamp((time - transition.start) / transition.duration, 0, 1);
      const smooth = t * t * t * (t * (t * 6 - 15) + 10);
      camera.position.lerpVectors(transition.from, transition.to, smooth);
      camera.position.z += Math.sin(Math.PI * smooth) * transition.arc;
      gaze.lerpVectors(transition.fromGaze, transition.toGaze, smooth); if (t === 1) transition = null;
    } else {
      transition = null;
      pose(destination, camera.position, gaze);
    }
    camera.lookAt(gaze); euler.setFromQuaternion(camera.quaternion); euler.y += lookCurrent.yaw; euler.x += lookCurrent.pitch; camera.quaternion.setFromEuler(euler);
    sun.color.copy(dayColor).lerp(eveningColor, golden); fill.intensity = 2 - golden * 0.5;
    const roomIndex = tourFrame ? (tourFrame.type === "read" ? tourFrame.room : -1) : destination < 1 ? -1 : Math.min(SPACES.length - 1, Math.floor(destination) - 1);
    roomPanels.forEach((panel, index) => {
      const surface = roomMounts[index];
      const arriving = index === roomIndex && !transition && !cameraMoving;
      // Mount closed for one painted frame so the first arrival also animates.
      const open = arriving && (panel.visible || !animated);
      if ((surface.dataset.open === "true") !== open) {
        surface.dataset.open = String(open);
        panel.element.inert = !open; panel.element.style.pointerEvents = open ? "auto" : "none";
        panel.element.setAttribute("aria-hidden", String(!open));
        if (!open) {
          panel.userData.hideAt = time + panelCloseDuration;
          surface.querySelectorAll("video").forEach((video) => video.pause());
        }
      }
      // CSS3D must keep the departing surface mounted through its fade-out.
      panel.visible = arriving || (animated && time < (panel.userData.hideAt || 0));
    });
    if (!reduced) ripples.forEach((ring, i) => { ring.material.opacity = 0.2 + Math.sin(time * 0.0007 + i) * 0.12; });
    renderer.render(scene, camera); contentRenderer.render(contentScene, camera);
    host.dataset.cameraState = transition || cameraMoving ? "moving" : "settled";
    host.dataset.motionEnabled = String(animated);
    host.dataset.tourProgress = (tourFrame?.totalProgress || 0).toFixed(4);
    host.dataset.tourPhase = tourFrame?.type || "off";
    if (!painted) { painted = true; onReady(); }
    dirty = false; if (!reduced) wake();
  }
  function pick(event) {
    const rect = host.getBoundingClientRect(); pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera); return raycaster.intersectObjects(destinations, false)[0];
  }
  function pointerDown(event) {
    if (event.button !== 0 || event.target.closest(".room-surface")) return;
    dragging = true; downX = lastX = event.clientX; downY = lastY = event.clientY; host.setPointerCapture(event.pointerId);
  }
  function pointerMove(event) {
    if (!dragging) return;
    if (event.pointerType === "touch" && Math.abs(event.clientY - downY) > Math.abs(event.clientX - downX)) return;
    look.yaw = THREE.MathUtils.clamp(look.yaw - (event.clientX - lastX) * 0.0018, -0.25, 0.25);
    look.pitch = THREE.MathUtils.clamp(look.pitch - (event.clientY - lastY) * 0.0015, -0.18, 0.18);
    lastX = event.clientX; lastY = event.clientY; invalidate();
  }
  function pointerUp(event) {
    if (dragging && event.type === "pointerup" && Math.hypot(event.clientX - downX, event.clientY - downY) < 5) { const hit = pick(event); if (hit) onNavigate(hit.object.userData.spaceId); }
    dragging = false;
  }
  function keyDown(event) {
    if (tourFrame && ["ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
    if (event.target.closest(".room-surface") || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "ArrowLeft") look.yaw += 0.04; if (event.key === "ArrowRight") look.yaw -= 0.04;
    if (event.key === "ArrowUp") look.pitch += 0.04; if (event.key === "ArrowDown") look.pitch -= 0.04;
    if (event.key === "Home") look.yaw = look.pitch = 0;
    look.yaw = THREE.MathUtils.clamp(look.yaw, -0.25, 0.25); look.pitch = THREE.MathUtils.clamp(look.pitch, -0.18, 0.18); invalidate();
  }
  function visibility() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else { lastTime = performance.now(); invalidate(); } }
  function motionChange() { reduced = preference.matches; transition = null; invalidate(); }
  function loseContext(event) { event.preventDefault(); dispose(); onFailure(); }
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(host);
  const intersection = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if (inView) invalidate(); else { cancelAnimationFrame(frame); frame = 0; } }); intersection.observe(host);
  host.addEventListener("pointerdown", pointerDown); host.addEventListener("pointermove", pointerMove); host.addEventListener("pointerup", pointerUp);
  host.addEventListener("pointercancel", pointerUp); host.addEventListener("lostpointercapture", pointerUp); host.addEventListener("keydown", keyDown);
  renderer.domElement.addEventListener("webglcontextlost", loseContext); document.addEventListener("visibilitychange", visibility); preference.addEventListener("change", motionChange);
  function dispose() {
    if (disposed) return; disposed = true; cancelAnimationFrame(frame); resizeObserver.disconnect(); intersection.disconnect();
    host.removeEventListener("pointerdown", pointerDown); host.removeEventListener("pointermove", pointerMove); host.removeEventListener("pointerup", pointerUp);
    host.removeEventListener("pointercancel", pointerUp); host.removeEventListener("lostpointercapture", pointerUp); host.removeEventListener("keydown", keyDown);
    document.removeEventListener("visibilitychange", visibility); preference.removeEventListener("change", motionChange); renderer.domElement.removeEventListener("webglcontextlost", loseContext);
    leafMesh.dispose(); resources.forEach((resource) => resource.dispose()); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); contentRenderer.domElement.remove();
  }
  function navigateTo(value) {
      tourFrame = null;
      const from = camera.position.clone(), fromGaze = gaze.clone(); destination = THREE.MathUtils.clamp(value, 0, SPACES.length + 0.7);
      const to = new THREE.Vector3(), toGaze = new THREE.Vector3(); pose(destination, to, toGaze);
      const distance = from.distanceTo(to); look.yaw = look.pitch = lookCurrent.yaw = lookCurrent.pitch = 0;
      const exitDelay = roomMounts.some((surface) => surface.dataset.open === "true") ? panelCloseDuration : 0;
      transition = painted && motionEnabled && !reduced && distance > 0.01 ? { from, to, fromGaze, toGaze, start: performance.now() + exitDelay, duration: distance < 8 ? 650 : 950, arc: Math.min(4, distance * 0.12) } : null;
      invalidate();
  }
  resize();
  return {
    mounts: roomMounts,
    goTo: navigateTo,
    getTourMetrics() {
      resize();
      const scale = Math.min(host.clientHeight * (narrow ? 0.59 : 0.66) / panelHeight, host.clientWidth * 0.84 / panelWidth);
      return roomPanels.map((panel, index) => {
        // CSS3D does not attach a wall until its first visible frame. Attach
        // unseen walls temporarily so the entire tour has real content metrics.
        const { display, visibility } = panel.element.style;
        const detached = !panel.element.isConnected;
        panel.element.style.visibility = "hidden"; panel.element.style.display = "block";
        if (detached) contentRenderer.domElement.appendChild(panel.element);
        const overflow = Math.max(0, roomMounts[index].scrollHeight - roomMounts[index].clientHeight);
        if (detached) panel.element.remove();
        panel.element.style.display = display; panel.element.style.visibility = visibility;
        return { overflow, scale };
      });
    },
    setTourFrame(next) {
      if (!motionEnabled || reduced) return;
      if (!tourFrame || tourFrame.segmentIndex !== next.segmentIndex) {
        look.yaw = look.pitch = lookCurrent.yaw = lookCurrent.pitch = 0;
      }
      tourFrame = next; transition = null;
      invalidate();
    },
    stopTour() {
      if (tourFrame) navigateTo(tourFrame.to);
    },
    setMotionEnabled(enabled) { motionEnabled = enabled; if (!enabled) transition = null; invalidate(); },
    setGolden(value) { goldenTarget = value ? 1 : 0; invalidate(); },
    dispose,
  };
}
