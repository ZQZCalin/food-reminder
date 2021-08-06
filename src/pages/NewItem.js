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

function NewPage() {

  const history = useHistory();

  // form context
  const {
    name, setName, category, setCategory, comment, setComment,
    expireDate, setExpireDate, expireInDays, setExpireInDays,
    resetNewItem,
  } = useContext(NewItemContext);

  const [toggleTime, setToggleTime] = useState(false); // true: time picker; false: xxx days from now

  // submission
  const handleSubmit = () => {
    console.log(
      name, category, expireDate, comment,
    );
  };

  // DOM
  return (
    <div>
      <div className={cssHome.toolbar}>
        <div className={css.headerBackBtn} onClick={() => { history.goBack() }} >
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
                  dateParser(new Date()), e.target.value
                ))
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

        {/* <div> For test purpose:
          {strDateAdd("2021-08-04", 2)} <br/>
          {strDateSubtract(dateParser(new Date()), "2021-08-06")}
        </div> */}

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