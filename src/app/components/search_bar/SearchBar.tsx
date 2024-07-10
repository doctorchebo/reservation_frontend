import { useState } from "react";
import { CiSearch } from "react-icons/ci";

import { useAppDispatch } from "@/app/hooks/hooks";
import styles from "./searchBar.module.css";
const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    console.log("searched: " + search);
    //dispatch(searchServiceByName(search));
    setSearch("");
  };
  return (
    <div className={styles.ctn}>
      <input
        className={styles.searchInput}
        type="text"
        value={search}
        name="search"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Ej: Limpieza dental"
      />
      <div className={styles.btnCtn} onClick={handleSearch}>
        <CiSearch color={"rgb(96, 99, 143)"} size={30} />{" "}
      </div>
    </div>
  );
};

export default SearchBar;
