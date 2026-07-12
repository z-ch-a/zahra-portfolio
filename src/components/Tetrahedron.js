import * as THREE from "three";

export function createTetrahedron() {
  return `
    <div class="tetra-stage">
      <canvas id="scene"></canvas>
    </div>
  `;
}

const pixelLetters = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
};

function drawPixelText(ctx, text, x, y, scale = 3.6) {
  const letterWidth = 5;
  const letterHeight = 7;
  const spacing = 3;

  const totalWidth =
    text.length * letterWidth * scale +
    (text.length - 1) * spacing * scale;

  let startX = x - totalWidth / 2;

  for (const character of text) {
    const letter = pixelLetters[character];

    if (!letter) {
      startX += (letterWidth + spacing) * scale;
      continue;
    }

    for (let row = 0; row < letterHeight; row++) {
      for (let column = 0; column < letterWidth; column++) {
        if (letter[row][column] !== "1") continue;

        const pixelX = startX + column * scale;
        const pixelY = y + row * scale;

        // Small pink outer glow
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = "#d97891";

        ctx.fillRect(
          pixelX - 3,
          pixelY - 3,
          scale + 6,
          scale + 6
        );

        // Muted blue inner glow
        ctx.globalAlpha = 0.42;
        ctx.fillStyle = "#7caab5";

        ctx.fillRect(
          pixelX - 1,
          pixelY - 1,
          scale + 2,
          scale + 2
        );

        // Warm white text core
        ctx.globalAlpha = 0.96;
        ctx.fillStyle = "#e8ecea";

        ctx.fillRect(
          pixelX,
          pixelY,
          scale,
          scale
        );
      }
    }

    startX += (letterWidth + spacing) * scale;
  }

  ctx.globalAlpha = 1;
}

function createFaceTexture(label) {
  const size = 512;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  // Dark neutral face
  ctx.fillStyle = "#101514";
  ctx.fillRect(0, 0, size, size);

  // Structured pixel grid
  for (let y = 0; y < size; y += 8) {
    for (let x = 0; x < size; x += 8) {
      const randomValue = Math.random();

      if (randomValue > 0.7) {
        ctx.globalAlpha = 0.16 + Math.random() * 0.18;

        ctx.fillStyle =
          randomValue > 0.91
            ? "#b9647b"
            : "#648b93";

        ctx.fillRect(x, y, 2, 2);
      }
    }
  }

  // Very subtle horizontal CRT lines
  ctx.globalAlpha = 0.032;
  ctx.fillStyle = "#d8e3df";

  for (let y = 0; y < size; y += 12) {
    ctx.fillRect(0, y, size, 1);
  }

  // Slight lower-face gradient
  const lowerGradient = ctx.createLinearGradient(
    0,
    size * 0.4,
    0,
    size
  );

  lowerGradient.addColorStop(
    0,
    "rgba(0, 0, 0, 0)"
  );

  lowerGradient.addColorStop(
    1,
    "rgba(0, 0, 0, 0.22)"
  );

  ctx.globalAlpha = 1;
  ctx.fillStyle = lowerGradient;
  ctx.fillRect(0, 0, size, size);

  if (label) {
    const isLongLabel = label.length > 8;

    drawPixelText(
      ctx,
      label,
      size / 2,
      338,
      isLongLabel ? 2.35 : 3.6
    );
  }

  const texture = new THREE.CanvasTexture(canvas);

  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  return texture;
}

function createNeonEdge(start, end, group) {
  const direction = new THREE.Vector3().subVectors(
    end,
    start
  );

  const length = direction.length();

  const midpoint = new THREE.Vector3()
    .addVectors(start, end)
    .multiplyScalar(0.5);

  const quaternion = new THREE.Quaternion();

  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize()
  );

  function createLayer(
    radius,
    color,
    opacity,
    segments = 8
  ) {
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      segments
    );

    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: opacity < 1,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const layer = new THREE.Mesh(
      geometry,
      material
    );

    layer.position.copy(midpoint);
    layer.quaternion.copy(quaternion);

    return layer;
  }

  const pinkOuterGlow = createLayer(
    0.038,
    0xd66e89,
    0.13,
    8
  );

  const blueInnerGlow = createLayer(
    0.018,
    0x79aeb8,
    0.27,
    8
  );

  const blueCore = createLayer(
    0.006,
    0xa9d4dc,
    0.92,
    6
  );

  group.add(pinkOuterGlow);
  group.add(blueInnerGlow);
  group.add(blueCore);
}

function createFace(points, label, group) {
  const geometry =
    new THREE.BufferGeometry().setFromPoints(
      points
    );

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
    opacity: 0.94,
    side: THREE.DoubleSide,
    depthWrite: false,
    color: new THREE.Color(0xd5ddda),
    blending: THREE.NormalBlending,
  });

  const mesh = new THREE.Mesh(
    geometry,
    material
  );

  mesh.userData.page =
    label.toLowerCase();

  group.add(mesh);

  return mesh;
}

export function startTetrahedronScene() {
  const canvas =
    document.querySelector("#scene");

  if (!canvas) return;

  const scene = new THREE.Scene();

  const camera =
    new THREE.PerspectiveCamera(
      35,
      1,
      0.1,
      100
    );

  camera.position.set(0, 0.02, 5.75);

  const renderer =
    new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });

  renderer.setPixelRatio(1);

  const group = new THREE.Group();
  scene.add(group);

  const top =
    new THREE.Vector3(0, 1.12, 0);

  const left =
    new THREE.Vector3(-1.48, -1, 0.82);

  const right =
    new THREE.Vector3(1.48, -1, 0.82);

  const back =
    new THREE.Vector3(0, -1, -1.48);

  const clickableFaces = [
    createFace(
      [top, left, right],
      "CONTACT",
      group
    ),

    createFace(
      [top, right, back],
      "PROJECTS",
      group
    ),

    createFace(
      [top, back, left],
      "ABOUT",
      group
    ),

    createFace(
      [left, back, right],
      "PUBLICATION",
      group
    ),
  ];

  const edges = [
    [top, left],
    [top, right],
    [top, back],
    [left, right],
    [right, back],
    [back, left],
  ];

  edges.forEach(([start, end]) => {
    createNeonEdge(
      start,
      end,
      group
    );
  });

  group.rotation.x = 0.1;
  group.rotation.y = 0;

  let isDragging = false;
  let mouseStartedOnCanvas = false;

  let previousX = 0;
  let previousY = 0;

  let mouseDownX = 0;
  let mouseDownY = 0;

  let velocityX = 0;
  let velocityY = 0;

  let touchStartX = 0;
  let touchStartY = 0;

  const raycaster =
    new THREE.Raycaster();

  const pointer =
    new THREE.Vector2();

  function resizeRenderer() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (!width || !height) return;

    renderer.setSize(
      width,
      height,
      false
    );

    camera.aspect =
      width / height;

    camera.updateProjectionMatrix();

    const viewportWidth =
      window.innerWidth;

    const responsiveScale =
      viewportWidth < 600
        ? 0.72
        : viewportWidth < 1000
          ? 0.78
          : 0.82;

    group.scale.setScalar(
      responsiveScale
    );
  }

  resizeRenderer();

  canvas.addEventListener(
    "mousedown",
    (event) => {
      isDragging = true;
      mouseStartedOnCanvas = true;

      previousX = event.clientX;
      previousY = event.clientY;

      mouseDownX = event.clientX;
      mouseDownY = event.clientY;

      document.body.classList.add(
        "grabbing-cursor"
      );
    }
  );

  window.addEventListener(
    "mousemove",
    (event) => {
      if (!isDragging) return;

      const deltaX =
        event.clientX - previousX;

      const deltaY =
        event.clientY - previousY;

      previousX = event.clientX;
      previousY = event.clientY;

      const rotationSpeed = 0.0045;

      velocityY =
        deltaX * rotationSpeed;

      velocityX =
        deltaY * rotationSpeed;

      group.rotation.y += velocityY;
      group.rotation.x += velocityX;
    }
  );

  window.addEventListener(
    "mouseup",
    (event) => {
      if (!mouseStartedOnCanvas) return;

      const movementX = Math.abs(
        event.clientX - mouseDownX
      );

      const movementY = Math.abs(
        event.clientY - mouseDownY
      );

      isDragging = false;
      mouseStartedOnCanvas = false;

      document.body.classList.remove(
        "grabbing-cursor"
      );

      if (
        movementX < 6 &&
        movementY < 6
      ) {
        detectFaceClick(
          event.clientX,
          event.clientY
        );
      }
    }
  );

  canvas.addEventListener(
    "touchstart",
    (event) => {
      if (!event.touches.length) return;

      isDragging = true;

      previousX =
        event.touches[0].clientX;

      previousY =
        event.touches[0].clientY;

      touchStartX =
        event.touches[0].clientX;

      touchStartY =
        event.touches[0].clientY;
    },
    {
      passive: true,
    }
  );

  window.addEventListener(
    "touchmove",
    (event) => {
      if (
        !isDragging ||
        !event.touches.length
      ) {
        return;
      }

      const deltaX =
        event.touches[0].clientX -
        previousX;

      const deltaY =
        event.touches[0].clientY -
        previousY;

      previousX =
        event.touches[0].clientX;

      previousY =
        event.touches[0].clientY;

      const rotationSpeed = 0.0045;

      velocityY =
        deltaX * rotationSpeed;

      velocityX =
        deltaY * rotationSpeed;

      group.rotation.y += velocityY;
      group.rotation.x += velocityX;
    },
    {
      passive: true,
    }
  );

  window.addEventListener(
    "touchend",
    (event) => {
      const changedTouch =
        event.changedTouches[0];

      if (changedTouch) {
        const movementX = Math.abs(
          changedTouch.clientX -
          touchStartX
        );

        const movementY = Math.abs(
          changedTouch.clientY -
          touchStartY
        );

        if (
          movementX < 8 &&
          movementY < 8
        ) {
          detectFaceClick(
            changedTouch.clientX,
            changedTouch.clientY
          );
        }
      }

      isDragging = false;
    }
  );

  function detectFaceClick(
    clientX,
    clientY
  ) {
    const bounds =
      canvas.getBoundingClientRect();

    pointer.x =
      ((clientX - bounds.left) /
        bounds.width) *
        2 -
      1;

    pointer.y =
      -(
        (clientY - bounds.top) /
        bounds.height
      ) *
        2 +
      1;

    raycaster.setFromCamera(
      pointer,
      camera
    );

    const intersections =
      raycaster.intersectObjects(
        clickableFaces,
        false
      );

    if (!intersections.length) return;

    const clickedPage =
      intersections[0]
        .object
        .userData
        .page;

    navigateToPage(clickedPage);
  }

  function navigateToPage(pageName) {
    if (pageName === "projects") {
      openProjectsPage();
      return;
    }

    window.dispatchEvent(
      new CustomEvent(
        "portfolio:navigate",
        {
          detail: {
            page: pageName,
          },
        }
      )
    );
  }

  function openProjectsPage() {
    const homepage =
      document.querySelector(
        "#homepage"
      );

    const projectsPage =
      document.querySelector(
        "#projects-page"
      );

    if (
      !homepage ||
      !projectsPage
    ) {
      return;
    }

    homepage.style.display = "none";
    projectsPage.hidden = false;
  }

  function animate() {
    requestAnimationFrame(animate);

    const time =
      Date.now() * 0.001;

    if (!isDragging) {
      group.rotation.y += velocityY;
      group.rotation.x += velocityX;

      velocityY *= 0.94;
      velocityX *= 0.94;
    }

    group.position.y =
      Math.sin(time * 0.9) *
      0.03;

    renderer.render(
      scene,
      camera
    );
  }

  animate();

  window.addEventListener(
    "resize",
    resizeRenderer
  );
}