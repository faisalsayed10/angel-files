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

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <CenterContainer>
      <Image
        fallbackSrc={angel_files}
        width="160px"
        margin="0 auto"
        mb="8"
        src={angel_files}
        alt="Angelfiles Logo"
      />
      <Box w="sm" h="100" px="6" pt="8" borderWidth="2px" borderRadius="md">
        <Text as="h2" fontSize="2xl" align="center" mb="8">
          👋 Sign Up
        </Text>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl my="3" id="email">
            <Input
              variant="flushed"
              placeholder="Enter your email"
              type="email"
              ref={emailRef}
              required
            />
          </FormControl>
          <FormControl mb="3" id="password">
            <Input
              variant="flushed"
              placeholder="Password"
              type="password"
              ref={passwordRef}
              required
            />
          </FormControl>
          <FormControl mb="3" id="password-confirm">
            <Input
              variant="flushed"
              placeholder="Confirm your password"
              type="password"
              ref={passwordConfirmRef}
              required
            />
          </FormControl>
          <Center>
            <Button
              colorScheme="cyan"
              variant="ghost"
              isLoading={loading}
              w="100"
              type="submit"
              my="4"
            >
              Sign Up
            </Button>
          </Center>
        </Box>
      </Box>
      <Box as="div" w="100" textAlign="center" mt="2">
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "underline" }}>
          Log In
        </Link>
      </Box>
    </CenterContainer>
  );
}
