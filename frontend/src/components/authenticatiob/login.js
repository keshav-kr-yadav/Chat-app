import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputRightElement,
  InputGroup
} from "@chakra-ui/react";
import React, { useState } from "react";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const chageHandler = (e) => {
    state[e.target.name] = e.target.value;
    setState({ ...state });
    console.log(state);
  };
  return (
    <VStack spacing={5}>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input type='email' onChange={chageHandler}></Input>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={show ? 'text' : 'password'} onChange={chageHandler}></Input>
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleClick} variant='unstyled'>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button width={"100%"} colorScheme="green">
        Login
      </Button>
    </VStack>
  );
}

export default Login;
