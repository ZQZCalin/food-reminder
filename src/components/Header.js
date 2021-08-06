import css from "../styles/Home.module.css";

function Header ({category}) {

  return (
    <div className={css.header} style={{
      color: category.textColor,
      backgroundColor: category.color
    }}>
      {category.name}
    </div>
  );
}

export default Header;