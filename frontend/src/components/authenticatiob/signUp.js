import React, { useState } from "react";
import axios from "axios";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = React.useState(false);
  const toast = useToast();
  const handleClick = () => setShow(!show);
  const uplodImage = async (file) => {
    setIsLoading(true);
    if (file === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat-app");
    formData.append("cloud_name", "dvbvv6bx6");
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dvbvv6bx6/image/upload",
        formData
      );
      setPic(data.url);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };
  const submitHandler = async (e) => {
    try {
      setIsLoading(true);
      if (!name || !email || !password || !confirmPassword) {
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
      if (password !== confirmPassword) {
        toast({
          title: "Passwords Do Not Match",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setIsLoading(false);
        return;
      }
      const { data } = await axios.post("/api/user/signup", {
        name,
        email,
        password,
        pic,
      });
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoading(false);
      return;
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      return;
    }
  };
  return (
    <VStack spacing={"5px"}>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick} variant="unstyled">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick} variant="unstyled">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Profile</FormLabel>
        <Input type="file" onChange={(e) => uplodImage(e.target.files[0])} />
      </FormControl>
      <Button
        width={"100%"}
        colorScheme="green"
        onClick={submitHandler}
        isLoading={isLoading}
      >
        SignUp
      </Button>
    </VStack>
  );
}

export default SignUp;
