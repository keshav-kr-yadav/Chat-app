import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleClick = () => setShow(!show);
  const submitHandler = async (e) => {
    setIsLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoading(false);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setIsLoading(false);
    }
  };
  return (
    <VStack spacing={5}>
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
        isLoading={isLoading}
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;
