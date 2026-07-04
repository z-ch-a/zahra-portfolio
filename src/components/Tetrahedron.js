import * as THREE from "three";

export function createTetrahedron() {
  return `<canvas id="scene"></canvas>`;
}

const pixelLetters = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
};

function drawPixelText(ctx, text, x, y, scale = 4) {
  const letterWidth = 5;
  const letterHeight = 7;
  const spacing = 1;

  const totalWidth =
    text.length * letterWidth * scale + (text.length - 1) * spacing * scale;

  let startX = x - totalWidth / 2;

  for (const char of text) {
    const letter = pixelLetters[char];

    if (!letter) {
      startX += (letterWidth + spacing) * scale;
      continue;
    }

    for (let row = 0; row < letterHeight; row++) {
      for (let col = 0; col < letterWidth; col++) {
        if (letter[row][col] === "1") {
          ctx.globalAlpha = 0.45;
          ctx.fillStyle = "#ff7b6e";
          ctx.fillRect(
            startX + col * scale - 2,
            y + row * scale - 2,
            scale + 4,
            scale + 4
          );

          ctx.globalAlpha = 1;
          ctx.fillStyle = "#ffe5dc";
          ctx.fillRect(startX + col * scale, y + row * scale, scale, scale);
        }
      }
    }

    startX += (letterWidth + spacing) * scale;
  }

  ctx.globalAlpha = 1;
}

function createFaceTexture(label) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#080302";
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y += 5) {
    for (let x = 0; x < size; x += 5) {
      if (Math.random() > 0.58) {
        ctx.globalAlpha = Math.random() * 0.35;
        ctx.fillStyle = "#ff7b6e";
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }

  ctx.globalAlpha = 0.07;
  ctx.fillStyle = "#ffd2c8";
  for (let y = 0; y < size; y += 9) {
    ctx.fillRect(0, y, size, 1);
  }

  ctx.globalAlpha = 1;

  if (label) {
    drawPixelText(ctx, label, size / 2, 168, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  return texture;
}

function createNeonEdge(start, end, group) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

  const coreGeometry = new THREE.CylinderGeometry(0.01, 0.01, length, 8);
  const glowGeometry = new THREE.CylinderGeometry(0.055, 0.055, length, 12);

  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0xfff1e8,
  });

  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xff6f5e,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);

  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize()
  );

  core.position.copy(midpoint);
  glow.position.copy(midpoint);

  core.quaternion.copy(quaternion);
  glow.quaternion.copy(quaternion);

  group.add(glow);
  group.add(core);
}

function createFace(points, label, group) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  geometry.setIndex([0, 1, 2]);

  geometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(
      [
        0.5, 1,
        0, 0,
        1, 0,
      ],
      2
    )
  );

  geometry.computeVertexNormals();

  const material = new THREE.MeshBasicMaterial({
    map: createFaceTexture(label),
    transparent: true,
    opacity: 0.55,
    side: THREE.FrontSide,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
}

export function startTetrahedronScene() {
  const canvas = document.querySelector("#scene");

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    38,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.z = 6.3;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(1);

  const group = new THREE.Group();
  scene.add(group);

  const baseScale = 0.66;
  group.scale.set(baseScale, baseScale, baseScale);

  const top = new THREE.Vector3(0, 1.35, 0);
  const left = new THREE.Vector3(-1.45, -1.0, 0.7);
  const right = new THREE.Vector3(1.45, -1.0, 0.7);
  const back = new THREE.Vector3(0, -1.0, -1.45);

  createFace([top, left, right], "CONTACT", group);
  createFace([top, right, back], "PROJECTS", group);
  createFace([top, back, left], "ABOUT", group);

  const edges = [
    [top, left],
    [top, right],
    [top, back],
    [left, right],
    [right, back],
    [back, left],
  ];

  edges.forEach(([start, end]) => {
    createNeonEdge(start, end, group);
  });

  group.rotation.x = 0.15;
  group.rotation.y = 0;

  let isDragging = false;
  let previousX = 0;
  let previousY = 0;
  let velocityX = 0;
  let velocityY = 0;

  canvas.addEventListener("mousedown", (event) => {
    isDragging = true;
    previousX = event.clientX;
    previousY = event.clientY;
    document.body.classList.add("grabbing-cursor");
  });

  window.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - previousX;
    const deltaY = event.clientY - previousY;

    previousX = event.clientX;
    previousY = event.clientY;

    const rotationSpeed = 0.005;

    velocityY = deltaX * rotationSpeed;
    velocityX = deltaY * rotationSpeed;

    group.rotation.y += velocityY;
    group.rotation.x += velocityX;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.classList.remove("grabbing-cursor");
  });

  canvas.addEventListener("touchstart", (event) => {
    isDragging = true;
    previousX = event.touches[0].clientX;
    previousY = event.touches[0].clientY;
  });

  window.addEventListener("touchmove", (event) => {
    if (!isDragging) return;

    const deltaX = event.touches[0].clientX - previousX;
    const deltaY = event.touches[0].clientY - previousY;

    previousX = event.touches[0].clientX;
    previousY = event.touches[0].clientY;

    const rotationSpeed = 0.005;

    velocityY = deltaX * rotationSpeed;
    velocityX = deltaY * rotationSpeed;

    group.rotation.y += velocityY;
    group.rotation.x += velocityX;
  });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });

  function animate() {
    requestAnimationFrame(animate);

    const t = Date.now() * 0.001;

    if (!isDragging) {
      group.rotation.y += velocityY;
      group.rotation.x += velocityX;
      velocityY *= 0.95;
      velocityX *= 0.95;
    }

    // breathing: gentle up/down float in place, scale stays fixed
    group.position.y = Math.sin(t * 1.1) * 0.06;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}