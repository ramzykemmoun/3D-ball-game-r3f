type Props = {
  leaderboard: Array<{ name: string; bestScore: number }>;
};

export default function Leaderboard({ leaderboard }: Props) {
  const cheaters = leaderboard.filter((p) =>
    p.name.includes("(cheater)")
  ).length;
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
                  <span>
                    {!player.name.includes("(cheater)") && index + 1 - cheaters}{" "}
                    {player.name}
                  </span>
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
