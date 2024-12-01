import { Canvas } from "@react-three/fiber";
import { Experience, UI } from "@/components";
import { KeyboardControls } from "@react-three/drei";
import { keyboardControls } from "@/libs/keyboard";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    toast("This game contain a web vulnerability, can you find it?", {
      duration: 6000,
      style: {
        fontSize: "24px",
      },
    });
  }, []);
  return (
    <>
      <Toaster position="top-center" />
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
    </>
  );
}

export default App;
