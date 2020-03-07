import { useState } from "react";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const updateValue = (e, label) => {
    let value;
    if (e.target) {
      value = e.target.value;
    } else {
      value = e;
    }
    const name = label || e.target.name;
    switch (name) {
      case "name":
        setValue(menu => ({
          ...menu,
          name: value
        }));
        break;
      case "description":
        setValue(menu => ({
          ...menu,
          description: value
        }));
        break;
      case "price":
        setValue(menu => ({
          ...menu,
          price: value
        }));
      case "quantity":
        setValue(menu => ({
          ...menu,
          quantity: value
        }));
      case "calories":
        setValue(menu => ({
          ...menu,
          nutritionalInformation: {
            ...menu.nutritionalInformation,
            calories: value
          }
        }));
        break;
      case "fat":
        setValue(menu => ({
          ...menu,
          nutritionalInformation: {
            ...menu.nutritionalInformation,
            fat: value
          }
        }));
        break;
      case "saturatedFat":
        setValue(menu => ({
          ...menu,
          nutritionalInformation: {
            ...menu.nutritionalInformation,
            saturatedFat: value
          }
        }));
        break;
      case "sugars":
        setValue(menu => ({
          ...menu,
          nutritionalInformation: {
            ...menu.nutritionalInformation,
            sugars: value
          }
        }));
        break;
      case "salt":
        setValue(menu => ({
          ...menu,
          nutritionalInformation: {
            ...menu.nutritionalInformation,
            salt: value
          }
        }));
        break;
      default:
        return;
    }
  };

  return [value, setValue, updateValue];
};
