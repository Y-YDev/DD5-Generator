import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TreasureGenerationPage } from './pages/TreasureGenerationPage';
import FlexBox from './components/base-components/FlexBox';
import SideMenu from './components/navigation/SideMenu';

function App() {
  return (
    <FlexBox height={'100vh'} flexDirection={'row'} padding={0} gap={0}>
      <SideMenu />
      <FlexBox takeRemainingSpace overflow={'auto'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/treasure-generation"
            element={<TreasureGenerationPage />}
          />
        </Routes>
      </FlexBox>
    </FlexBox>
  );
}

export default App;
