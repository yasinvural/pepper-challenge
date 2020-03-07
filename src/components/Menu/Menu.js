import React, { useState } from "react";
import "./Menu.css";
import {
  Card,
  Popover,
  Button,
  Popconfirm,
  Input,
  InputNumber,
  Collapse,
  message
} from "antd";
import ModalCreater from "../ModalCreater/ModalCreater";
import { useInput } from "../../hooks/useInput";

const { Panel } = Collapse;

const Menu = ({ menu, index, handleRemoveMenu, handleEditMenu }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [value, setValue, updateValue] = useInput(null);

  const renderMoreButton = () => {
    const content = (
      <div className="content-container">
        <div>
          <Popconfirm
            title="Are you sure ?"
            onConfirm={() => handleRemoveMenu(index)}
            okText="Yes"
            cancelText="No"
          >
            <div className="danger">Delete</div>
          </Popconfirm>
        </div>
        <div onClick={handleEditClick}>
          <div>Edit</div>
        </div>
      </div>
    );

    return (
      <>
        <Popover content={content} placement="bottom">
          <Button>More</Button>
        </Popover>
      </>
    );
  };

  const handleEditClick = () => {
    setValue(menu);
    handleOpenEditModal();
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setValue(null);
  };

  const handleSubmitEditForm = e => {
    e.preventDefault();
    if (!value.name || !value.description) {
      message.error("name or description cannot be empty");
    } else {
      handleEditMenu(index, value);
      handleCloseEditModal();
    }
  };

  return (
    <>
      <Card className="menu" title={menu.name} extra={renderMoreButton()}>
        <p>{menu.description}</p>
        <div className="horizontal-line m-v-1" />
        <div className="card-nutrional-info">
          <div>Calories: {menu.nutritionalInformation.calories}</div>
          <div>Fat: {menu.nutritionalInformation.fat}</div>
          <div>SaturatedFat: {menu.nutritionalInformation.saturatedFat}</div>
          <div>Sugars: {menu.nutritionalInformation.sugars}</div>
          <div>Salt: {menu.nutritionalInformation.salt}</div>
        </div>
        <div className="horizontal-line m-v-1" />
        <div className="card-detail">
          <div className="quantity">Quantity: {menu.quantity}</div>
          <div className="price">Price: {menu.price} $</div>
        </div>
        <div className="horizontal-line m-v-1" />
      </Card>
      <ModalCreater
        title="Menu Update"
        visible={openEditModal}
        handleCancel={handleCloseEditModal}
      >
        <form onSubmit={handleSubmitEditForm}>
          <div className="form-input-container">
            <label>Name</label>
            <Input
              name="name"
              value={value && value.name}
              onChange={updateValue}
            />
          </div>
          <div className="form-input-container">
            <label>Description</label>
            <Input
              name="description"
              value={value && value.description}
              onChange={updateValue}
            />
          </div>
          <div className="form-input-container">
            <label>Price</label>
            <div>
              <InputNumber
                value={value && value.price}
                onChange={e => updateValue(e, "price")}
              />
            </div>
          </div>
          <div className="form-input-container">
            <label>Quantity</label>
            <div>
              <InputNumber
                value={value && value.quantity}
                onChange={e => updateValue(e, "quantity")}
              />
            </div>
          </div>
          <div className="form-input-container">
            <Collapse>
              <Panel header="Nutrional Information">
                <div>
                  <label>Calories</label>
                  <div>
                    <InputNumber
                      value={value && value.nutritionalInformation.calories}
                      onChange={e => updateValue(e, "calories")}
                    />
                  </div>
                </div>
                <div>
                  <label>Fat</label>
                  <div>
                    <InputNumber
                      value={value && value.nutritionalInformation.fat}
                      onChange={e => updateValue(e, "fat")}
                    />
                  </div>
                </div>
                <div>
                  <label>Saturated Fat</label>
                  <div>
                    <InputNumber
                      value={value && value.nutritionalInformation.saturatedFat}
                      onChange={e => updateValue(e, "saturatedFat")}
                    />
                  </div>
                </div>
                <div>
                  <label>Sugars</label>
                  <div>
                    <InputNumber
                      value={value && value.nutritionalInformation.sugars}
                      onChange={e => updateValue(e, "sugars")}
                    />
                  </div>
                </div>
                <div>
                  <label>Salt</label>
                  <div>
                    <InputNumber
                      value={value && value.nutritionalInformation.salt}
                      onChange={e => updateValue(e, "salt")}
                    />
                  </div>
                </div>
              </Panel>
            </Collapse>
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
      </ModalCreater>
    </>
  );
};

export default Menu;
