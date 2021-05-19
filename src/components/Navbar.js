import React from "react";
import { Layout } from "antd";
import { ArrowUpOutlined, FolderFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import styles from "../css/Navbar.module.css";
import LocationList from "./LocationList";
import { resetCurrentFileData } from "../store/actions/fileData";

function Navbar() {
  const { Header } = Layout;

  const { header, firstIcon, secondIcon, slash, location, underline } = styles;

  const fileLocation = useSelector((state) => state.fileData.fileLocation);

  const dispatch = useDispatch();

  const ResetCurrentFileData = () => {
    if (fileLocation.length !== 0) {
      dispatch(resetCurrentFileData());
    }
  };

  return (
    <Header className={header}>
      <ArrowUpOutlined className={firstIcon} />
      <FolderFilled className={secondIcon} />
      <h1 className={location} onClick={ResetCurrentFileData}>
        File Browser
      </h1>
      <div className={slash}>/</div>
      <h1
        className={`
                    ${location} ${fileLocation.length === 0 ? underline : ""}
                `}
        onClick={ResetCurrentFileData}
      >
        Peoplebox
      </h1>
      <LocationList fileLocation={fileLocation} />
    </Header>
  );
}

export default Navbar;
