import { KeyboardControlsEntry } from "@react-three/drei";

export const keyboardControls: KeyboardControlsEntry<string>[] = [
  { name: "forward", keys: ["ArrowUp", "keyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "reset", keys: ["KeyR"] },
];
