import React from 'react'
import FolderContent from './FolderContent'


function FolderData(props) {
    return (
        <>
            {props.currentFileData.map((item, index)=>(
                <FolderContent
                    index={index}
                    key={index}
                    type={item.type}
                    name={item.name} />
            ))}
        </>
    )
}


export default FolderData