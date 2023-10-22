import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls
import { Stars } from '../components/LandingArt/Stars';
const ThreeCube = () => {
  const mountRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!mountRef.current) return;

    // Boilerplate setup (scene, camera, renderer)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    renderer.shadowMap.enabled = true;

    // Improve shadow mapping quality
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    mountRef.current.appendChild(renderer.domElement);

    // Cube (will cast the shadow)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = false;
    scene.add(cube);

    // Light source that can cast shadows
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize();
    light.castShadow = true;

    // Add ambient light to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // soft white ambient light
    scene.add(ambientLight);

    // Adjust the shadow camera frustum
    light.shadow.camera.left = -5;
    light.shadow.camera.right = 5;
    light.shadow.camera.top = 5;
    light.shadow.camera.bottom = -5;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 50;

    // Increase shadow map resolution
    light.shadow.mapSize.width = 1024; // default is 512
    light.shadow.mapSize.height = 1024; // default is 512

    // Configure shadow map properties
    light.shadow.bias = 0.003;
    light.shadow.radius = 1;

    scene.add(light);

    // ... [the rest of your setup: ground plane, camera position, orbit controls, animation function, cleanup]

    // Add a ground plane to receive shadows
    const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    const planeMaterial = new THREE.ShadowMaterial({ transparent: true, opacity: 0.5 });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -1;
    plane.rotation.x = -Math.PI / 2; // Rotate the ground plane to be horizontal
    plane.receiveShadow = true;

    scene.add(plane);

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.enablePan = false;

    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const currentRef = mountRef.current;

    // Cleanup function for component unmount
    return () => {
      if (currentRef) {
        currentRef.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      scene.remove(cube);
      scene.remove(plane);
      scene.remove(light);
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

const IndexPage = () => {
  return (
    <div>
      {/* <WaterEffectCanvas /> */}
      {/* <ThreeCube /> */}
      <Stars />
      Test
    </div>
  );
};
export default IndexPage;
