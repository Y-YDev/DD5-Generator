import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ESize } from '../../styles/size.enum';

export default function SideMenu() {
  const navigate = useNavigate();

  const listItemStyle = useMemo(
    () => ({
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    }),
    []
  );

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiDrawer-paper': {
          width: '300px',
        },
      }}
    >
      <Typography variant="h5" padding={ESize.base}>
        DD5 Generator
      </Typography>
      <Divider />
      <List>
        <ListItem sx={listItemStyle} onClick={() => navigate('/')}>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem
          sx={listItemStyle}
          onClick={() => navigate('/treasure-generation')}
        >
          <ListItemText>Treasure Generation</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}
