export type GameStore = {
  trapsCount: number;
  phase: "ready" | "playing" | "gameover";
  start: () => void;
  restart: () => void;
  end: () => void;
  startTime?: number;
  endTime?: number;
  userId: string | null;
  setUserId: (userId: string) => void;
  score: number;
  setScore: (score: number) => void;
  showLeaderboard: boolean;
  setShowLeaderboard: (showLeaderboard: boolean) => void;
  toggleLeaderboard: () => void;
};
