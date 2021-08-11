import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
// import { db } from "../contexts/AuthContext";

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

  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const { history } = useHistory();

  // add new item
  const addItem = (_item) => {
    db.collection('users')
      .where('userId', '==', currentUser)
      .get()
      .then(snapshot => {
        snapshot.docs[0].ref.collection('items')
          .add(_item)
          .then(() => {
            console.log("successfully ADD new item");
            setUserData(userData.concat([_item]));
          });
      });
  };

  // delete existing item
  const deleteItem = (_item) => {
    // get user
    db.collection('users')
      .where('userId', '==', currentUser)
      .get()
      .then(snapshot => {
        // get item
        snapshot.docs[0].ref.collection('items')
          .where('id', '==', _item.id)
          .get()
          .then(snapshot => {
            // delete item
            snapshot.docs[0].ref
              .delete()
              .then(() => {
                console.log("successfully DELETE new item");
                setUserData(userData.filter(item => item.id !== _item.id));
              });
          });
      });
  };

  // edit existing item
  const editItem = (_item) => {
    // get user
    db.collection('users')
      .where('userId', '==', currentUser)
      .get()
      .then(snapshot => {
        // get item
        snapshot.docs[0].ref.collection('items')
          .where('id', '==', _item.id)
          .get()
          .then(snapshot => {
            // update item
            snapshot.docs[0].ref
              .update({ ..._item })
              .then(() => {
                console.log("successfully EDIT new item");
                setUserData(userData.map(item => item.id !== _item.id ? item : _item));
              });
          });
      });
  };

  return (
    <UserDataContext.Provider value={{
      currentUser, setCurrentUser,
      userData, setUserData,
      addItem, deleteItem, editItem,
    }} >
      {props.children}
    </UserDataContext.Provider>
  );
}

export default UserDataContextProvider;