import { Tab, Tabs } from '@mui/material';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import FlexBox from '../components/base-components/FlexBox';

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
    <FlexBox padding={0} gap={0} takeRemainingSpace>
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
      <FlexBox padding={0} gap={0} takeRemainingSpace>
        <Outlet />
      </FlexBox>
    </FlexBox>
  );
}
