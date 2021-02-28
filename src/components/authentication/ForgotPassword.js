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
  Input,
  Text,
} from "@chakra-ui/react";
import CenterContainer from "../../util/CenterContainer";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox! :)");
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <CenterContainer>
      <Box w="sm" h="20rem" px="8" py="8" borderWidth="2px" borderRadius="md">
        <Text as="h2" fontSize="2xl" align="center" mb="12">
          Password Reset
        </Text>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {message && (
          <Alert status="success">
            <AlertIcon />
            {message}
          </Alert>
        )}
        <Box as="form" onSubmit={handleSubmit} my="3">
          <FormControl id="email">
            <Input
              variant="flushed"
              placeholder="Enter your email"
              type="email"
              ref={emailRef}
              required
            />
          </FormControl>
          <Center>
            <Button
              colorScheme="cyan"
              variant="ghost"
              isLoading={loading}
              w="100"
              mt="4"
              type="submit"
            >
              Reset Password
            </Button>
          </Center>
        </Box>
      </Box>
      <Box as="div" w="100" textAlign="center" mt="2">
        Need an account?{" "}
        <Link style={{ textDecoration: "underline" }} to="/signup">
          Sign Up
        </Link>
      </Box>
    </CenterContainer>
  );
}
