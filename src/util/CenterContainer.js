import React from "react";
import { Box, Container } from "@chakra-ui/react";

function CenterContainer({ children }) {
  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <Box as="div" width="100" maxW="400px">
        {children}
      </Box>
    </Container>
  );
}

export default CenterContainer;
