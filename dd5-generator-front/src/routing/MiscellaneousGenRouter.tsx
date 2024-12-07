import { Route } from 'react-router-dom';
import ScrollIncidentGenPage from '../pages/ScrollIncidentGenPage';

export default function MiscellaneousGenRouter() {
  return (
    <>
      <Route path="/scroll-incident" element={<ScrollIncidentGenPage />} />
    </>
  );
}
