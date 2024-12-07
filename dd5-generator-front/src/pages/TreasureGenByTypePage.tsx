import { Tab, Tabs } from '@mui/material';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function TreasureGenByTypePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define the tab paths
  const tabPaths = useMemo(
    () => ['coin', 'rare-object', 'hoard', 'magic-object'],
    []
  );

  // Determine the current tab based on the URL
  const tabIndex = useMemo(() => {
    const currentTabIndex = tabPaths.findIndex((path) =>
      location.pathname.endsWith(path)
    );
    return currentTabIndex === -1 ? 0 : currentTabIndex;
  }, [location.pathname, tabPaths]);

  return (
    <div>
      <Tabs
        value={tabIndex}
        onChange={(_, newValue: number) => {
          navigate(tabPaths[newValue]);
        }}
      >
        <Tab label="Coin" />
        <Tab label="Rare object" />
        <Tab label="Hoard" />
        <Tab label="Magic object" />
      </Tabs>
      <Outlet />
    </div>
  );
}
