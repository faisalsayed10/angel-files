import { Button } from "@chakra-ui/react";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Folder({ folder }) {
  return (
    <Link to={{ pathname: `/folder/${folder.id}`, state: { folder } }}>
      <Button
        variant="ghost"
        w="200px"
        display="block"
        isTruncated={true}
        leftIcon={<FontAwesomeIcon icon={faFolder} />}
      >
        {folder.name}
      </Button>
    </Link>
  );
}

export default Folder;
