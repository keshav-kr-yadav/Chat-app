import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
function SignUp() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const handleClick1 = () => setShow1(!show1);
  const handleClick2 = () => setShow2(!show2);
  const chageHandler = (e) => {
    state[e.target.name] = e.target.value;
    setState({ ...state });
    console.log(state);
  };
  const submitHandler = (e) => {
    alert('hii');
  };
  return (
    <VStack spacing={"5px"}>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" onChange={chageHandler} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" name="email" onChange={chageHandler} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show1 ? "text" : "password"}
            name="password"
            onChange={chageHandler}
          />
          <InputRightElement>
            <Button onClick={handleClick1} variant="unstyled">
              {show1 ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show2 ? "text" : "password"}
            name="confirmPassword"
            onChange={chageHandler}
          />
          <InputRightElement>
            <Button onClick={handleClick2} variant="unstyled">
              {show2 ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Profile</FormLabel>
        <Input type="file" name="pic" onChange={chageHandler} />
      </FormControl>
      <Button width={"100%"} colorScheme="green" onClick={submitHandler}>
        Login
      </Button>
    </VStack>
  );
}

export default SignUp;
