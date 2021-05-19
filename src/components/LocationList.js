import React from "react";
import { useDispatch } from "react-redux";

import styles from "../css/Navbar.module.css";
import { updateFileData } from "../store/actions/fileData";

function LocationList(props) {
  const { fileLocation } = props;
  const { location, underline, slash } = styles;

  const dispatch = useDispatch();

  const UpdateFileData = (index) => {
    if (fileLocation.length - 1 !== index) {
      let newFileLocation = fileLocation.slice(0, index + 1);
      dispatch(updateFileData(newFileLocation));
    }
  };

  return (
    <>
      {fileLocation.map((item, index) => (
        <React.Fragment key={index}>
          <div className={slash}>/</div>
          <h1
            onClick={() => UpdateFileData(index)}
            className={`
                            ${location} ${
              fileLocation.length === index + 1 ? underline : ""
            }
                        `}
          >
            {item}
          </h1>
        </React.Fragment>
      ))}
    </>
  );
}

export default LocationList;
