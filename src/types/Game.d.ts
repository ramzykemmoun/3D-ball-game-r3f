export type GameStore = {
  trapsCount: number;
  phase: "ready" | "playing" | "gameover";
  start: () => void;
  restart: () => void;
  end: () => void;
  startTime?: number;
  endTime?: number;
};
