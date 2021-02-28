import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import CenterContainer from "../../util/CenterContainer";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <CenterContainer>
        <Box px="6" pt="8" borderWidth="2px" borderRadius="md">
          <Text as="h2" fontSize="2xl" align="center" mb="4">
            Profile
          </Text>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile">
            <Center>
              <Button
                colorScheme="cyan"
                variant="ghost"
                w="100"
                my="4"
                type="submit"
              >
                Update Profile
              </Button>
            </Center>
          </Link>
        </Box>
        <Box as="div" w="100" textAlign="center">
          <Center>
            <Button
              colorScheme="cyan"
              variant="ghost"
              mt="4"
              onClick={() => history.push('/')}
            >
              Home
            </Button>
            <Button
              colorScheme="cyan"
              variant="ghost"
              mt="4"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </Center>
        </Box>
      </CenterContainer>
    </>
  );
}
