import React, { forwardRef } from 'react';
import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  Divider,
  Flex,
  Grid,
  GridItem,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { QRCodeCanvas } from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import StartupLogo from '../../assets/StartupLogo.png';
import profilePic from '../../assets/dapDP.png';
import signature from '../../assets/signature.png';

const DAP = forwardRef((props, ref) => {
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: 'Digital Ayush Passport',
    pageStyle: `
      @page {
        size: A4;
        margin: 20px;
      }
      body {
        margin: 0;
        font-family: Arial, sans-serif;
      }
      .no-page-break {
        page-break-inside: avoid;
      }
    `,
  });

  const navigate = useNavigate();

  // Placeholder fake data for now
  const fakeData = {
    logo: StartupLogo, // Real logo image
    profilePicture: profilePic, // Real profile image
    dapId: 'DAP-123456789',
    startupName: 'Innovative Solutions Ltd.',
    founderName: 'John Doe',
    registrationNumber: 'REG-9876543210',
    certifications: 'ISO 9001, CE, FCC',
    licenses: 'License #4567, License #8910',
    qrCodeLink: 'https://www.example.com',
    validUntil: '31-12-2025',
    signature: signature, // Real signature image
    location: '1234 Innovation Drive, Tech City, TX',
    contactDetails: 'contact@innovativesolutions.com',
    supportEmail: 'support@innovativesolutions.com',
    twitter: '@innovatesolutions',
    linkedin: 'linkedin.com/in/innovativesolutions',
    investorDashboard: 'Access the Investor Dashboard',
    complianceTracking: 'Real-time Compliance Monitoring',
    certificationStatus: 'Active',
    incentiveSystem: 'Earn rewards for collaboration',
  };

  // Pastel and subtle color schemes
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const sectionBgColor = useColorModeValue('white', 'gray.700');
  const boxShadow = useColorModeValue('lg', 'dark-lg');

  return (
    <Box marginTop="50px" p={8} bg={bgColor} color={textColor} rounded="2xl" boxShadow={boxShadow} maxW="1000px" mx="auto">
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb={4}>
        <Button
          onClick={() => navigate('/startup/dashboard')}
          bg="pink.200"
          color="white"
          _hover={{ bg: "pink.400" }}
          rounded="md"
        >
          Back
        </Button>
        <Button
          onClick={handlePrint}
          bg="green.200"
          color="white"
          _hover={{ bg: "green.400" }}
          rounded="md"
        >
          Download as PDF
        </Button>
      </Flex>

      <Box ref={ref} p={8} bg={sectionBgColor} color={textColor} rounded="xl" boxShadow="md" className="no-page-break">
        <Stack spacing={8}>
          {/* Flexbox Header Section */}
          <Flex justify="space-between" align="center" mb={6}>
            <Image
              src={fakeData.logo} // Real logo
              alt="Startup Logo"
              boxSize="120px"
            />
            <Heading as="h1" size="lg" color="blue.500">Digital Ayush Passport</Heading>
            <Image
              borderRadius="full"
              boxSize="100px"
              src={fakeData.profilePicture} // Real profile picture
              alt="Profile Picture"
              border="2px solid blue.200"
            />
          </Flex>

          {/* Unique ID and QR Code */}
          <Text textAlign="center" fontSize="lg" color="gray.500">Unique DAP ID: {fakeData.dapId}</Text>
          <Flex justify="center" mb={6}>
            <QRCodeCanvas value={fakeData.qrCodeLink} size={120} />
          </Flex>

          <Divider borderColor="gray.300" />

          {/* Main Body Section */}
          <Grid templateColumns="repeat(2, 1fr)" gap={6} className="no-page-break">

            {/* Personal Information & Registration Number */}
            <GridItem>
              <Box p={4} bg="pink.50" rounded="md" boxShadow="sm" className="no-page-break">
                <Heading as="h3" size="md" color="blue.400">Personal Information</Heading>
                <Text fontSize="md">Startup Name: {fakeData.startupName}</Text>
                <Text fontSize="md">Founder Name: {fakeData.founderName}</Text>
              </Box>
              <Box p={4} bg="yellow.50" rounded="md" boxShadow="sm" mt={4} className="no-page-break">
                <Heading as="h3" size="md" color="yellow.600">Registration Number</Heading>
                <Text fontSize="md">Registration No: {fakeData.registrationNumber}</Text>
              </Box>
            </GridItem>

            {/* Certification and Licensing & QR Code Validation */}
            <GridItem>
              <Box p={4} bg="blue.50" rounded="md" boxShadow="sm" className="no-page-break">
                <Heading as="h3" size="md" color="green.400">Certification and Licensing</Heading>
                <Text fontSize="md">Certifications: {fakeData.certifications}</Text>
                <Text fontSize="md">Licenses: {fakeData.licenses}</Text>
              </Box>
              <Box p={4} bg="gray.100" rounded="md" boxShadow="sm" mt={4} textAlign="center" className="no-page-break">
                <Heading as="h3" size="md" color="purple.400">QR Code Validation</Heading>
                <QRCodeCanvas value={fakeData.qrCodeLink} size={80} style={{ margin: '10px auto' }} />
                <Text fontSize="md">Scan for validation</Text>
              </Box>
            </GridItem>

            {/* Validation & Signature */}
            <GridItem>
              <Box p={4} bg="green.50" rounded="md" boxShadow="sm" className="no-page-break">
                <Heading as="h3" size="md" color="teal.400">Validation</Heading>
                <Text fontSize="md">Valid Until: {fakeData.validUntil}</Text>
              </Box>
              <Box p={4} bg="gray.50" rounded="md" boxShadow="sm" mt={4} textAlign="center" className="no-page-break">
                <Heading as="h3" size="md" color="pink.400">Signature</Heading>
                <Image
                  src={fakeData.signature} // Real signature
                  alt="Signature"
                  maxW="100px"
                  mx="auto"
                />
              </Box>
            </GridItem>

          </Grid>

          <Divider borderColor="gray.300" />

          {/* Extended Information Section */}
          <Grid templateColumns="repeat(2, 1fr)" gap={6} className="no-page-break">
            <GridItem>
              <Box p={4} bg="purple.50" rounded="md" boxShadow="sm">
                <Heading as="h3" size="md" color="purple.600">Investor Dashboard</Heading>
                <Text fontSize="md">{fakeData.investorDashboard}</Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box p={4} bg="cyan.50" rounded="md" boxShadow="sm">
                <Heading as="h3" size="md" color="cyan.600">Compliance Tracking</Heading>
                <Text fontSize="md">{fakeData.complianceTracking}</Text>
                <Text fontSize="md">Certification Status: {fakeData.certificationStatus}</Text>
              </Box>
            </GridItem>
          </Grid>

          <Divider borderColor="gray.300" />

          {/* Incentive System Section */}
          <Box p={4} bg="yellow.50" rounded="md" boxShadow="sm" className="no-page-break">
            <Heading as="h3" size="md" color="yellow.600">Incentive System</Heading>
            <Text fontSize="md">{fakeData.incentiveSystem}</Text>
          </Box>

          {/* Contact & Address Information Section */}
          <Grid templateColumns="repeat(3, 1fr)" gap={6} className="no-page-break">
            <GridItem>
              <Box p={4} bg="purple.50" rounded="md" boxShadow="sm">
                <Heading as="h3" size="md" color="purple.600">Address & Location</Heading>
                <Text fontSize="md">Location: {fakeData.location}</Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box p={4} bg="cyan.50" rounded="md" boxShadow="sm">
                <Heading as="h3" size="md" color="cyan.600">Contact & Support</Heading>
                <Text fontSize="md">Contact: {fakeData.contactDetails}</Text>
                <Text fontSize="md">Support Email: {fakeData.supportEmail}</Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box p={4} bg="pink.50" rounded="md" boxShadow="sm">
                <Heading as="h3" size="md" color="pink.600">Social Media</Heading>
                <Text fontSize="md">Twitter: {fakeData.twitter}</Text>
                <Text fontSize="md">LinkedIn: {fakeData.linkedin}</Text>
              </Box>
            </GridItem>
          </Grid>

        </Stack>
      </Box>
    </Box>
  );
});

export default DAP;
