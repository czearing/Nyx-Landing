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

// Vertex Shader
const vertexShader = `
  varying vec3 vWorldPosition;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader
const fragmentShader = `
  uniform vec3 topColor;
  uniform vec3 bottomColor;
  uniform float offset;
  uniform float exponent;

  varying vec3 vWorldPosition;

  void main() {
    float h = normalize(vWorldPosition + offset).y;
    gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
  }
`;

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

    // Define the colors for the gradient
    const uniforms = {
      topColor: { value: new THREE.Color(0x000000) }, // black
      bottomColor: { value: new THREE.Color(0x000066) }, // deep blue
      offset: { value: 33 },
      exponent: { value: 0.6 },
    };

    // Create Sky material
    const skyMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.BackSide,
    });

    // Sky sphere
    const skyGeometry = new THREE.SphereGeometry(1000, 32, 15);
    const skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(skyBox);

    // Stars setup
    const starQty = 45000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starQty * 3);

    for (let i = 0; i < starQty * 3; i += 3) {
      positions[i] = Math.random() * 2000 - 1000;
      positions[i + 1] = Math.random() * 2000 - 1000;
      positions[i + 2] = Math.random() * 2000 - 1000;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.5,
      map: createCircleTexture(),
      transparent: true,
      color: 0xffffff,
      opacity: 0.8,
      alphaTest: 0.5,
    });

    const stars = new THREE.Points(geometry, starMaterial); // The 'stars' variable is now accessible
    scene.add(stars);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.00015; // 'stars' is now recognized here
      stars.rotation.y += 0.00015;
      renderer.render(scene, camera);
    };

    animate();

    // Resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(stars);
      geometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
      skyBox.geometry.dispose();
      skyBox.material.dispose();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100vh' }} />;
};
