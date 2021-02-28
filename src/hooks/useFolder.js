import { useEffect, useReducer } from "react";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
  SET_LOADING: "set-loading",
  STOP_LOADING: "stop-loading",
  FOLDERS_LOADING: "folders-loading",
  STOP_FOLDERS_LOADING: "stop-folders-loading",
};

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: action.payload.folderId,
        folder: action.payload.folder,
        childFiles: [],
        childFolders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: action.payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: action.payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: action.payload.childFiles,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case ACTIONS.FOLDERS_LOADING:
      console.log("loading");
      return {
        ...state,
        foldersLoading: true,
      };
    case ACTIONS.STOP_FOLDERS_LOADING:
      console.log("stopped loading");
      return {
        ...state,
        foldersLoading: false,
      };
    default:
      return state;
  }
};

export function useFolder(folderId = null, folder = null) {
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
    loading: false,
    foldersLoading: false,
  });

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folder, folderId]);

  useEffect(() => {
    if (folderId === null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }
    dispatch({ type: ACTIONS.FOLDERS_LOADING });
    database.folders
      .doc(folderId)
      .get()
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        });
        dispatch({ type: ACTIONS.STOP_FOLDERS_LOADING });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
        dispatch({ type: ACTIONS.STOP_FOLDERS_LOADING });
      });
  }, [folderId]);

  useEffect(() => {
    dispatch({ type: ACTIONS.FOLDERS_LOADING });
    return database.folders
      .where("parentId", "==", folderId)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: { childFolders: snapshot.docs.map(database.formatDoc) },
        });
        dispatch({ type: ACTIONS.STOP_FOLDERS_LOADING });
      });
  }, [folderId, currentUser]);

  // files
  useEffect(() => {
    dispatch({ type: ACTIONS.SET_LOADING });
    return database.files
      .where("folderId", "==", folderId)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: { childFiles: snapshot.docs.map(database.formatDoc) },
        });
        dispatch({ type: ACTIONS.STOP_LOADING });
      });
  }, [folderId, currentUser]);

  return state;
}
