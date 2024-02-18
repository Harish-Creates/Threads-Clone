import { Flex, Image, useColorMode } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import {Link, Link as RouterLink} from "react-router-dom"
import { RxAvatar } from "react-icons/rx";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const currentUser = useRecoilValue(userAtom);

  return (
    <>
      <Flex justifyContent={"space-between"} mt={6} mb={"12"}>
        {currentUser && (
          <Link as={RouterLink} to="/">
            <AiFillHome size={24} />
          </Link>
        )}
        <Image
          cursor={"pointer"}
          alt="Logo"
          w={6}
          onClick={toggleColorMode}
          src={
            colorMode === "dark" ? "/svg/light-icon.svg" : "/svg/dark-icon.svg"
          }
        />
        {currentUser && (
          <Link as={RouterLink} to={`${currentUser.username}`}>
            <RxAvatar size={24} />
          </Link>
        )}
      </Flex>
    </>
  );
};

export default Header;
