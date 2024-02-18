import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const profileData = await res.json();
        if (profileData.error) {
          showToast("Error", profileData.error, "error");
          return;
        }
        setUser(profileData);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username, showToast]);
  return { loading, user };
};

export default useGetUserProfile;
