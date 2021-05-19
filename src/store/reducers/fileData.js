import {
  SET_CURRENT_FILE_DATA,
  RESET_CURRENT_FILE_DATA,
  SET_FILE_DATA,
  SET_FILE_LOCATION,
  ADD_FOLDER_TO_FILE_DATA,
  DELETE_FOLDER_FROM_FILE_DATA,
} from "../actions/fileData";

const initialState = {
  fileData: [],
  currentFileData: [],
  fileLocation: [],
};

export const fileDataReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case SET_FILE_DATA:
      return {
        ...state,
        fileData: action.fileData,
      };
    case SET_FILE_LOCATION:
      return {
        ...state,
        fileLocation: action.fileLocation,
      };
    case SET_CURRENT_FILE_DATA:
      return {
        ...state,
        currentFileData: action.currentFileData,
      };
    case RESET_CURRENT_FILE_DATA:
      return {
        ...state,
        fileLocation: [],
        currentFileData: state.fileData,
      };
    case ADD_FOLDER_TO_FILE_DATA:
      let newFileLocation = state.fileLocation;
      let newFileData = [...state.fileData];
      let newCurrentFileData = newFileData;
      let newParent = null;
      for (let location of newFileLocation) {
        for (let data of newCurrentFileData) {
          if (data.name === location) {
            newParent = data;
            newCurrentFileData = data.children;
            break;
          }
        }
      }
      newCurrentFileData.push(action.newFolder);
      newCurrentFileData = [...newCurrentFileData];
      if (newParent) {
        newParent.children = [...newCurrentFileData];
      } else {
        newFileData = newCurrentFileData;
      }
      return {
        ...state,
        currentFileData: newCurrentFileData,
        fileData: newFileData,
      };
    case DELETE_FOLDER_FROM_FILE_DATA:
      let deletedFileLocation = state.fileLocation;
      let deletedFileData = [...state.fileData];
      let deletedCurrentFileData = deletedFileData;
      let parent = null;
      for (let location of deletedFileLocation) {
        for (let data of deletedCurrentFileData) {
          if (data.name === location) {
            parent = data;
            deletedCurrentFileData = data.children;
            break;
          }
        }
      }
      deletedCurrentFileData = deletedCurrentFileData.filter(
        (item, index) => index !== action.index
      );
      if (parent) {
        parent.children = [...deletedCurrentFileData];
      } else {
        deletedFileData = deletedCurrentFileData;
      }
      return {
        ...state,
        currentFileData: deletedCurrentFileData,
        fileData: deletedFileData,
      };
    default:
      return state;
  }
};
