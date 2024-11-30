import { getLeaderboard } from "@/libs/api";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    getLeaderboard().then((data) => {
      setLeaderboard(data);
    });
  }, []);
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <div className="leaderboard-list">
        {leaderboard.length > 0 ? (
          leaderboard.map(
            (player: { name: string; bestScore: number }, index: number) => {
              return (
                <div className="leaderboard-item" key={index}>
                  <span>{player.name}</span>
                  <span>{player.bestScore.toFixed(2)}</span>
                </div>
              );
            }
          )
        ) : (
          <div>Not found.</div>
        )}
      </div>
    </div>
  );
}
