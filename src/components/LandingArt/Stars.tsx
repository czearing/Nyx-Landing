// Stars.tsx
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export const Stars = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Variables
    let scene, renderer, camera, starStuff, stars;

    // Ensure the container for Three.js is available
    const container = containerRef.current;

    function createCircleTexture() {
      // Create a small canvas element
      const canvas = document.createElement('canvas');
      canvas.width = 64; // You can adjust the size to fit your needs
      canvas.height = 64;

      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Failed to obtain 2D context for texture generation.');
      }

      // Draw a circle
      context.beginPath();
      context.arc(32, 32, 30, 0, 2 * Math.PI); // Adjust coordinates and radius appropriately
      context.fillStyle = '#FFFFFF'; // Set the fill color to be white
      context.fill();

      // Create the texture
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true; // Important to call this on texture change

      return texture;
    }

    function init() {
      // Scene and camera setup
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.0003);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 1000 / 2;

      // Star creation function
      function starForge() {
        const starQty = 45000;
        // We use BufferGeometry for better performance
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starQty * 3); // 3 vertices per point

        for (let i = 0; i < starQty * 3; i += 3) {
          positions[i] = Math.random() * 2000 - 1000; // x
          positions[i + 1] = Math.random() * 2000 - 1000; // y
          positions[i + 2] = Math.random() * 2000 - 1000; // z
        }

        // We add it as an attribute to the geometry, so three.js can understand how to work with it
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const circleTexture = createCircleTexture();

        const materialOptions = {
          size: 0.7,
          color: 0xffffff, // current color for the stars
          emissive: 0xffff99,
          map: circleTexture, // use the circle texture
          transparent: true,
          opacity: 0.8,
          alphaTest: 0.5, // set an alpha threshold to avoid rendering issues
        };

        starStuff = new THREE.PointsMaterial(materialOptions);
        stars = new THREE.Points(geometry, starStuff);

        scene.add(stars);
      }

      starForge();

      // Renderer
      if (container) {
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setClearColor(0x000011, 1);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
      }

      // Event listeners for window resize or mouse movement
      window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);

      // Adding rotation to the star field. Adjust the speed as necessary.
      if (stars) {
        // Check if stars is defined to avoid any potential errors
        stars.rotation.x += 0.00001; // Rotating around the x-axis
        stars.rotation.y += 0.00001; // Rotating around the y-axis
      }

      renderer.render(scene, camera);
    }

    // Initialize Three.js scene
    init();
    animate();

    // Cleanup function for effects and event listeners
    return () => {
      window.removeEventListener('resize', onWindowResize);

      // Cleanup the three.js webGL context, scene, and other components to prevent memory leak
      if (container && renderer) {
        container.removeChild(renderer.domElement);
      }
      scene.remove(stars);
      starStuff.dispose();
      renderer.dispose();
    };
  }, []); // The empty array ensures useEffect runs only once, equivalent to componentDidMount

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw' }} />;
};
