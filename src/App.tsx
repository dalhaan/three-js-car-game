import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";

function App() {
  return (
    <Canvas>
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
        <Scene />
      </Physics>
    </Canvas>
  );
}

export default App;
