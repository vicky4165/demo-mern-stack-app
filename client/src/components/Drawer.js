import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';

const MENUS = [
  {
    text: "Create Todo",
    link: "/create-todo",
    Icon: <AddIcon />
  }
];

export default function TemporaryDrawer({ drawerOpen, toggleDrawer, toggleFormDialog }) {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
      <List>
        {MENUS.map(({ text, link, Icon }, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => toggleFormDialog(true)}>
              <ListItemIcon>
                {Icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <Drawer open={drawerOpen} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}