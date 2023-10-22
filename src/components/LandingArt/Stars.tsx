import * as THREE from 'three';
import { useEffect, useRef } from 'react';

function createCircleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Failed to obtain 2D context for texture generation.');
  }

  context.beginPath();
  context.arc(32, 32, 30, 0, 2 * Math.PI);
  context.fillStyle = '#FFFFFF';
  context.fill();

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Component
export const Stars = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0003);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x0b0b3b, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Stars
    const starQty = 45000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starQty * 3);

    for (let i = 0; i < starQty * 3; i += 3) {
      positions[i] = Math.random() * 2000 - 1000;
      positions[i + 1] = Math.random() * 2000 - 1000;
      positions[i + 2] = Math.random() * 2000 - 1000;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const texture = createCircleTexture();
    const material = new THREE.PointsMaterial({
      size: 0.7,
      map: texture,
      transparent: true,
      color: 0xffffff,
      opacity: 0.8,
      alphaTest: 0.5,
    });
    const stars = new THREE.Points(geometry, material);

    scene.add(stars);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.00015;
      stars.rotation.y += 0.00015;
      renderer.render(scene, camera);
    };

    animate();

    // Resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.fov = 90;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(stars);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100vh' }} />;
};
