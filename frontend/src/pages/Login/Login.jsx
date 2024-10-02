import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Custom CSS with updated styles
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/authSlice';
const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    setLoading(true);

    if (!credentials.email || !credentials.password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "left-accent",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://aspirebackend-gywyy55s.b4a.run/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      toast({
        title: data.message,
        status: data.success ? "success" : "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: data.success ? "solid" : "left-accent",
      });

      if (data.success) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setIsOtpSent(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Internal server error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
    }
  };

  const otpHandler = () => {
    if (otp === "12345") {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      toast({
        title: "OTP verified successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });

      dispatch(setUser(true));  // Set user as authenticated in Redux

      // Navigate to the correct dashboard based on userType
      if (userInfo.userType === "startUp") {
        navigate("/startup/dashboard");
      } else if (userInfo.userType === "incubator") {
        navigate("/incubator/dashboard");
      } else if (userInfo.userType === "govtAgency") {
        navigate("/admin/dashboard");
      } else if (userInfo.userType === "mentor") {
        navigate("/yettobedone");
      } else if (userInfo.userType === "investor") {
        navigate("/investor/dashboard");
      } else {
        navigate("/yetobedone");
      }
    } else {
      toast({
        title: "Invalid OTP, please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
    }
  };

  return (
    <main className="frame-login">
      <div className="container-login">
        <section className="wrapper">
          <div className="heading">
            <h1 className="text text-large">Sign In</h1>
            <p className="text text-xl">
              New user?{" "}
              <span>
                <a href="/signup" className="text text-links">
                  Create an account
                </a>
              </span>
            </p>
          </div>
          <Stack spacing={4}>
            {!isOtpSent ? (
              <>
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                    textColor={"black"}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    value={credentials.email}
                    onChange={handleCredentials}
                    className="input-field"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      textColor={"black"}
                      type={show ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={credentials.password}
                      onChange={handleCredentials}
                      className="input-field"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack direction="row" justify="space-between" align="center">
                  <a href="#" className="text text-links">
                    Forgot Password
                  </a>
                  <Button
                    colorScheme="blue"
                    isLoading={loading}
                    onClick={submitHandler}
                    className="input-submit w-1/3"
                  >
                    Sign In
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <FormControl>
                  <FormLabel htmlFor="otp">Enter OTP</FormLabel>
                  <Input
                    textColor={"black"}
                    type="text"
                    name="otp"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input-field"
                  />
                </FormControl>
                <Button
                  colorScheme="blue"
                  isLoading={loading}
                  onClick={otpHandler}
                  className="input-submit w-1/3 mt-4"
                >
                  Verify OTP
                </Button>
              </>
            )}
          </Stack>
        </section>
      </div>
    </main>
  );
};

export default Login;
