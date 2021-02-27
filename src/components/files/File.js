import { Button } from "@chakra-ui/react";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function File({ file }) {
  return (
    <a href={file.url} target="_blank" rel="noreferrer">
      <Button
        variant="ghost"
        w="200px"
        display="block"
        isTruncated={true}
        leftIcon={<FontAwesomeIcon icon={faFile} />}
      >
        {file.name}
      </Button>
    </a>
  );
}

export default File;
