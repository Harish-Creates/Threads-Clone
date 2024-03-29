"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreen from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreen);
  const [signUpInputs, setSignUpInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const handleSignUp = async () => {
    console.log(signUpInputs);
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(signUpInputs),
      });
      console.log("before await");
      const data = await res.json();
      console.log("after await");

      if (data.error) {
        console.log(data.error);
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.setItem("user-threads", JSON.stringify(data));
      console.log(data);
      setSignUpInputs({
        name: "",
        username: "",
        email: "",
        password: "",
      });
      setUser(data);
    } catch (error) {
      showToast("Error", error, "error");
      console.log(error);
    }
  };
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    onChange={(e) =>
                      setSignUpInputs({
                        ...signUpInputs,
                        name: e.target.value,
                      })
                    }
                    value={signUpInputs.name}
                    type="text"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    onChange={(e) =>
                      setSignUpInputs({
                        ...signUpInputs,
                        username: e.target.value,
                      })
                    }
                    value={signUpInputs.username}
                    type="text"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                onChange={(e) =>
                  setSignUpInputs({ ...signUpInputs, email: e.target.value })
                }
                value={signUpInputs.email}
                type="email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  onChange={(e) =>
                    setSignUpInputs({
                      ...signUpInputs,
                      password: e.target.value,
                    })
                  }
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={() => handleSignUp()}
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                _hover={{ bg: useColorModeValue("gray.700", "gray.800") }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link onClick={() => setAuthScreen("login")} color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
