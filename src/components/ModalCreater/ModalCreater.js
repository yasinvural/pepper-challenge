import React from "react";
import { Modal } from "antd";

const ModalCreater = ({ title, visible, handleCancel, children }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      footer={null}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default ModalCreater;
