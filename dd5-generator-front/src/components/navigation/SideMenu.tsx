import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ESize } from '../../styles/size.enum';
import {
  PRIMARY_COLOR,
  SECONDARY_BACKGROUND,
  SECONDARY_COLOR,
  SECONDARY_COLOR_LIGHT,
} from '../../styles/theme';

export default function SideMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const listItemStyle = useCallback(
    (selected: boolean, isSecondary = false) => ({
      cursor: 'pointer',
      paddingLeft: isSecondary ? ESize.md : ESize.xs,
      backgroundColor: selected ? SECONDARY_COLOR : 'transparent',
      '&:hover': {
        backgroundColor: SECONDARY_COLOR_LIGHT,
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
          bgcolor: SECONDARY_BACKGROUND,
        },
      }}
    >
      <Typography
        variant="h5"
        padding={ESize.base}
        fontWeight={'bold'}
        bgcolor={PRIMARY_COLOR}
        color="white"
        sx={{ fontFamily: '"UnifrakturCook", serif' }}
      >
        DD5 Generator
      </Typography>
      <Divider />
      <List>
        <ListItem
          sx={listItemStyle(currentPath === '/')}
          onClick={() => navigate('/')}
        >
          <ListItemText>
            <Typography fontWeight={'bold'}>Home</Typography>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <Typography
        sx={{ textDecoration: 'underline' }}
        variant="body2"
        paddingTop={ESize.sm}
        paddingLeft={ESize.sm}
      >
        Treasure generation
      </Typography>

      <List>
        <ListItem
          sx={listItemStyle(currentPath === '/treasure-generation', true)}
          onClick={() => navigate('/treasure-generation')}
        >
          <ListItemText>Standard Generation</ListItemText>
        </ListItem>
        <ListItem
          sx={listItemStyle(
            currentPath === '/treasure-generation/by-type/coin',
            true
          )}
          onClick={() => navigate('/treasure-generation/by-type/coin')}
        >
          <ListItemText>Generation by type</ListItemText>
        </ListItem>
        <ListItem
          sx={listItemStyle(
            currentPath === '/treasure-generation/custom',
            true
          )}
          onClick={() => navigate('/treasure-generation/custom')}
        >
          <ListItemText>Custom generation</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <Typography
        sx={{ textDecoration: 'underline' }}
        variant="body2"
        paddingTop={ESize.sm}
        paddingLeft={ESize.sm}
      >
        Smart object generation
      </Typography>

      <List>
        <ListItem
          sx={listItemStyle(currentPath === '/smart-object', true)}
          onClick={() => navigate('/smart-object')}
        >
          <ListItemText>Smart Object</ListItemText>
        </ListItem>
        <ListItem
          sx={listItemStyle(currentPath === '/mo-particularity', true)}
          onClick={() => navigate('/mo-particularity')}
        >
          <ListItemText>Magic Object Particularity</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <Typography
        sx={{ textDecoration: 'underline' }}
        variant="body2"
        paddingTop={ESize.sm}
        paddingLeft={ESize.sm}
      >
        Miscellaneous generation
      </Typography>

      <List>
        <ListItem
          sx={listItemStyle(currentPath === '/scroll-incident', true)}
          onClick={() => navigate('/scroll-incident')}
        >
          <ListItemText>Scroll incident</ListItemText>
        </ListItem>
        <ListItem
          sx={listItemStyle(currentPath === '/name-generation', true)}
          onClick={() => navigate('/name-generation')}
        >
          <ListItemText>Name generation</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          sx={listItemStyle(currentPath === '/docs')}
          onClick={() => navigate('/docs')}
        >
          <ListItemText>Documentation</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}
