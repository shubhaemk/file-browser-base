import axios from 'axios'


export const SET_FILE_DATA = 'SET_FILE_DATA'

export const SET_FILE_LOCATION = 'SET_FILE_LOCATION'

export const SET_CURRENT_FILE_DATA = 'SET_CURRENT_FILE_DATA'

export const RESET_CURRENT_FILE_DATA = 'RESET_CURRENT_FILE_DATA'

export const ADD_FOLDER_TO_FILE_DATA = 'ADD_FOLDER_TO_FILE_DATA'

export const DELETE_FOLDER_FROM_FILE_DATA = 'DELETE_FOLDER_FROM_FILE_DATA'


export const setFileData = (fileData) => {
    return {
        type: SET_FILE_DATA,
        fileData
    }
}

export const setFileLocation = (fileLocation) => {
    return {
        type: SET_FILE_LOCATION,
        fileLocation
    }
}

export const setCurrentFileData = (currentFileData) => {
    return {
        type: SET_CURRENT_FILE_DATA,
        currentFileData
    }
}


export const resetCurrentFileData = () => {
    return {
        type: RESET_CURRENT_FILE_DATA
    }
}

export const addFolderToFileData = (name) => {
    return {
        type: ADD_FOLDER_TO_FILE_DATA,
        newFolder: {
            name,
            type: 'folder',
            children: [],
        }
    }
}

export const deleteFolderFromFileData = (index) => {
    return {
        type: DELETE_FOLDER_FROM_FILE_DATA,
        index,
    }
}

export const SetFileData = () => {
    return async dispatch => {
        try {
            const response = await axios.get('https://gist.githubusercontent.com/alagu/bfee7d87e0e03cd9bc33693af61281d9/raw/b100b548563ffcb1b554432c3ffdf855f1651547/folder-data.json', {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 30000,
            })
            if (response.data.length > 0){
                await dispatch(setFileData(response.data))
                await dispatch(setCurrentFileData(response.data))
                await dispatch(setFileLocation([]))
            }
        } catch (error) {
            console.log(error)
        }
    }
}   

export const filterFileData = (fileLocation, fileData) => {
    for (let location of fileLocation){
        for (let data of fileData){
            if (data.name === location){
                fileData = data.children
            }
        }
    }
    return fileData
}

export const updateFileData = (newFileLocation) => {
    return (dispatch, getState) => {
        let fileData = getState().fileData.fileData
        let newCurrentFileData = filterFileData(newFileLocation, fileData)
        dispatch(setFileLocation(newFileLocation))
        dispatch(setCurrentFileData(newCurrentFileData))
    }
}