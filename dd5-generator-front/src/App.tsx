import { Route, Routes } from 'react-router-dom';
import FlexBox from './components/base-components/FlexBox';
import SideMenu from './components/navigation/SideMenu';
import { HomePage } from './pages/HomePage';
import TreasureGenRouter from './routing/TreasureGenRouter';

function App() {
  return (
    <FlexBox height={'100vh'} flexDirection={'row'} padding={0} gap={0}>
      <SideMenu />
      <FlexBox takeRemainingSpace overflow={'auto'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Use call */}
          {TreasureGenRouter()}
        </Routes>
      </FlexBox>
    </FlexBox>
  );
}

export default App;
