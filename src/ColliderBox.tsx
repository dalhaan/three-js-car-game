import { useBox } from "@react-three/cannon";

const debug = false;

type ColliderBoxProps = {
  position: [number, number, number];
  scale: [number, number, number];
};

export const ColliderBox = ({ position, scale }: ColliderBoxProps) => {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));

  return debug ? (
    <mesh position={position}>
      <boxGeometry args={scale} />
      <meshBasicMaterial transparent opacity={0.25} />
    </mesh>
  ) : null;
};
