import { createContext, useState } from "react";
import dateParser from "../utils/dateParser";
import { strDateSubtract } from "../utils/dateSubtract";

export const NewItemContext = createContext();

function NewItemContextProvider(props) {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [expireDate, setExpireDate] = useState(dateParser(new Date()));
  const [expireInDays, setExpireInDays] = useState(0);

  const setNewItem = ({_id, _name, _category, _expireDate, _comment}) => {
    setId(_id); setName(_name); setCategory(_category); setComment(_comment);
    setExpireDate(_expireDate); 
    setExpireInDays( strDateSubtract(_expireDate, dateParser(new Date())) );
  }

  const resetNewItem = () => {
    setNewItem({
      _id: "", _name: "", _category: "", _expireDate: dateParser(new Date()), _comment: "",
    });
  };

  return (
    <NewItemContext.Provider value={{
      id, setId,
      name, setName, 
      category, setCategory, 
      comment, setComment,
      expireDate, setExpireDate, 
      expireInDays, setExpireInDays,
      setNewItem, resetNewItem,
    }}>
      {props.children}
    </NewItemContext.Provider>
  );
}

export default NewItemContextProvider;