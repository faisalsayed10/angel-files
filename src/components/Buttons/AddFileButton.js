import React, { useRef } from "react";
import { Button, Input, useToast } from "@chakra-ui/react";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../contexts/AuthContext";
import { database, storage } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { v4 as uuidV4 } from "uuid";

function AddFileButton({
  currentFolder,
  setUploadingFiles,
  setProgress,
  progress,
  btnWidth,
  variant,
}) {
  const fileInput = useRef();
  const { currentUser } = useAuth();
  const toast = useToast();
  const id = uuidV4();

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (currentFolder == null || file == null) return;

    if (file.size > 100000000) {
      toast({
        title: "Upload Error",
        description: "Sorry, max file size upload limit is 100mb.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const nameArr = currentFolder.path.map((elem) => elem.name);

    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress, error: false },
    ]);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${nameArr.join("/")}/${file.name}`
        : `${nameArr.join("/")}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress };
            }

            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            }
            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadFile) => {
            return uploadFile.id !== id;
          });
        });

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where("name", "==", file.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getCurrentTimestamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                  size: file.size,
                  filePath: `/files/${currentUser.uid}/${filePath}`,
                });
              }
            });
        });
        toast({
          title: "Success",
          description: "File uploaded successfully!",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      }
    );
  };

  return (
    <>
      <Input
        type="file"
        ref={fileInput}
        hidden="hidden"
        onChange={handleUpload}
        key={id}
      />
      <Button
        leftIcon={<FontAwesomeIcon icon={faFileUpload} />}
        onClick={() => fileInput.current.click()}
        variant={variant}
        colorScheme="cyan"
        width={btnWidth}
      >
        Upload A File
      </Button>
    </>
  );
}

export default AddFileButton;
