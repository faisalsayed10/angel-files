import { Box, Table, Th, Tr } from "@chakra-ui/react";
import React from "react";
import File from "./File";

function FilesTable({ childFiles }) {
  return (
    <Box borderWidth="3px" borderRadius="xl" overflowX="auto">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Size</Th>
            <Th>Share</Th>
            <Th>Download</Th>
            <Th>Delete</Th>
          </Tr>
        </thead>
        <tbody>
          {childFiles.length > 0 &&
            childFiles.map((childFile) => (
              <File key={childFile.id} file={childFile} />
            ))}
        </tbody>
      </Table>
    </Box>
  );
}

export default FilesTable;
