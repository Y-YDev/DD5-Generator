import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TreasureGenerationPage } from './pages/TreasureGenerationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/treasure-generation" element={<TreasureGenerationPage />} />
    </Routes>
  );
}

export default App;
