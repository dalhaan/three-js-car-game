import { RefObject } from "react";
import { Group } from "three";

const debug = true;

type WheelDebugProps = {
  radius: number;
  wheelRef: RefObject<Group>;
};

export const WheelDebug = ({ radius, wheelRef }: WheelDebugProps) => {
  return debug ? (
    <group ref={wheelRef}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius, radius, 0.015, 16]} />
        <meshNormalMaterial transparent opacity={0.25} />
      </mesh>
    </group>
  ) : null;
};
