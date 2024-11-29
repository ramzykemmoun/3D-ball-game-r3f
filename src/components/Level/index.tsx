import { StartBlock, EndBlock } from "@/components/Level/Blocks";
import { BlockProps } from "@/types/Block";
import { FC, useMemo } from "react";
import Walls from "./Walls";

type Props = {
  trapsCount: number;
  traps: FC<BlockProps>[];
};

export default function Level({ trapsCount, traps }: Props) {
  const blocks = useMemo(
    () =>
      Array.from({ length: trapsCount }, () => {
        return traps[Math.floor(Math.random() * traps.length)];
      }),
    [traps, trapsCount]
  );

  return (
    <>
      <StartBlock position={[0, 0, 0]} />

      {blocks.map((Block, i) => (
        <Block key={i} position={[0, 0, -(i + 1) * 4]} />
      ))}

      <EndBlock position={[0, 0, -(trapsCount + 1) * 4]} />

      <Walls length={trapsCount + 2} />
    </>
  );
}
