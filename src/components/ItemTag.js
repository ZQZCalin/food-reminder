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
  const deleteItem = () => {
    console.log("deleted");
    setOpen(false);
  };

  // attr
  const category = categories.find(category => category.id === item.category);
  const diff = strDateSubtract(dateParser(new Date()), item.expireDate);

  let clockColor;
  if (diff <= 3) {
    clockColor = "#c23b0a"; // red
  } else if (diff <= 7) {
    clockColor = "#cf9911"; // orange
  } else {
    clockColor = "#2b9611"; // green
  }

  const borderColor = category.color;

  // module
  return (
    <DialogContext.Provider value={{ open, setOpen, deleteItem }} >
      <div className={css.itemTag} onClick={handleClick} style={{
        borderColor: borderColor
      }} >
        <div className={css.itemTagName}>
          {item.name}
        </div>
        <div className={css.itemTagTime}>
          <ScheduleIcon style={{
            color: clockColor,
          }} />
          {diff <= 7 ?
            `${strDateSubtract(dateParser(new Date()), item.expireDate)} 天后过期` :
            `${item.expireDate} 过期`
          }
        </div>
        {item.id === focus && item.comment && item.comment !== "" &&
          <div className={css.itemTagComment}> {item.comment} </div>
        }
        {item.id === focus &&
          <div className={css.itemTagMore}>
            <InfoOutlinedIcon style={{ color: "#43a047" }}
              onClick={() => {
                setNewItem(item.name, item.category, item.expireDate, item.comment);
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
  const { open, setOpen, deleteItem } = useContext(DialogContext);
  const handleClose = () => { setOpen(false) };

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>确认删除？</DialogTitle>
      <DialogContent>是否要删除这项物品？一旦确认，该物品将被永久删除。</DialogContent>
      <DialogActions>
        <div onClick={handleClose} className={css.dialogCancelBtn} >取消</div>
        <div onClick={deleteItem} className={css.dialogConfirmBtn} >确认</div>
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