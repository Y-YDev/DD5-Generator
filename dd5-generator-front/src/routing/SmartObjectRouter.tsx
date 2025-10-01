import { Route } from 'react-router-dom';
import SmartObjectPage from '../pages/SmartObjectPage';

export default function SmartObjectRouter() {
  return (
    <>
      <Route path="/smart-object" element={<SmartObjectPage />} />
    </>
  );
}
