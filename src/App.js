import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";

const apiUrl = "http://frontend-challenge-api.pepperhq.com/menu.json";

const App = () => {
  const [locationId, setLocationId] = useState("");
  const [locationTitle, setLocationTitle] = useState("");
  const [address, setAddress] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      const { data } = await axios.get(apiUrl);
      const { locationId, locationTitle, address, items } = data;
      console.log(items);
      setLocationId(locationId);
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

  return (
    <div className="app">
      <Header
        locationTitle={locationTitle}
        address={address}
        handleEditHeader={handleEditHeader}
      />
      <div className="menu-list">
        {menuItems.map((menu, index) => (
          <Menu menu={menu} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default App;
