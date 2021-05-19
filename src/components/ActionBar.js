import React, { useState } from "react";
import { Menu, Input, Modal } from "antd";
import {
  FolderAddFilled,
  SearchOutlined,
  UnorderedListOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import styles from "../css/ActionBar.module.css";
import { addFolderToFileData } from "../store/actions/fileData";
import { setFolderArrangement } from "../store/actions/itemArrangement";

function ActionBar() {
  const { rightAlign } = styles;
  const [showModal, setShowModal] = useState(false);
  const [folderInput, setFolderInput] = useState("");

  const folderArrangement = useSelector(
    (state) => state.itemArrangement.folderArrangement
  );

  const dispatch = useDispatch();

  const internalStyles = {
    menuItem: {
      borderBottomStyle: "none",
      color: "black",
    },
    downIcon: {
      fontSize: 8,
    },
  };

  const openModal = () => {
    setShowModal(true);
  };

  const addNewFolder = () => {
    if (folderInput.length > 0) {
      dispatch(addFolderToFileData(folderInput));
    }
    setFolderInput("");
    setShowModal(false);
  };

  const cancelCreateFolder = () => {
    setFolderInput("");
    setShowModal(false);
  };

  return (
    <Menu mode="horizontal">
      <Modal
        title="Enter Name"
        centered
        visible={showModal}
        okText="Create Folder"
        onOk={addNewFolder}
        onCancel={cancelCreateFolder}
      >
        <Input
          allowClear
          value={folderInput}
          onPressEnter={addNewFolder}
          onChange={(event) => setFolderInput(event.target.value)}
          placeholder="New Folder"
        />
      </Modal>
      <Menu.Item key="search" style={internalStyles.menuItem}>
        <Input allowClear placeholder="Search" prefix={<SearchOutlined />} />
      </Menu.Item>
      <Menu.Item
        key="tableOutlined"
        className={rightAlign}
        onClick={() => dispatch(setFolderArrangement("grid"))}
        style={{
          ...internalStyles.menuItem,
          color: folderArrangement === "grid" ? "#1890ff" : "black",
        }}
      >
        <TableOutlined />
      </Menu.Item>
      <Menu.Item
        key="unorderedListOutlined"
        className={rightAlign}
        onClick={() => dispatch(setFolderArrangement("list"))}
        style={{
          ...internalStyles.menuItem,
          color: folderArrangement === "list" ? "#1890ff" : "black",
        }}
      >
        <UnorderedListOutlined />
      </Menu.Item>
      <Menu.Item
        onClick={openModal}
        style={internalStyles.menuItem}
        key="createFolder"
        icon={<FolderAddFilled />}
        className={rightAlign}
      >
        Create Folder
      </Menu.Item>
    </Menu>
  );
}

export default ActionBar;
