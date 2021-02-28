import React, { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Td,
  useToast,
} from "@chakra-ui/react";
import { faCopy, faDownload, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import prettyBytes from "pretty-bytes";
import { useClipboard } from "@chakra-ui/react";
import { database, storage } from "../../firebase";

function File({ file }) {
  const { onCopy } = useClipboard(file.url);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  const handleClick = () => {
    onCopy();
    toast({
      title: "Copied",
      description: "File URL copied to clipboard!",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const deleteFile = async () => {
    try {
      const fileRef = await storage.ref().child(file.filePath);
      await fileRef.delete();
      await database.files.doc(file.id).delete();
      toast({
        title: "Deleted",
        description: "File deleted successfully!",
        status: "info",
        duration: 1000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // function deleteFile() {
  //   const storageRef = storage.ref();

  //   var desertRef = storageRef.child("images/desert.jpg");
  //   desertRef
  //     .delete()
  //     .then(() => {
  //       // File deleted successfully
  //     })
  //     .catch((error) => {
  //       // Uh-oh, an error occurred!
  //     });
  // }

  return (
    <Box as="tr">
      <Td fontWeight="medium" isTruncated>
        {file.name}
      </Td>
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
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          colorScheme="cyan"
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => setIsOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete File
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={deleteFile} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Td>
    </Box>
  );
}

export default File;
