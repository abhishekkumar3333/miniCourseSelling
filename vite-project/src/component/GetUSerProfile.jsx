import { useEffect, useState } from "react";
import api from "../utils/api";

const useUserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/user/get-user-profile")
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
        setUser(null);
      });
  }, []);

  return user;
};

export default useUserProfile;
