import * as React from 'react';
import { Button } from '@fluentui/react-components';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

const ThreeCube = () => {
  const mountRef = React.useRef(null);

  React.useEffect(() => {
    // Boilerplate setup (scene, camera, renderer)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Here, we set the alpha parameter to true in the WebGLRenderer to allow for transparency.
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // This sets the background to transparent (remove this if it's not working as expected)
    renderer.setClearColor(0x000000, 0);

    mountRef.current.appendChild(renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Camera
    camera.position.z = 5;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Limits and settings for the orbit controls
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.enablePan = false;

    const animate = function () {
      requestAnimationFrame(animate);

      // Cube rotation
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
      controls.dispose(); // Dispose of controls for good measure
    };
  }, []); // Empty array means that effect doesn't depend on any values from props or state, so it runs once.

  return <div ref={mountRef} />;
};

const IndexPage = () => {
  return (
    <div>
      <Button>Test</Button>
      <ThreeCube />
    </div>
  );
};
export default IndexPage;
