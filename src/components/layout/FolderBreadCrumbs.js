import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../hooks/useFolder";

function FolderBreadCrumbs({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) {
    path = [...path, ...currentFolder.path];
  }

  return (
    <Breadcrumb
      fontWeight="medium"
      whiteSpace="nowrap"
      isTruncated={true}
      separator={<FontAwesomeIcon icon={faChevronRight} />}
      width="100%"
      px={["2", "6", "8"]}
      pt="4"
      fontSize="xl"
    >
      {path.map((folder, index) => {
        return (
          <BreadcrumbItem key={folder.id} maxW="175px" p="3px">
            <BreadcrumbLink
              as={Link}
              display="inline-block"
              isTruncated={true}
              color="rgb(0, 119, 255)"
              to={{
                pathname: folder.id ? `/folder/${folder.id}` : "/",
                state: { folder: { ...folder, path: path.slice(1, index) } },
              }}
            >
              {folder.name === "Root" ? "~" : folder.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
      {currentFolder && (
        <BreadcrumbItem p="3px" maxW="175px" isCurrentPage>
          <BreadcrumbLink display="inline-block" isTruncated={true}>
            {currentFolder.name === "Root" ? "~" : currentFolder.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
}

export default FolderBreadCrumbs;
