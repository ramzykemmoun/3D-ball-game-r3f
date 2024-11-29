import { Canvas } from "@react-three/fiber";
import { Experience, UI } from "@/components";
import { KeyboardControls } from "@react-three/drei";
import { keyboardControls } from "@/libs/keyboard";

function App() {
  return (
    <KeyboardControls map={keyboardControls}>
      <Canvas
        shadows
        camera={{
          position: [0, 1, 20],
          fov: 60,
          far: 1000,
          near: 0.1,
        }}
      >
        <Experience />
      </Canvas>
      <UI />
    </KeyboardControls>
  );
}

export default App;
