import { createUser } from "@/libs/api";
import { useGame } from "@/libs/store";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Auth() {
  const [username, setUsername] = useState<string>("");
  const setUserId = useGame((state) => state.setUserId);
  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      const user = await createUser(username);
      const { error, userId } = user;

      if (error) {
        toast.error(error);
        return;
      }

      if (!localStorage.getItem("userId")) {
        localStorage.setItem("userId", userId);
      }
      setUserId(userId);
    }
  };
  return (
    <div className="form-container">
      <Toaster position="top-center" />
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
