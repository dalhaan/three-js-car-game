import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Track() {
  const result = useLoader(GLTFLoader, "models/track.glb");
  const colourMap = useLoader(TextureLoader, "textures/track.png");

  useEffect(() => {
    colourMap.anisotropy = 16;
  }, [colourMap]);

  const geometry = result.scene.children[0].geometry;

  return (
    <mesh>
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial toneMapped={false} map={colourMap} />
    </mesh>
  );
}
