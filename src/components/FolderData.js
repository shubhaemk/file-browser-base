import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SetFileData } from '../store/actions/fileData'
import FolderContentList from './FolderContentList'
import styles from '../css/FolderContent.module.css'


function FolderData() {

    const dispatch = useDispatch()

    const currentFileData = useSelector(state=>state.fileData.currentFileData)

    useEffect(() => {
        dispatch(SetFileData())
    }, [dispatch])

    return (
        <div className={styles.div}>
            <FolderContentList currentFileData={currentFileData} />
        </div>
    )
}


export default FolderData