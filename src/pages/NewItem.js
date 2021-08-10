import { categories } from "../utils/categoryData";
import cssHome from "../styles/Home.module.css";
import css from "../styles/NewPage.module.css"
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import dateParser from "../utils/dateParser";
import { Button } from "@material-ui/core";
import { strDateAdd } from "../utils/dateAdd";
import { strDateSubtract } from "../utils/dateSubtract";
import { NewItemContext } from "../contexts/NewItemContext";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import { UserDataContext } from "../utils/data";
import { strDateCompare } from "../utils/dateCompare";
import { v4 as uuidv4 } from 'uuid';
import Waiting from "../components/Waiting";

function NewPage() {

  const history = useHistory();
  const { userData } = useContext(UserDataContext);

  // save item / edit item
  const { addItem, editItem } = useContext(UserDataContext);

  // form context
  const {
    id, setId, name, setName, category, setCategory, comment, setComment,
    expireDate, setExpireDate, expireInDays, setExpireInDays,
    resetNewItem,
  } = useContext(NewItemContext);

  const [toggleTime, setToggleTime] = useState(false); // true: time picker; false: xxx days from now

  // submission: save or edit item
  const handleSubmit = () => {
    const newItem = {
      id: id,
      name: name,
      category: category,
      expireDate: expireDate,
      comment: comment,
    };

    // validation schema
    let error = [];
    if (name === "") {
      error.push("请输入名字");
    }
    if (category === "") {
      error.push("请选择种类");
    }
    if (strDateCompare(expireDate, dateParser(new Date())) == -1 ) {
      error.push("过期日期不能为过去的日期");
    }
    if (error.length != 0) {
      alert(error.join("\n"));  // error message
      return null;
    }

    // save to database
    if (id === "") {
      // save item
      addItem({
        ...newItem,
        id: uuidv4(),
      });
    } else {
      // edit item
      editItem(newItem);
    }

    // reset and redirect
    resetNewItem();
    history.push("./home");  // moved to addItm, editItem functions
  };

  // loading page
  if (!userData) {
    return <Waiting />
  }

  // DOM
  return (
    <div>
      <div className={cssHome.toolbar}>
        <div className={css.headerBackBtn} onClick={() => { history.push('./home') }} >
          <ArrowBackOutlinedIcon /> 返回
        </div>
      </div>

      <form className={css.form}>
        <div>
          <label htmlFor={css.name}>名称</label> <br />
          <input id={css.name} className={css.formInput}
            value={name} onChange={(e) => { setName(e.target.value) }}
          />
        </div>

        <div>
          <label htmlFor={css.category} >分类</label> <br />
          <select id={css.category}
            value={category} onChange={(e) => { setCategory(e.target.value) }}
          >
            <option value="">----- 请选择分类 -----</option>
            {categories.map(category =>
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            )}
          </select>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>保质期</label>
            <div id={css.toggleDiv}>
              <input id="toggle" type="checkbox"
                value={toggleTime} onChange={() => { setToggleTime(!toggleTime) }}
              />
              <label htmlFor="toggle" >选取日期</label>
            </div>
          </div>
          {toggleTime ?
            <input id={css.expireDate} type="date" value={expireDate}
              onChange={(e) => {
                setExpireDate(e.target.value);
                setExpireInDays(strDateSubtract(
                  e.target.value, dateParser(new Date())
                ));
              }}
            /> :
            <div style={{ textAlign: "center" }}>
              <input id={css.expireInDays} type="number"
                value={expireInDays} onChange={(e) => {
                  setExpireInDays(e.target.value);
                  setExpireDate(strDateAdd(
                    dateParser(new Date()), e.target.value
                  ))
                }}
              />
              <label htmlFor={css.expireInDays}> 天后过期</label>
            </div>
          }
        </div>

        <div>
          <label htmlFor={css.comment} >备注</label> <br />
          <textarea id={css.comment} rows={3}
            value={comment} onChange={(e) => { setComment(e.target.value) }}
          ></textarea>
        </div>

        <div className={css.formSubmit}>
          <Button style={{ fontSize: "1rem", color: "red" }}
            onClick={ resetNewItem }
          ><DeleteForeverIcon />清除</Button>
          <Button variant="contained" style={{
            fontSize: "1rem",
            color: "#F0F0F0", backgroundColor: "#B05B3B",
          }}
            onClick={handleSubmit}
          ><SaveIcon style={{marginRight: "0.15em"}} />保存</Button>
        </div>
      </form>
    </div>
  );
}

export default NewPage;