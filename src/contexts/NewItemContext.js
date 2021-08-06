import { createContext, useState } from "react";
import dateParser from "../utils/dateParser";
import { strDateSubtract } from "../utils/dateSubtract";

export const NewItemContext = createContext();

function NewItemContextProvider(props) {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [expireDate, setExpireDate] = useState(dateParser(new Date()));
  const [expireInDays, setExpireInDays] = useState(0);

  const setNewItem = (_name, _category, _expireDate, _comment) => {
    setName(_name); setCategory(_category); setComment(_comment);
    setExpireDate(_expireDate); 
    setExpireInDays( strDateSubtract(dateParser(new Date()), _expireDate) );
  }

  const resetNewItem = () => {
    setNewItem("", "", dateParser(new Date()), "");
  };

  return (
    <NewItemContext.Provider value={{
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