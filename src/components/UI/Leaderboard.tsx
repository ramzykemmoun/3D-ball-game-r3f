type Props = {
  leaderboard: Array<{ name: string; bestScore: number }>;
};

export default function Leaderboard({ leaderboard }: Props) {
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <div className="leaderboard-list">
        {leaderboard.length > 0 ? (
          leaderboard.map(
            (player: { name: string; bestScore: number }, index: number) => {
              return (
                <div
                  style={{
                    color: player.name.includes("(cheater)") ? "red" : "black",
                  }}
                  className="leaderboard-item"
                  key={index}
                >
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
