import { PublicApi, RaycastVehiclePublicApi } from "@react-three/cannon";
import { useEffect, useState } from "react";

type Keys = "w" | "a" | "s" | "d";

export const useControls = (
  vehicleApi: RaycastVehiclePublicApi,
  chassisApi: PublicApi
) => {
  const [controls, setControls] = useState<Record<Keys, boolean>>({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  // Record key presses
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (["w", "a", "s", "d"].includes(key)) {
        setControls((state) => ({
          ...state,
          [key as Keys]: true,
        }));
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (["w", "a", "s", "d"].includes(key)) {
        setControls((state) => ({
          ...state,
          [key as Keys]: false,
        }));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Control car
  useEffect(() => {
    // Forwards / backwards
    if (controls.w) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    // Left / right
    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      vehicleApi.setSteeringValue(0, 2);
      vehicleApi.setSteeringValue(0, 3);
      vehicleApi.setSteeringValue(0, 0);
      vehicleApi.setSteeringValue(0, 1);
    }
  }, [controls.w, controls.a, controls.s, controls.d, vehicleApi, chassisApi]);

  return controls;
};
