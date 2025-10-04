import { Route } from 'react-router-dom';
import SmartObjectGenPage from '../pages/SmartObjectPageGen';
import MOParticularityGenPage from '../pages/MOParticularityGenPage';

export default function SmartObjectRouter() {
  return (
    <>
      <Route path="/smart-object" element={<SmartObjectGenPage />} />
      <Route path="/mo-particularity" element={<MOParticularityGenPage />} />
    </>
  );
}
