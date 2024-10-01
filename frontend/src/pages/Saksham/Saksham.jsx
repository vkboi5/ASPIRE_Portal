import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Heading,
  Select,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

function Saksham() {
  const [formData, setFormData] = useState({
    startupName: "",
    fundingStatus: "",
    description: "",
    industry: "",
    sector: "",
    services: "",
    udyogAadhaar: "",
    natureOfEntity: "",
    interest: "",
  });
  const [step, setStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      handleVoiceInput(transcript);
    }
  }, [transcript]);

  const handleVoiceInput = (input) => {
    const fields = [
      "startupName",
      "fundingStatus",
      "description",
      "industry",
      "sector",
      "services",
      "udyogAadhaar",
      "natureOfEntity",
      "interest",
    ];
    setFormData({
      ...formData,
      [fields[step]]: input,
    });
    nextStep();
    resetTranscript();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    if (step < 8) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://aspirebackend-gywyy55s.b4a.run/api/startup", formData);
      console.log("Registration successful:", response.data);
      alert("Registration successful!");
      navigate("/startup/confirmation", { state: { formData } });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  };

  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning!";
    if (currentHour < 18) return "Good Afternoon!";
    return "Good Evening!";
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Text>What is the name of your startup?</Text>
            <Input
              placeholder="Enter your startup name"
              name="startupName"
              value={formData.startupName}
              onChange={handleChange}
              mt={2}
            />
          </>
        );
      case 1:
        return (
          <>
            <Text>What is the funding status?</Text>
            <Select
              placeholder="Select funding status"
              name="fundingStatus"
              value={formData.fundingStatus}
              onChange={handleChange}
              mt={2}
            >
              <option value="Funded">Funded</option>
              <option value="Bootstrapped">Bootstrapped</option>
            </Select>
          </>
        );
      case 2:
        return (
          <>
            <Text>Provide a brief description of your startup.</Text>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              mt={2}
              placeholder="Brief description of your startup"
            />
          </>
        );
      case 3:
        return (
          <>
            <Text>What industry does your startup belong to?</Text>
            <Input
              placeholder="Enter industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              mt={2}
            />
          </>
        );
      case 4:
        return (
          <>
            <Text>What sector does your startup operate in?</Text>
            <Input
              placeholder="Enter sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              mt={2}
            />
          </>
        );
      case 5:
        return (
          <>
            <Text>What services does your startup offer?</Text>
            <Textarea
              name="services"
              value={formData.services}
              onChange={handleChange}
              mt={2}
              placeholder="Describe your services"
            />
          </>
        );
      case 6:
        return (
          <>
            <Text>Please provide your Udyog Aadhar number.</Text>
            <Input
              placeholder="Enter Udyog Aadhar"
              name="udyogAadhaar"
              value={formData.udyogAadhaar}
              onChange={handleChange}
              mt={2}
            />
          </>
        );
      case 7:
        return (
          <>
            <Text>What is the nature of your entity?</Text>
            <Select
              placeholder="Select nature of entity"
              name="natureOfEntity"
              value={formData.natureOfEntity}
              onChange={handleChange}
              mt={2}
            >
              <option value="Proprietorship">Proprietorship</option>
              <option value="Partnership">Partnership</option>
              <option value="Private Limited">Private Limited</option>
              <option value="Public Limited">Public Limited</option>
            </Select>
          </>
        );
      case 8:
        return (
          <>
            <Text>What are your interests for the startup?</Text>
            <Textarea
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              mt={2}
              placeholder="Describe your interests"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Avatar size="xl" name="Saksham Bot" src="/path/to/government-logo.png" />
          <Heading fontSize={"4xl"}>Saksham Chatbot</Heading>
          <Text fontSize={"lg"}>{getGreetingMessage()} Let's start your application process.</Text>
        </Stack>

        <Box bg={useColorModeValue("white", "gray.700")} p={8} rounded={"lg"} boxShadow={"lg"}>
          {renderCurrentStep()}
          <Button mt={4} colorScheme="blue" onClick={nextStep}>
            {step === 8 ? "Submit" : "Next"}
          </Button>

          <Button mt={4} onClick={handleVoiceToggle} colorScheme={isListening ? "red" : "green"}>
            {isListening ? "Stop Voice Input" : "Start Voice Input"}
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Saksham;
