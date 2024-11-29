import { RapierRigidBody } from "@react-three/rapier";
import { RefObject } from "react";

export interface PlayerOptions {
  position?: [number, number, number];
  impulse?: {
    x: number;
    y: number;
    z: number;
  };
  torque?: {
    x: number;
    y: number;
    z: number;
  };
  impulseStrength?: number;
  torqueStrength?: number;
  ref: RefObject<RapierRigidBody>;
  friction?: number;
  restitution?: number;
  linearDamping?: number;
  angularDamping?: number;
  radius?: number;
  color?: string;
}

export type PlayerDirection = "forward" | "backward" | "leftward" | "rightward";
