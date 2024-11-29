import { Route } from 'react-router-dom';
import React from 'react';
import TreasureGenerationComponent from '../components/treasure-generation/TreasureGenerationComponent';
import TreasureGenByTypePage from '../pages/TreasureGenByTypePage';
import TreasureGenDocsPage from '../pages/TreasureGenDocs';

export default function TreasureGenRouter() {
  return (
    <>
      <Route
        path="/treasure-generation/docs"
        element={<TreasureGenDocsPage />}
      />
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
          path="individual-treasure"
          element={
            <TreasureGenerationComponent
              title={'Individual treasure generation'}
              buttonLabel="Generate individual treasures"
              backendPath="individual-treasure"
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
