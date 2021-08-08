import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { ItemContext } from '../pages/Home.js';
import css from '../styles/Home.module.css';
import dateParser from '../utils/dateParser.js';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { categories } from "../utils/categoryData";
import { strDateSubtract } from "../utils/dateSubtract";
import CancelIcon from '@material-ui/icons/Cancel';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { NewItemContext } from '../contexts/NewItemContext.js';
import { strDateCompare } from '../utils/dateCompare.js';
import { UserDataContext } from '../utils/data.js';

const DialogContext = createContext();

function ItemTag({ item }) {

  const history = useHistory();

  // context
  const { focus, setFocus } = useContext(ItemContext);
  const handleClick = () => setFocus(item.id);

  // edit item
  const { setNewItem } = useContext(NewItemContext);

  // delete dialog
  const [open, setOpen] = useState(false);

  // delete function
  const { deleteItem } = useContext(UserDataContext);
  const handleDelete = () => {
    deleteItem(item);
    setOpen(false);   // close dialog
  };

  // attr
  const category = categories.find(category => category.id === item.category);
  const diff = strDateSubtract(item.expireDate, dateParser(new Date()));
  const isExpired = diff < 0;

  let clockColor;
  if (isExpired || diff <= 3) {
    clockColor = "#c23b0a"; // red
  } else if (diff <= 7) {
    clockColor = "#cf9911"; // orange
  } else {
    clockColor = "#2b9611"; // green
  }

  const borderColor = category.color;

  // module
  return (
    <DialogContext.Provider value={{ open, setOpen, handleDelete }} >
      <div className={css.itemTag} onClick={handleClick} style={{
        borderColor: borderColor, 
        boxShadow: isExpired ? "3px 3px 8px #c23b0a" : "3px 3px 8px #cfcfcf",
      }} >
        <div className={css.itemTagName}>
          {item.name}
        </div>
        <div className={css.itemTagTime} style={{color: isExpired? "red" : "inherit"}} >
          <ScheduleIcon style={{
            color: clockColor,
          }} />
          {isExpired ?
            "已经过期" :
            (diff <= 7 ?
              `${diff} 天后过期` :
              `${item.expireDate} 过期`)
          }
        </div>
        {item.id === focus && item.comment && item.comment !== "" &&
          <div className={css.itemTagComment}> {item.comment} </div>
        }
        {item.id === focus &&
          <div className={css.itemTagMore}>
            <InfoOutlinedIcon style={{ color: "#43a047" }}
              onClick={() => {
                setNewItem({
                  _id: item.id, _name: item.name, _category: item.category,
                  _expireDate: item.expireDate, _comment: item.comment,
                });
                history.push('./new-item');
              }} />
            <CancelIcon color="secondary" style={{ marginLeft: "5px" }}
              onClick={() => { setOpen(true) }} />
          </div>
        }
        <DeleteDialog />
      </div>
    </DialogContext.Provider>
  );
}

function DeleteDialog() {
  const { open, setOpen, handleDelete } = useContext(DialogContext);
  const handleClose = () => { setOpen(false) };

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>确认删除？</DialogTitle>
      <DialogContent>是否要删除这项物品？一旦确认，该物品将被永久删除。</DialogContent>
      <DialogActions>
        <div onClick={handleClose} className={css.dialogCancelBtn} >取消</div>
        <div onClick={handleDelete} className={css.dialogConfirmBtn} >确认</div>
      </DialogActions>
    </Dialog>
  )
}

ItemTag.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    expireDate: PropTypes.string,
    comment: PropTypes.string
  })
};

export default ItemTag;