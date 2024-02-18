import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post.jsx";
import useGetUserProfile from "../hooks/useGetUserProfile.js";

const UserPage = () => {

  const showToast = useShowToast();
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [gettingPosts, setGettingPosts] = useState(true);
  const { user, loading } = useGetUserProfile();

  useEffect(() => {
    const getPosts = async () => {
      setGettingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const postsData = await res.json();
        console.log(postsData);
        setPosts(postsData);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setGettingPosts(false);
      }
    };

    getPosts();
  }, [username, showToast]);
  if (!user && loading)
    return (
      <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  if (!user && !loading) return <h1>No User Found</h1>;

  console.log(user);
  return (
    <>
      <UserHeader user={user} />
      {!gettingPosts && posts.length === 0 && <h1>No Posts Found</h1>}
      {gettingPosts && (
        <Flex justifyContent={"center"} alignItems={"center"} h={"20vh"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts.map((post) => (
        <Post post={post} key={post._id} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;
