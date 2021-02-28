import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Folder from "./Folder";

function FolderGrid({ childFolders }) {
  return (
    <SimpleGrid minChildWidth="140px" spacing="40px">
      {childFolders.map((childFolder) => (
        <Folder key={childFolder.id} folder={childFolder} />
      ))}
    </SimpleGrid>
  );
}

export default FolderGrid;
