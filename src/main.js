import './style.css'
import * as THREE from 'three'

document.querySelector('#app').innerHTML = `
  <main class="homepage">
    <header class="title">
      <h1>ZAHRA CHERAGH NIA</h1>
      <p>ARCHITECT & COMPUTATIONAL DESIGNER</p>
    </header>

    <div class="stars"></div>
    <div class="skyline"></div>
    <div class="horizon"></div>
    <div class="grid"></div>

    <canvas id="scene"></canvas>
  </main>
`

const canvas = document.querySelector('#scene')

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

camera.position.z = 5

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const geometry = new THREE.TetrahedronGeometry(1.4)

const material = new THREE.MeshBasicMaterial({
  color: 0xff7b6e,
  transparent: true,
  opacity: 0.75
})

const tetrahedron = new THREE.Mesh(geometry, material)
scene.add(tetrahedron)

const edges = new THREE.EdgesGeometry(geometry)

const edgeLines = new THREE.LineSegments(
  edges,
  new THREE.LineBasicMaterial({
    color: 0xffb6aa
  })
)

tetrahedron.add(edgeLines)

tetrahedron.rotation.x = 0.6
tetrahedron.rotation.y = 0.8

function animate() {
  requestAnimationFrame(animate)

  tetrahedron.rotation.y += 0.004
  tetrahedron.position.y = Math.sin(Date.now() * 0.001) * 0.08

  renderer.render(scene, camera)
}

animate()