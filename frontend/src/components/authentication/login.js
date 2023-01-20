import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../redux/action/authAction";
import ErrorMessage from "../errMessage";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var { userInfo, loading, error } = useSelector((state) => state.auth);
  const handleClick = () => setShow(!show);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/chats");
    }
  }, [userInfo, error,navigate]);
  return (
    <VStack spacing={5}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              variant="unstyled"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        width={"100%"}
        colorScheme="green"
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;
