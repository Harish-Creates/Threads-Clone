"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";

const UpdateProfile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const fileRef = useRef(null);
  const [updating, setUpdating] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    password: "",
    profilePic: user.profilePic,
  });
  const showToast = useShowToast();
  const { handleImageChange, imgUrl } = usePreviewImg();
  
  const handleSubmit = async (e) => {
    if (updating) return;
    setUpdating(true);
    e.preventDefault();
    try {
      console.log(userDetails);
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userDetails, profilePic: imgUrl }),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Profile Updated", "successfully", "success");
      setUser(data);
      localStorage.setItem("user-threads", JSON.stringify(data));
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };
  const handleCancel = () => {
    setUserDetails({
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      password: "",
      profilePic: user.profilePic,
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Flex align={"center"} justify={"center"} my={5}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={imgUrl || userDetails.profilePic} />
              </Center>
              <Center w="full">
                <Button onClick={() => fileRef.current.click()} w="full">
                  Change Profile Picture
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="Full Name"
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              value={userDetails.name}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Username"
              onChange={(e) =>
                setUserDetails({ ...userDetails, username: e.target.value })
              }
              value={userDetails.username}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="Email"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              value={userDetails.email}
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Your Bio"
              _placeholder={{ color: "gray.500" }}
              onChange={(e) =>
                setUserDetails({ ...userDetails, bio: e.target.value })
              }
              value={userDetails.bio}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="New Password"
              _placeholder={{ color: "gray.500" }}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              value={userDetails.password}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              onClick={handleCancel}
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              isLoading={updating}
              type="submit"
              bg={"green.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "green.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

export default UpdateProfile;
