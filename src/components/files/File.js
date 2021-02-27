import React from "react";
import { Box, Button, Td, useToast } from "@chakra-ui/react";
import { faCopy, faDownload, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import prettyBytes from "pretty-bytes";
import { useClipboard } from "@chakra-ui/react";

function File({ file }) {
  const { onCopy } = useClipboard(file.url);
  const toast = useToast()

  const handleClick = () => {
    onCopy();
    toast({
      title: "Copied",
      description: "File URL copied to clipboard!",
      status: "success",
      duration: 3000,
      isClosable: true
    })
  }

  return (
    <Box as="tr">
      <Td fontWeight="medium" isTruncated>{file.name}</Td>
      <Td>{file && prettyBytes(file.size || 0)}</Td>
      <Td>
        <Button onClick={handleClick} variant="outline" colorScheme="cyan">
          <FontAwesomeIcon icon={faCopy} />
        </Button>
      </Td>
      <Td>
        <a href={file.url} target="_blank" rel="noreferrer">
          <Button variant="outline" colorScheme="cyan">
            <FontAwesomeIcon icon={faDownload} />
          </Button>
        </a>
      </Td>
      <Td>
        <Button variant="outline" colorScheme="cyan">
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </Td>
    </Box>
  );
}

export default File;
