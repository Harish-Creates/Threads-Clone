import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Actions from "../components/Actions";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";

const PostPage = () => {
  const { pid } = useParams();
  const { user, loading } = useGetUserProfile();
  const [post, setPost] = useState(null);
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPost(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pid]);
  console.log(post);
  const handleDeletePost = async () => {
    setIsDeleting(true);
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Post deleted", "successfully", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} h={"20vh"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!post) {
    return <h1>No Post Found</h1>;
  }
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} name={user.name} size={"md"} />
          <Flex alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Image src="/images/verified.png" w="4" h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text
            fontSize={"xs"}
            width={36}
            textAlign={"right"}
            color={"gray.light"}
          >
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>
          {currentUser?._id === user._id && (
            <Button
              size={"xs"}
              onClick={handleDeletePost}
              isLoading={isDeleting}
            >
              <DeleteIcon color={"gray.500"} size={"sm"} />
            </Button>
          )}
        </Flex>
      </Flex>
      <Text my={3}>{post.text}</Text>
      {post.img &&  <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={post.img} w={"full"} alt="post1" />
      </Box>}
      <Flex gap={3} my={3}>
        <Actions post={post} />
      </Flex>

      <Divider my={4} />
      {!user && (
        <>
          <Flex justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"2xl"}>👋</Text>
              <Text color={"gray.light"}>Login to like & reply</Text>
            </Flex>
            <Button>Get</Button>
          </Flex>
          <Divider my={4} />
        </>
      )}
      {post.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={reply._id === post.replies[post.replies.length - 1]._id}
        />
      ))}
    </>
  );
};

export default PostPage;
