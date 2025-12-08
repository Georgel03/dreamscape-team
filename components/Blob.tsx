"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function BlobObject() {
  const materialRef = useRef<any>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Smooth premium breathing 0 → 1
    const blend = (Math.sin(t * 0.8) + 1) / 2;

    // Blue → White
    const deepBlue = new THREE.Color("#8400FF"); // premium soft blue
    const white = new THREE.Color("#8400FF");

    // Lerp color
    const finalColor = deepBlue.clone().lerp(white, blend);

    if (materialRef.current) {
      // Distortion breathing
      materialRef.current.distort = 0.35 + Math.sin(t * 1.3) * 0.08;

      // Apply smooth color
      materialRef.current.color = finalColor;

      // Glow color follows color
      materialRef.current.emissive = finalColor;

      // Emissive pulse
      materialRef.current.emissiveIntensity = 0.6 + blend * 1.4;
    }
  });

  return (
    <Sphere args={[1.8, 64, 64]} scale={1.2}>
      <MeshDistortMaterial
        ref={materialRef}
        roughness={0.4}
        metalness={0.1}
        distort={1}
        speed={1}
      />
    </Sphere>
  );
}

export default function Blob() {
  return (
    <Canvas
      className="absolute pointer-events-none"
      style={{
        width: "1300px",
        height: "1300px",
        marginTop: "30%",   // adjust blob position
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 4.5] }}
    >
      <ambientLight intensity={0.8} />

      {/* Premium white light core */}
      <pointLight position={[0, 1, 3]} intensity={4.5} color="#ffffff" distance={10} power={1000}/>

      {/* Soft blue under-light */}
      <pointLight position={[0, 4, 3]} intensity={3} color="#ffffff" power={1000}/>

      <BlobObject />
    </Canvas>
  );
}
