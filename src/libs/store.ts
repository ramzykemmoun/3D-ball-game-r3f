import { GameStore } from "@/types/Game";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useGame = create<GameStore>()(
  subscribeWithSelector((set) => ({
    trapsCount: Math.floor(Math.random() * (20 - 5) + 5),
    phase: "ready",
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
        return { phase: "ready" };
      });
    },

    end: () => {
      set((state) => {
        if (state.phase === "playing")
          return { phase: "gameover", endTime: Date.now() };

        return {};
      });
    },
  }))
);
