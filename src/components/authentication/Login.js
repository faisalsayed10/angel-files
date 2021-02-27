import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import CenterContainer from "../../util/CenterContainer";
import angel_files from "../../images/angel_files.png";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <CenterContainer>
      <Image
        width="160px"
        fallbackSrc={angel_files}
        margin="0 auto"
        mb="8"
        src={angel_files}
        alt="Angelfiles Logo"
      />
      <Box w="sm" h="100" px="6" py="8" borderWidth="2px" borderRadius="md">
        <Text as="h2" fontSize="2xl" align="center" mb="8">
          👋 Log In
        </Text>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl id="email" my="3">
            <Input
              variant="flushed"
              placeholder="Enter your email"
              type="email"
              ref={emailRef}
              required
            />
          </FormControl>
          <FormControl id="password" mb="3">
            <Input
              variant="flushed"
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </FormControl>
          <Center>
            <Button
              colorScheme="cyan"
              variant="ghost"
              isLoading={loading}
              w="100"
              my="4"
              type="submit"
            >
              Log In
            </Button>
          </Center>
        </Box>
        <Box as="div" w="100" textAlign="center">
          <Link to="/reset-password" style={{ textDecoration: "underline" }}>
            Forgot Password?
          </Link>
        </Box>
      </Box>
      <Box as="div" w="100" textAlign="center" mt="2">
        Need an account?{" "}
        <Link to="/signup" style={{ textDecoration: "underline" }}>
          Sign Up
        </Link>
      </Box>
    </CenterContainer>
  );
}
