import {Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  useEffect(() => {
    const getFeed = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        setPosts(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeed();
  }, [showToast]);
  return (
    <>
      {loading && (
        <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!loading && posts.length === 0 && <h1>Follow Users to fill your</h1>}
      {posts.map((post) => (
        <Post post={post} key={post._id} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default HomePage;
