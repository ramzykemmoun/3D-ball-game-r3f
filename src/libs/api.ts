export async function createUser(username: string) {
  const response = await fetch(process.env.VITE_API_URL! + "/player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Name: username }),
  });
  const { data } = await response.json();
  return data.player.InsertedID;
}

export async function updateScore(userId: string, score: number) {
  const response = await fetch(
    process.env.VITE_API_URL! + `/player/score/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Score: score + 0.02 }),
    }
  );

  const { data } = await response.json();
  return data.player.MatchedCount > 0;
}

export async function getLeaderboard() {
  const response = await fetch(process.env.VITE_API_URL! + "/leaderboard");
  const { data } = await response.json();
  if (data.results) {
    return data.results;
  }

  return [];
}
