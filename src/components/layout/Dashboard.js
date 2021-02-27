import {
  Box,
  Center,
  Progress,
  Text,
  Button,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
} from "@chakra-ui/react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFolder } from "../../hooks/useFolder";
import AddFileButton from "../Buttons/AddFileButton";
import AddFolderButton from "../Buttons/AddFolderButton";
import HomeButton from "../Buttons/HomeButton";
import ProfileButton from "../Buttons/ProfileButton";
import File from "../files/File";
import Folder from "../files/Folder";
import FolderBreadCrumbs from "../files/FolderBreadCrumbs";
import Navbar from "./Navbar";

function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isSmallerThan700] = useMediaQuery("(max-width: 700px)");

  return (
    <>
      <Navbar />
      <Box width="100%" px="8" py="4">
        {/* TOP BUTTONS */}
        {isSmallerThan700 ? (
          <Menu isLazy placement="bottom">
            <MenuButton
              variant="outline"
              colorScheme="cyan"
              width="100%"
              as={Button}
              rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              Menu
            </MenuButton>
            <MenuList w="inherit">
              <HomeButton variant="ghost" />
              <MenuDivider />
              <AddFileButton
                currentFolder={folder}
                uploadingFiles={uploadingFiles}
                setProgress={setProgress}
                progress={progress}
                variant="ghost"
                setUploadingFiles={setUploadingFiles}
                btnWidth="100%"
              />
              <MenuDivider />
              <AddFolderButton
                variant="ghost"
                btnWidth="100%"
                currentFolder={folder}
              />
              <MenuDivider />
              <ProfileButton variant="ghost" />
            </MenuList>
          </Menu>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            fontSize="xl"
            flexWrap="wrap"
          >
            <HomeButton variant="outline" />
            <AddFileButton
              currentFolder={folder}
              uploadingFiles={uploadingFiles}
              setProgress={setProgress}
              progress={progress}
              setUploadingFiles={setUploadingFiles}
              variant="outline"
            />
            <AddFolderButton currentFolder={folder} variant="outline" />
            <ProfileButton variant="outline" />
          </Box>
        )}

        {/* BREADCRUMBS */}

        <FolderBreadCrumbs currentFolder={folder} />

        {/* FILES AND FOLDERS */}

        <Box>
          {childFolders.length > 0 && (
            <Box as="div" display="flex" flexWrap="wrap">
              {childFolders.map((childFolder) => (
                <Box as="div" key={childFolder.id} w="200px" p="2">
                  <Folder folder={childFolder} />
                </Box>
              ))}
            </Box>
          )}
          {childFolders.length > 0 && childFiles.length > 0 && <hr />}
          {childFiles.length > 0 && (
            <Box as="div" display="flex" flexWrap="wrap">
              {childFiles.map((childFile) => (
                <Box as="div" key={childFile.id} w="200px" p="2">
                  <File file={childFile} />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* PROGRESS BAR */}

      {uploadingFiles.length > 0 && (
        <Center>
          <Box
            borderWidth="2px"
            borderRadius="md"
            px="4"
            py="8"
            pos="absolute"
            bottom="5%"
            width="80vw"
          >
            {uploadingFiles.map((file) => (
              <Box key={file.id}>
                <Text fontSize="md">
                  {file.error
                    ? "Upload Failed!"
                    : `Uploading ${file.name} (${progress}%)`}
                </Text>
                <Progress
                  isIndeterminate={!file.error}
                  colorScheme={file.error ? "red" : "blue"}
                  value={100}
                  height="5px"
                />
              </Box>
            ))}
          </Box>
        </Center>
      )}
    </>
  );
}

export default Dashboard;