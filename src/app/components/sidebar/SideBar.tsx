"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setBusiness } from "@/app/store/business/businessSlice";
import { setIsDrawerOpen, setSelectedTab } from "@/app/store/ui/uiSlice";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "../typography/Typography";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const { businesses } = useAppSelector((state) => state.business);
  const { user } = useAppSelector((state) => state.user);
  const { member } = useAppSelector((state) => state.member);
  const { isDrawerOpen } = useAppSelector((state) => state.ui);

  const toggleDrawer = (newOpen: boolean) => () => {
    dispatch(setIsDrawerOpen(newOpen));
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Typography size="medium" color="dark">
        Mis negocios
      </Typography>
      <List>
        {businesses.map((business, index) => (
          <ListItem
            key={business.id}
            disablePadding
            onClick={() => {
              dispatch(setBusiness(business));
              dispatch(setSelectedTab("business"));
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary={business.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {member && (
        <List>
          <ListItem onClick={() => dispatch(setSelectedTab("member"))}>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${member.firstName} ${member.lastName}`}
              />
            </ListItemButton>
          </ListItem>
        </List>
      )}
      {user?.isSuperUser && (
        <List>
          <ListItem onClick={() => dispatch(setSelectedTab("admin"))}>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Configuraciones avanzadas" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <div>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {businesses && DrawerList}
      </Drawer>
    </div>
  );
};

export default SideBar;
