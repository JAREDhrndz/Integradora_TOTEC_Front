// frontend/src/Components/SideMenuComponents/DataRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import Data from './Data';
import Map from './Map';

const DataRoutes = () => {
  return (
    <Routes>
      <Route index element={<Data />} />
      <Route path="map" element={<Map />} />
    </Routes>
  );
};

export default DataRoutes;