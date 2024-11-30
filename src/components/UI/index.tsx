import { cn } from "@/libs/cn";
import { useGame } from "@/libs/store";
import { useKeyboardControls } from "@react-three/drei";
import { addEffect } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import Auth from "./Auth";
import Leaderboard from "./Leaderboard";
import { getLeaderboard } from "@/libs/api";

export default function UI() {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);
  const showLeaderboard = useGame((state) => state.showLeaderboard);

  const phase = useGame((state) => state.phase);
  const restart = useGame((state) => state.restart);
  const toggleLeaderboard = useGame((state) => state.toggleLeaderboard);
  const [subscribeKeys] = useKeyboardControls();

  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    getLeaderboard().then(setLeaderboard);
  }, []);
  const time = useRef<HTMLDivElement>(null);

  const userId = useGame((state) => state.userId);

  useEffect(() => {
    const unsubscribeReset = subscribeKeys(
      ({ reset }) => reset && userId,
      (value) => {
        if (value) {
          restart();
        }
      }
    );

    return () => {
      unsubscribeReset();
    };
  }, [restart, subscribeKeys, userId]);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) {
      useGame.getState().setUserId(userIdFromStorage);
    }
  }, []);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      if (!state.userId) return;
      let elapsedTime = 0;
      if (state.phase === "playing" && state.startTime) {
        elapsedTime = Date.now() - state.startTime;
      } else if (
        state.phase === "gameover" &&
        state.startTime &&
        state.endTime
      ) {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime = elapsedTime / 1000;
      state.setScore(elapsedTime);
      time.current!.textContent = elapsedTime.toFixed(2);
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <>
      {!userId && <Auth />}
      {showLeaderboard && <Leaderboard leaderboard={leaderboard} />}
      <div className="ui">
        <button className="toggle-leaderboard" onClick={toggleLeaderboard}>
          Leaderboard
        </button>
        <div ref={time} className="time">
          0.00
        </div>
        {phase === "gameover" && (
          <div onClick={restart} className="restart">
            restart
          </div>
        )}
        {phase !== "gameover" && (
          <div className="keys-container">
            <div className="keys">
              <div
                className={cn("key", "up", {
                  active: forward,
                })}
              ></div>
              <div
                className={cn("key", "left", {
                  active: leftward,
                })}
              ></div>
              <div
                className={cn("key", "right", {
                  active: rightward,
                })}
              ></div>
              <div
                className={cn("key", "down", {
                  active: backward,
                })}
              ></div>
              <div
                className={cn("key", "space", {
                  active: jump,
                })}
              ></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
