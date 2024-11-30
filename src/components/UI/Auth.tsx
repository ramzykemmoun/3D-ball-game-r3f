import { createUser } from "@/libs/api";
import { useGame } from "@/libs/store";
import { useState } from "react";

export default function Auth() {
  const [username, setUsername] = useState<string>("");
  const setUserId = useGame((state) => state.setUserId);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      const userId = await createUser(username);
      if (!localStorage.getItem("userId")) {
        localStorage.setItem("userId", userId);
      }
      setUserId(userId);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}
