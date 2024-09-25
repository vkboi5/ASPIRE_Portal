import { Stack, Button, Box } from "@chakra-ui/react";
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
      <Stack marginTop= "100px" spacing="6" className="signup-container" align="center">
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap="20px">
          <Button
            width="150px"
            height="150px"
            backgroundColor="#F0F0F0"
            onClick={() => setUserType("GovtAgency")}
          >
            Government <br /> Agency
          </Button>
          <Button
            width="150px"
            height="150px"
            backgroundColor="#F0F0F0"
            onClick={() => setUserType("Incubator")}
          >
            Incubator
          </Button>
          <Button
            width="150px"
            height="150px"
            backgroundColor="#F0F0F0"
            onClick={() => setUserType("Investor")}
          >
            Investor
          </Button>
          <Button
            width="150px"
            height="150px"
            backgroundColor="#F0F0F0"
            onClick={() => setUserType("Mentor")}
          >
            Mentor
          </Button>
          <Button
            width="150px"
            height="150px"
            backgroundColor="#F0F0F0"
            onClick={() => setUserType("PublicUser")}
          >
            Public User
          </Button>
          <Button
            width="150px"
            height="150px"
            backgroundColor="#F0F0F0"
            onClick={() => setUserType("StartUp")}
          >
            StartUp
          </Button>
        </Box>

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
          ""
        )}
      </Stack>
    </div>
  );
};

export default Signup;
