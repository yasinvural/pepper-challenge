import React, { useState, useEffect } from "react";
import "./Header.css";
import { PageHeader, Button, Modal, Input, Popconfirm } from "antd";

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
      alert("cannot be null or empty");
    } else {
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
      <Modal
        title="Title & Address Update"
        visible={openEditModal}
        footer={null}
        onCancel={handleCloseEditModal}
      >
        <form onSubmit={handleSubmitEditForm}>
          <div>
            <label>Title</label>
            <Input value={copyTitle} onChange={handleChangeCopyTitle} />
          </div>
          <div>
            <label>Address</label>
            <Input value={copyAddress} onChange={handleChangeCopyAddress} />
          </div>
          <div className="modal-footer">
            <div>
              <Popconfirm
                title="Are you sure ?"
                onConfirm={handleCloseEditModal}
                okText="Yes"
                cancelText="No"
              >
                <Button>Dismiss</Button>
              </Popconfirm>
            </div>
            <div className="submit-button">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Header;
