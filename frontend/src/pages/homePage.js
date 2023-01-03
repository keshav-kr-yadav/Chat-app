import React from "react";
import { Container, Box, Text ,Tabs,TabList,Tab,TabPanel,TabPanels} from "@chakra-ui/react";
import Login from "../components/authenticatiob/login";
import SignUp from "../components/authenticatiob/signUp";
function HomePage() {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        bg="white"
        w="100%"
        m="40px 0px 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text textAlign={"center"} fontSize="4xl" fontFamily={"sans-serif"}>
          Let's Talk
        </Text>
      </Box>
      <Box bg="white" w="100%" borderRadius="lg" borderWidth="1px" p={4}>
        <Tabs variant="soft-rounded" >
          <TabList mb='1em'>
            <Tab w='50%'>Login</Tab>
            <Tab w='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
