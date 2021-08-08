import { createContext, useState } from "react";

export const data = [
  {
    id: "item-001",
    name: "猪肉",
    category: "meat",
    expireDate: "2021-08-19",
    comment: "冰箱冷冻室",
  },
  {
    id: "item-002",
    name: "鸡翅",
    category: "meat",
    expireDate: "2021-08-06",
    comment: "今早吃掉",
  },
  {
    id: "item-003",
    name: "西兰花",
    category: "vegetables",
    expireDate: "2021-08-10",
    comment: "冷藏第三层",
  }
];

export const UserDataContext = createContext();

function UserDataContextProvider(props) {

  const [userData, setUserData] = useState(data);

  // add new item
  const addItem = (_item) => {
    setUserData(userData.concat([_item]));
  };

  // delete existing item
  const deleteItem = (_item) => {
    setUserData(userData.filter(item => item.id !== _item.id));
  };

  // edit existing item
  const editItem = (_item) => {
    setUserData(userData.map(item => item.id !== _item.id ? item : _item ));
  };

  return (
    <UserDataContext.Provider value={{
      userData, addItem, deleteItem, editItem,
    }} >
      {props.children}
    </UserDataContext.Provider>
  );
}

export default UserDataContextProvider;