import { GameStore } from "@/types/Game";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useGame = create<GameStore>()(
  subscribeWithSelector((set) => ({
    score: 0,
    trapsCount: 40,
    phase: "ready",
    userId: null,
    showLeaderboard: false,
    setShowLeaderboard: (showLeaderboard: boolean) => {
      set(() => {
        return {
          showLeaderboard,
        };
      });
    },
    toggleLeaderboard: () => {
      set((state) => {
        return {
          showLeaderboard: !state.showLeaderboard,
        };
      });
    },
    setScore: (score: number) => {
      set(() => {
        return {
          score,
        };
      });
    },
    setUserId: (userId: string) => {
      set(() => {
        return {
          userId,
        };
      });
    },

    start: () => {
      set((state) => {
        if (state.phase === "ready") {
          return { phase: "playing", startTime: Date.now() };
        } else {
          return {};
        }
      });
    },

    restart: () => {
      set(() => {
        return {
          phase: "ready",
        };
      });
    },

    end: () => {
      set((state) => {
        if (state.phase === "playing")
          return {
            phase: "gameover",
            endTime: Date.now(),
            showLeaderboard: true,
          };

        return {};
      });
    },
  }))
);
