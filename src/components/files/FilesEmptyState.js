import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const FilesEmptyState = () => (
  <Flex
    width="100%"
    p={16}
    borderWidth="3px"
    borderRadius="xl"
    justify="center"
    direction="column"
    align="center"
  >
    <Text fontSize="2xl" mb={6}>
      There aren't any files
    </Text>
    <Text mb={6}>Start Uploading Files!</Text>
  </Flex>
);

export default FilesEmptyState;
