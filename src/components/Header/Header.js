import React, { useState, useEffect } from "react";
import "./Header.css";
import { PageHeader, Button, Input, Popconfirm, message } from "antd";
import ModalCreater from "../ModalCreater/ModalCreater";

const Header = ({ locationTitle, address, handleEditHeader }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [copyTitle, setCopyTitle] = useState("");
  const [copyAddress, setCopyAddress] = useState("");

  useEffect(() => {
    setCopyTitle(locationTitle);
    setCopyAddress(address);
  }, [locationTitle, address]);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCopyTitle(locationTitle);
    setCopyAddress(address);
  };

  const renderEditButton = () => {
    return (
      <Button type="link" onClick={handleOpenEditModal}>
        Edit
      </Button>
    );
  };

  const handleSubmitEditForm = e => {
    e.preventDefault();
    if (!copyTitle || !copyAddress) {
      message.error("title or address cannot be empty");
    } else {
      message.success("updated");
      handleEditHeader(copyTitle, copyAddress);
      handleCloseEditModal();
    }
  };

  const handleChangeCopyTitle = e => {
    const copyTitle = e.target.value;
    setCopyTitle(copyTitle);
  };

  const handleChangeCopyAddress = e => {
    const copyAddress = e.target.value;
    setCopyAddress(copyAddress);
  };

  return (
    <>
      <div className="title-container">
        <PageHeader
          className="header-container"
          title={locationTitle}
          subTitle={address}
          extra={renderEditButton()}
        />
      </div>
      <ModalCreater
        title="Title & Address Update"
        visible={openEditModal}
        handleCancel={handleCloseEditModal}
      >
        <form onSubmit={handleSubmitEditForm}>
          <div className="form-input-container">
            <label>Title</label>
            <Input value={copyTitle} onChange={handleChangeCopyTitle} />
          </div>
          <div className="form-input-container">
            <label>Address</label>
            <Input value={copyAddress} onChange={handleChangeCopyAddress} />
          </div>
          <div className="modal-footer">
            <Popconfirm
              title="Are you sure ?"
              onConfirm={handleCloseEditModal}
              okText="Yes"
              cancelText="No"
            >
              <Button>Dismiss</Button>
            </Popconfirm>
            <div className="submit-button">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </ModalCreater>
    </>
  );
};

export default Header;
