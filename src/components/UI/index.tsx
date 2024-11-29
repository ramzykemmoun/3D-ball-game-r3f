import { cn } from "@/libs/cn";
import { useGame } from "@/libs/store";
import { useKeyboardControls } from "@react-three/drei";
import { addEffect } from "@react-three/fiber";
import { useEffect, useRef } from "react";
export default function UI() {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const phase = useGame((state) => state.phase);
  const restart = useGame((state) => state.restart);
  const [subscribeKeys] = useKeyboardControls();

  const time = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribeReset = subscribeKeys(
      ({ reset }) => reset,
      (value) => {
        if (value) {
          restart();
        }
      }
    );

    return () => {
      unsubscribeReset();
    };
  }, [phase, restart, subscribeKeys]);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
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
      time.current!.textContent = elapsedTime.toFixed(2);
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="ui">
      <div ref={time} className="time">
        0.00
      </div>
      {phase === "gameover" && (
        <div onClick={restart} className="restart">
          restart
        </div>
      )}
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
    </div>
  );
}
