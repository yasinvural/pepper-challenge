import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import { message } from "antd";

const apiUrl = "http://frontend-challenge-api.pepperhq.com/menu.json";

const App = () => {
  const [locationTitle, setLocationTitle] = useState("");
  const [address, setAddress] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      const { data } = await axios.get(apiUrl);
      const { locationTitle, address, items } = data;
      setLocationTitle(locationTitle);
      setAddress(address);
      setMenuItems(items);
    }
    fetchMenu();
  }, []);

  const handleEditHeader = (title, address) => {
    setLocationTitle(title);
    setAddress(address);
  };

  const handleRemoveMenu = index => {
    setMenuItems(items => items.filter((item, i) => i !== index));
    message.success("menu deleted");
  };

  const handleEditMenu = (index, menu) => {
    const updatedMenuItems = menuItems.map((item, i) => {
      if (i === index) {
        item = menu;
      }
      return item;
    });

    setMenuItems(updatedMenuItems);
    message.success("menu updated");
  };

  return (
    <div className="app">
      <Header
        locationTitle={locationTitle}
        address={address}
        handleEditHeader={handleEditHeader}
      />
      <div className="menu-list">
        {menuItems.map((menu, index) => (
          <Menu
            menu={menu}
            key={index}
            index={index}
            handleRemoveMenu={handleRemoveMenu}
            handleEditMenu={handleEditMenu}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
