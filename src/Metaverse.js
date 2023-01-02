import { KeyDisplay } from "./utils";
import { CharacterControls } from "./characterControls";
import * as THREE from "three";
import { CameraHelper } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect } from "react";

export default function Metaverse() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const canvas = document.getElementById("webgl");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    camera.position.setX(-3);

    renderer.render(scene, camera);
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);
    const orbitControls = new OrbitControls(camera, renderer.domElement);

    var clock = new THREE.Clock();
    const textureLoader = new THREE.TextureLoader();

    const sandBaseColor = textureLoader.load(
      "./textures/sand/Sand 002_OCC.jpg"
    );
    const sandNormalMap = textureLoader.load(
      "./textures/sand/Sand 002_DISP.jpg"
    );
    const sandHeightMap = textureLoader.load(
      "./textures/sand/Sand 002_DISP.jpg"
    );
    const sandAmbientOcclusion = textureLoader.load(
      "./textures/sand/Sand 002_OCC.jpg"
    );
    function wrapAndRepeatTexture(map) {
      map.wrapS = map.wrapT = THREE.RepeatWrapping;
      map.repeat.x = map.repeat.y = 10;
    }
    const floormaterial = new THREE.MeshStandardMaterial({
      map: sandBaseColor,
      normalMap: sandNormalMap,
      displacementMap: sandHeightMap,
      displacementScale: 0.1,
      aoMap: sandAmbientOcclusion
    });
    wrapAndRepeatTexture(floormaterial.map);
    wrapAndRepeatTexture(floormaterial.normalMap);
    wrapAndRepeatTexture(floormaterial.displacementMap);
    wrapAndRepeatTexture(floormaterial.aoMap);
    const WIDTH = window.innerWidth;
    const LENGTH = window.innerHeight;
    const floorgeometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 512, 512);
    const floor = new THREE.Mesh(floorgeometry, floormaterial);
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // ANIMATE
    function animate() {
      var mixerUpdateDelta = clock.getDelta();

      orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    document.body.appendChild(renderer.domElement);
    animate();
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onWindowResize);
  }, []);
  return (
    <div className="Metaverse">
      <canvas id="webgl"></canvas>
    </div>
  );
}
