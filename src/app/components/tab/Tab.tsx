import Typography from "../typography/Typography";
import styles from "./tab.module.css";
interface TabProps {
  name: string;
  onClick: () => void;
  isSelected: boolean;
}
const Tab: React.FC<TabProps> = ({ name, onClick, isSelected }) => {
  const selected = isSelected ? styles.selected : "";
  return (
    <div className={[styles.container, selected].join(" ")} onClick={onClick}>
      <Typography
        align="center"
        color={selected ? "dark" : "light"}
        size="small"
      >
        {name}
      </Typography>
    </div>
  );
};

export default Tab;
