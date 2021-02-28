import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import folderIcon from "../../images/icons8-folder-512.png";

function Folder({ folder }) {
  return (
    <Link to={{ pathname: `/folder/${folder.id}`, state: { folder } }}>
      <Box
        display="block"
        borderRadius="md"
        borderWidth="2px"
        className="hoverAnim"
        transition="ease-in-out 0.1s"
      >
        <Image
          width="70px"
          fallbackSrc={folderIcon}
          margin="0 auto"
          src={folderIcon}
          alt={folder.name}
        />
        <Text isTruncated={true} as="h2" fontSize="xl" align="center" px="2">
          {folder.name}
        </Text>
      </Box>
    </Link>
  );
}

export default Folder;
