import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

const UserHeader = ({ user }) => {
  // console.log(user);
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [updating, setUpdating] = useState(false);
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );
  console.log(following);
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      showToast("Profile Link Copied", "in your clipboard", "success");
    });
  };

  const handleFollowUnfollow = async () => {
    try {
      if (!currentUser) {
        showToast("Error", "Please login to follow", "error");
        return;
      }
      if(updating) return;
      setUpdating(true);
      const res = await fetch(`api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      if (following) {
        showToast("Unfollowed", `${user.name} `, "success");
        user.followers.pop();
      } else {
        showToast("User followed", "successfully", "success");
        user.followers.push(currentUser?._id);
      }
      setFollowing(!following);
      console.log(data);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setUpdating(false);
    }
  };
  return (
    <>
      <VStack align={"start"} gap={6}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Box>
            <Text fontSize="2xl" fontWeight={"bold"}>
              {user.name}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"}>{user.username}</Text>
              <Text
                fontSize={"xs"}
                bg={"gray.dark"}
                color={"gray.light"}
                p={1}
                borderRadius={"full"}
              >
                threads.net
              </Text>
            </Flex>
          </Box>
          <Box>
            {user.profilePic && (
              <Avatar name={user.name} src={user.profilePic} size="xl" />
            )}
            {!user.profilePic && (
              <Avatar
                name={user.name}
                src="https://bit.ly/broken-link"
                size="xl"
              />
            )}
          </Box>
        </Flex>
        <Text>{user.bio}</Text>
        {currentUser?._id === user._id && (
          <Link as={RouterLink} to="/updateprofile">
            <Button size={"sm"}> Update Profile</Button>
          </Link>
        )}
        {currentUser?._id != user._id && (
          <Button
            isLoading={updating}
            onClick={handleFollowUnfollow}
            size={"sm"}
          >
            {following ? "Following" : "Follow"}
          </Button>
        )}
        <Flex w={"full"} justifyContent={"space-between"}>
          <Flex gap={2} alignItems={"center"} justifyContent={"center"}>
            <Text color={"gray.light"}>{user.followers.length} followers</Text>
            <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"} />
            <Link color={"gray/light"}>Instagram.com</Link>
          </Flex>

          <Flex>
            <Box className="icon-container">
              <BsInstagram size={24} cursor={"pointer"} />
            </Box>
            <Box className="icon-container">
              <Menu>
                <MenuButton>
                  <CgMoreO size={24} cursor={"pointer"} />
                </MenuButton>
                <Portal>
                  <MenuList bg={"gray.dark"}>
                    <MenuItem bg={"gray.dark"} onClick={copyURL}>
                      Copy Link User Link
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>
        </Flex>
        <Flex w={"full"}>
          <Flex
            pb={3}
            flex={1}
            borderBottom={"1.5px solid white"}
            justifyContent={"center"}
            cursor={"pointer"}
          >
            <Text fontWeight={"bold"}>Threads</Text>
          </Flex>
          <Flex
            pb={3}
            flex={1}
            borderBottom={"1.5px solid gray"}
            justifyContent={"center"}
            cursor={"pointer"}
            color={"gray.light"}
          >
            <Text fontWeight={"bold"}>Replies</Text>
          </Flex>
        </Flex>
      </VStack>
    </>
  );
};

export default UserHeader;
