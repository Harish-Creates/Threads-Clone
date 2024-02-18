import { useRecoilValue } from "recoil"
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import authScreen from "../atoms/authAtom";

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreen);
    console.log(authScreenState)
  return (
    <>
        {authScreenState === 'login' ? <Login /> : <SignUp />}
    </>
  )
}

export default AuthPage