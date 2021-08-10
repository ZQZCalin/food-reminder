import { createContext, useContext, useState } from "react";
import Header from "../components/Header";
import ItemTag from "../components/ItemTag";
import pinyin from "chinese-to-pinyin";
import { UserDataContext } from "../utils/data";
import { categories } from "../utils/categoryData";
import Toolbar from "../components/Toolbar";
import { strDateCompare } from "../utils/dateCompare";
import Waiting from "../components/Waiting";

export const ToolbarContext = createContext();
export const ItemContext = createContext();

function Home() {

  // data context
  const { userData } = useContext(UserDataContext);

  // item context
  const [focus, setFocus] = useState("");

  // toolbar context
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false); // true: sort by time; false: sort by category

  // clear focus upon state change

  // loading page
  if (!userData) {
    return <Waiting />;
  }

  // module
  return (
    <ToolbarContext.Provider value={{
      search, setSearch,
      sort, setSort,
    }}>
      <ItemContext.Provider value={{
        focus, setFocus,
      }}>
        <Toolbar />

        {sort ?
          <div>
            {
              userData.filter(item => item.name.includes(search)
                || pinyin(item.name, { removeTone: true, removeSpace: false }).includes(search))
                .sort((item1, item2) => strDateCompare(item1.expireDate, item2.expireDate))
                .map(item => <ItemTag item={item} key={item.id} />)
            }
          </div> :
          <div>
            {
              categories.map(category => (
                <div key={category.id}>
                  <Header category={category} />
                  {
                    userData.filter(item => item.category===category.id)
                      .filter(item => item.name.includes(search)
                      || pinyin(item.name, { removeTone: true, removeSpace: false }).includes(search))
                      .sort((item1, item2) => strDateCompare(item1.expireDate, item2.expireDate))
                      .map(item => <ItemTag item={item} key={item.id} />)
                  }
                </div>
              ))
            }
          </div>
        }
      </ItemContext.Provider>
    </ToolbarContext.Provider>
  );
}


export default Home;