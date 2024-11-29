import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import GamePlayer from "@/libs/player";
import * as THREE from "three";
import { useGame } from "@/libs/store";

export default function Player() {
  const playerRef = useRef<RapierRigidBody>(null);

  const trapsCount = useGame((state) => state.trapsCount);
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);

  const player = useMemo(
    () =>
      new GamePlayer({
        position: [0, 4, 0],
        friction: 1,
        restitution: 0.2,
        linearDamping: 0.5,
        angularDamping: 0.5,
        radius: 0.3,
        impulseStrength: 0.6,
        torqueStrength: 0.2,
        ref: playerRef,
      }),
    []
  );

  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") {
          restart();
          player.resetPosition();
        }

        if (value === "gameover") {
          player.removeForces();
        }
      }
    );

    return () => {
      unsubscribeReset();
    };
  }, [restart, player]);
  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      ({ jump }) => jump,
      (value) => {
        if (value) player.jump(world, rapier.Ray);
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });
    return () => {
      unsubscribeJump();
      unsubscribeAny();
    };
  }, [subscribeKeys, player, world, rapier.Ray, start]);

  const [cameraPosition] = useState(() => new THREE.Vector3(16, 16, 16));
  const [cameraTarget] = useState(() => new THREE.Vector3());

  useFrame((state, delta) => {
    player.lookAt(state.camera, delta, cameraPosition, cameraTarget);

    const { forward, backward, leftward, rightward } = getKeys();

    player.resetForce();

    if (forward) player.move("forward", delta);
    if (backward) player.move("backward", delta);
    if (leftward) player.move("leftward", delta);
    if (rightward) player.move("rightward", delta);

    player.applyForce();

    player.lookAt(state.camera, delta, cameraPosition, cameraTarget);

    const status = player.hasReachedGoal(trapsCount);
    if (status === -1) {
      restart();
    }
    if (status === 1) {
      end();
    }
  });

  return (
    <RigidBody
      ref={player.ref}
      position={player.position}
      colliders="ball"
      restitution={player.restitution}
      friction={player.friction}
      canSleep={false}
      linearDamping={player.linearDamping}
      angularDamping={player.angularDamping}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[player.radius, 16]} />
        <meshStandardMaterial color={player.color} />
      </mesh>
    </RigidBody>
  );
}
