import { Lights, Level, Player } from "@/components";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { AxeBlock, LimboBlock, SpinnerBlock } from "@/components/Level/Blocks";
import { useGame } from "@/libs/store";

export default function Experience() {
  const trapsCount = useGame((state) => state.trapsCount);
  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      <OrbitControls makeDefault />
      <Physics>
        <Lights />
        <Player />
        <Level
          trapsCount={trapsCount}
          traps={[AxeBlock, LimboBlock, SpinnerBlock]}
        />
      </Physics>
    </>
  );
}
