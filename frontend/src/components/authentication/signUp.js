import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../errMessage";
import { registerAction } from "../../redux/action/authAction";
function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { loading, error,message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const handleClick = () => setShow(!show);
  const uplodImage = async (file) => {
    if (file === undefined) {
      setLoading(true);
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat-app");
    formData.append("cloud_name", "dvbvv6bx6");
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dvbvv6bx6/image/upload",
        formData
      );
      setPic(data.url);
      setLoading(false);
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };
  const submitHandler = async (e) => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
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
      return;
    }
    dispatch(registerAction(name, email, password, pic));
  };
  useEffect(() => {
    
  },[error,message])
  return (
    <VStack spacing={"5px"}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {message && <ErrorMessage>{message }</ErrorMessage> }
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
        isLoading={isLoading || loading}
      >
        SignUp
      </Button>
    </VStack>
  );
}

export default SignUp;
