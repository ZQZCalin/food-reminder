import css from "../styles/Home.module.css";
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { useContext } from "react";
import { ToolbarContext } from "../pages/Home";
import { useHistory } from "react-router-dom";

function Toolbar() {

  // context
  const history = useHistory();
  const { search, setSearch, sort, setSort } = useContext(ToolbarContext);

  // events
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={css.toolbar}>
      <input placeholder={"搜索"} value={search} onChange={handleSearchChange} />

      <div className={css.toolbarToggle}>
        <input type="checkbox" id={css.toolbarCheckbox} value={sort} onChange={() => { setSort(!sort) }} />
        <label htmlFor={css.toolbarCheckbox} >紧凑模式</label>
      </div>

      <div onClick={() => { history.push('./new-item') }} style={{
        display: "flex", alignItems: "center", fontSize: "0.9em", position: "absolute", right: "12px"
      }}>
        <AddBoxOutlinedIcon style={{ marginRight: "3px" }} /> 添加项目
      </div>
    </div>
  );
};

export default Toolbar;