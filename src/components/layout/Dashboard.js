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
  Skeleton,
  Link,
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
import FilesEmptyState from "../files/FilesEmptyState";
import FolderBreadCrumbs from "./FolderBreadCrumbs";
import FilesTable from "../files/FilesTable";
import Navbar from "./Navbar";
import FilesTableSkeleton from "../files/FilesTableSkeleton";
import FolderGrid from "../folders/FolderGrid";

function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles, loading, foldersLoading } =
    useFolder(folderId, state.folder);
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
        <hr style={{ marginBottom: "2rem" }} />

        <Box>
          {/* FOLDERS */}

          {foldersLoading && (
            <>
              <Skeleton h="140px" w="100%" />
              <hr style={{ marginTop: "2rem", marginBottom: "2rem" }} />
            </>
          )}

          {childFolders.length > 0 && (
            <>
              <FolderGrid childFolders={childFolders} />
              <hr style={{ marginTop: "2rem", marginBottom: "2rem" }} />
            </>
          )}

          {/* FILES */}

          {loading && (
            <>
              <Text fontSize="3xl" fontWeight="600" mb={4}>
                Your Files
              </Text>
              <FilesTableSkeleton />
            </>
          )}
          {!loading && childFiles.length === 0 && (
            <>
              <Text fontSize="3xl" fontWeight="600" mb={4}>
                Your Files
              </Text>
              <FilesEmptyState />
            </>
          )}
          {childFiles.length > 0 && (
            <>
              <Text fontSize="3xl" fontWeight="600" mb={4}>
                Your Files
              </Text>
              <FilesTable childFiles={childFiles} />
            </>
          )}
        </Box>
        <Text align="center" mt="4">
          Made with ♥ by Faisal |{" "}
          <Link
            href="https://github.com/faisalsayed10/angel-files"
            textDecor="underline"
            target="_blank"
          >
            Open Source
          </Link>
        </Text>
      </Box>

      {/* PROGRESS BAR */}

      {uploadingFiles.length > 0 && (
        <Center>
          <Box
            borderWidth="2px"
            borderRadius="md"
            px="4"
            pos="absolute"
            bgColor="#3182ce"
            bottom="5%"
            width="80vw"
          >
            {uploadingFiles.map((file) => (
              <Box key={file.id} my="4">
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
