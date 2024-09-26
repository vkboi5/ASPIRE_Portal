import { Stack, Button, Box, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import GovtAgency from "./UserBasedSignUp/GovtAgency";
import Investor from "./UserBasedSignUp/Investor";
import Incubator from "./UserBasedSignUp/Incubator";
import Mentor from "./UserBasedSignUp/Mentor";
import PublicUser from "./UserBasedSignUp/PublicUser";
import StartUp from "./UserBasedSignUp/StartUp";
import './SignUp.css';

const Signup = () => {
  const [userType, setUserType] = useState("");

  return (
    <div className="center-signup">
      <Stack marginTop="100px" spacing="8" className="signup-container" align="center">
        <Heading as="h1" size="xl" color="teal.600" textAlign="center" mb="6">
          Sign Up as a User Type
        </Heading>

        <Box display="flex" justifyContent="center" flexWrap="wrap" gap="20px">
          <Button
            width="160px"
            height="160px"
            backgroundColor={userType === "GovtAgency" ? "teal.500" : "#F0F0F0"}
            color={userType === "GovtAgency" ? "white" : "black"}
            _hover={{ backgroundColor: "teal.400" }}
            _active={{ backgroundColor: "teal.600" }}
            onClick={() => setUserType("GovtAgency")}
            borderRadius="10px"
            boxShadow="md"
            fontSize="md"
            transition="all 0.2s ease"
          >
            Government <br /> Agency
          </Button>
          <Button
            width="160px"
            height="160px"
            backgroundColor={userType === "Incubator" ? "teal.500" : "#F0F0F0"}
            color={userType === "Incubator" ? "white" : "black"}
            _hover={{ backgroundColor: "teal.400" }}
            _active={{ backgroundColor: "teal.600" }}
            onClick={() => setUserType("Incubator")}
            borderRadius="10px"
            boxShadow="md"
            fontSize="md"
            transition="all 0.2s ease"
          >
            Incubator
          </Button>
          <Button
            width="160px"
            height="160px"
            backgroundColor={userType === "Investor" ? "teal.500" : "#F0F0F0"}
            color={userType === "Investor" ? "white" : "black"}
            _hover={{ backgroundColor: "teal.400" }}
            _active={{ backgroundColor: "teal.600" }}
            onClick={() => setUserType("Investor")}
            borderRadius="10px"
            boxShadow="md"
            fontSize="md"
            transition="all 0.2s ease"
          >
            Investor
          </Button>
          <Button
            width="160px"
            height="160px"
            backgroundColor={userType === "Mentor" ? "teal.500" : "#F0F0F0"}
            color={userType === "Mentor" ? "white" : "black"}
            _hover={{ backgroundColor: "teal.400" }}
            _active={{ backgroundColor: "teal.600" }}
            onClick={() => setUserType("Mentor")}
            borderRadius="10px"
            boxShadow="md"
            fontSize="md"
            transition="all 0.2s ease"
          >
            Mentor
          </Button>
          <Button
            width="160px"
            height="160px"
            backgroundColor={userType === "PublicUser" ? "teal.500" : "#F0F0F0"}
            color={userType === "PublicUser" ? "white" : "black"}
            _hover={{ backgroundColor: "teal.400" }}
            _active={{ backgroundColor: "teal.600" }}
            onClick={() => setUserType("PublicUser")}
            borderRadius="10px"
            boxShadow="md"
            fontSize="md"
            transition="all 0.2s ease"
          >
            Public User
          </Button>
          <Button
            width="160px"
            height="160px"
            backgroundColor={userType === "StartUp" ? "teal.500" : "#F0F0F0"}
            color={userType === "StartUp" ? "white" : "black"}
            _hover={{ backgroundColor: "teal.400" }}
            _active={{ backgroundColor: "teal.600" }}
            onClick={() => setUserType("StartUp")}
            borderRadius="10px"
            boxShadow="md"
            fontSize="md"
            transition="all 0.2s ease"
          >
            StartUp
          </Button>
        </Box>

        {/* Conditional rendering based on the selected userType */}
        <Box mt="8" width="100%" maxWidth="800px">
          {userType === "GovtAgency" ? (
            <GovtAgency />
          ) : userType === "Incubator" ? (
            <Incubator />
          ) : userType === "Investor" ? (
            <Investor />
          ) : userType === "Mentor" ? (
            <Mentor />
          ) : userType === "PublicUser" ? (
            <PublicUser />
          ) : userType === "StartUp" ? (
            <StartUp />
          ) : (
            <Text textAlign="center" py="5"  color="blue.500" fontSize="lg">
              Please select a user type to proceed with the registration form.
            </Text>
          )}
        </Box>
      </Stack>
    </div>
  );
};

export default Signup;
