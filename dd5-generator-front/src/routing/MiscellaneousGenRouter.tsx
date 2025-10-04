import { Route } from 'react-router-dom';
import ScrollIncidentGenPage from '../pages/ScrollIncidentGenPage';
import NameGenPage from '../pages/NameGenPage';

export default function MiscellaneousGenRouter() {
  return (
    <>
      <Route path="/scroll-incident" element={<ScrollIncidentGenPage />} />
      <Route path="/name-generation" element={<NameGenPage />} />
    </>
  );
}
