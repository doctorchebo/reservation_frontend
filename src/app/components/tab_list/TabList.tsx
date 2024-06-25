import React, { useEffect, useState } from "react";
import Tab from "../tab/Tab";
import styles from "./tabList.module.css";
interface Page {
  name: string;
  component: React.ReactNode;
}

interface TabListProps {
  pages: Page[];
  initialPage: string;
}
const TabList: React.FC<TabListProps> = ({ initialPage, pages }) => {
  const [selected, setSelected] = useState(initialPage);
  useEffect(() => {
    if (initialPage) {
      setSelected(initialPage);
    }
  }, [initialPage]);

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        {pages.map((page, index) => {
          return (
            <Tab
              key={index}
              name={page.name}
              onClick={() => setSelected(page.name)}
              isSelected={selected === page.name}
            />
          );
        })}
      </div>
      {pages.map((page, index) => {
        if (page.name === selected) {
          return <React.Fragment key={index}>{page.component}</React.Fragment>;
        }
      })}
    </div>
  );
};

export default TabList;
