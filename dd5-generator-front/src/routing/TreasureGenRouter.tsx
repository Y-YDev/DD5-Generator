import { Route } from 'react-router-dom';
import TreasureGenerationComponent from '../components/treasure-generation/TreasureGenerationComponent';
import TreasureGenByTypePage from '../pages/TreasureGenByTypePage';
import CustomTreasureGenPage from '../pages/CustomTreasureGenPage';

export default function TreasureGenRouter() {
  return (
    <>
      <Route
        path="/treasure-generation/by-type"
        element={<TreasureGenByTypePage />}
      >
        <Route
          path="coin"
          element={
            <TreasureGenerationComponent
              title={'Coin generation'}
              buttonLabel="Generate coins"
              backendPath="coin"
            />
          }
        />
        <Route
          path="rare-object"
          element={
            <TreasureGenerationComponent
              title={'Rare object generation'}
              buttonLabel="Generate rare objects"
              backendPath="rare-object"
            />
          }
        />
        <Route
          path="hoard"
          element={
            <TreasureGenerationComponent
              title={'Hoard generation (Treasure)'}
              buttonLabel="Generate hoard"
              backendPath="hoard"
            />
          }
        />
        <Route
          path="magic-object"
          element={
            <TreasureGenerationComponent
              title={'Magic object generation'}
              buttonLabel="Generate magic objects"
              backendPath="magic-object"
            />
          }
        />
      </Route>
      <Route
        path="/treasure-generation/custom"
        element={<CustomTreasureGenPage />}
      />
      <Route
        path="/treasure-generation"
        element={
          <TreasureGenerationComponent
            title={'Treasure generation'}
            buttonLabel="Generate treasure"
          />
        }
      />
    </>
  );
}
