import { PlayerDirection, PlayerOptions } from "@/types/Player";
import { RapierRigidBody } from "@react-three/rapier";
import { RefObject } from "react";
import { World, Ray } from "@dimforge/rapier3d-compat";
import * as THREE from "three";

class GamePlayer {
  position: [number, number, number];
  impulse: {
    x: number;
    y: number;
    z: number;
  };
  torque: {
    x: number;
    y: number;
    z: number;
  } = {
    x: 0,
    y: 0,
    z: 0,
  };
  impulseStrength: number;
  torqueStrength: number;
  ref: RefObject<RapierRigidBody>;
  friction: number;
  restitution: number;
  linearDamping: number;
  angularDamping: number;
  radius: number;
  initialPosition: [number, number, number];
  color: string;

  constructor({
    position = [0, 0, 0],
    impulse = { x: 0, y: 0, z: 0 },
    torque = { x: 0, y: 0, z: 0 },
    impulseStrength = 0,
    torqueStrength = 0,
    ref,
    friction = 0.5,
    restitution = 0.2,
    linearDamping = 0.5,
    angularDamping = 0.5,
    radius = 0.3,
    color = "red",
  }: PlayerOptions) {
    this.position = position;
    this.initialPosition = position;
    this.impulse = impulse;
    this.torque = torque;
    this.impulseStrength = impulseStrength;
    this.torqueStrength = torqueStrength;
    this.ref = ref;
    this.friction = friction;
    this.restitution = restitution;
    this.linearDamping = linearDamping;
    this.angularDamping = angularDamping;
    this.radius = radius;
    this.color = color;
  }

  move(direction: PlayerDirection, delta: number) {
    if (direction === "forward") {
      this.impulse.z -= this.impulseStrength * delta;
      this.torque.x -= this.torqueStrength * delta;
    }

    if (direction === "rightward") {
      this.impulse.x += this.impulseStrength * delta;
      this.torque.z -= this.torqueStrength * delta;
    }

    if (direction === "backward") {
      this.impulse.z += this.impulseStrength * delta;
      this.torque.x += this.torqueStrength * delta;
    }

    if (direction === "leftward") {
      this.impulse.x -= this.impulseStrength * delta;
      this.torque.z += this.torqueStrength * delta;
    }
  }

  jump(world: World, ray: typeof Ray) {
    const origin = this.ref.current?.translation() || { x: 0, y: 0, z: 0 };
    origin.y -= this.radius + 0.01;

    const direction = { x: 0, y: -1, z: 0 };

    const rayInstance = new ray(origin, direction);

    const hit = world.castRay(rayInstance, 10, true);

    if (hit!.timeOfImpact < 0.15) {
      this.ref.current?.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
    }
  }

  applyForce() {
    this.ref.current?.applyImpulse(this.impulse, true);
    this.ref.current?.applyTorqueImpulse(this.torque, true);
  }
  resetForce() {
    this.impulse = { x: 0, y: 0, z: 0 };
    this.torque = { x: 0, y: 0, z: 0 };
  }

  lookAt(
    camera: THREE.Camera,
    delta: number,
    smoothedCameraPosition: THREE.Vector3,
    smoothedCameraTarget: THREE.Vector3
  ) {
    const bodyPosition = this.ref.current?.translation() || {
      x: 0,
      y: 0,
      z: 0,
    };
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);

    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, delta * 5);
    smoothedCameraTarget.lerp(cameraTarget, delta * 5);

    camera.position.copy(smoothedCameraPosition);
    camera.lookAt(smoothedCameraTarget);
  }

  hasReachedGoal(blocksCount: number) {
    const bodyPosition = this.ref.current?.translation() || {
      x: 0,
      y: 0,
      z: 0,
    };

    if (bodyPosition.z < -(blocksCount * 4 + 2)) {
      return 1;
    }

    if (bodyPosition.y < -4) {
      return -1;
    }

    return 0;
  }

  resetPosition() {
    const [x, y, z] = this.initialPosition;
    this.ref.current?.setTranslation({ x, y, z }, true);
    this.removeForces();
  }

  removeForces() {
    this.ref.current?.setLinvel({ x: 0, y: 0, z: 0 }, true);
    this.ref.current?.setAngvel({ x: 0, y: 0, z: 0 }, true);
  }
}

export default GamePlayer;
