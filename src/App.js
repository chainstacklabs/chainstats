import { useState, useEffect } from 'react';
import processData from './helpers/getData';

// import PlannedUpgrades from "./components/PlannedUpgrades/PlannedUpgrades";
import ProtocolCards from './components/ProtocolCards/ProtocolCards';
import LayoutWrapper from './components/LayoutWrapper/LayoutWrapper';

import './App.scss';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    processData().then((data) => setData(data));
  }, []);

  return (
    <>
      <LayoutWrapper>
        {!data ? (
          <p className="layoutWrapper_loading">Loading...</p>
        ) : (
          <div className="layoutWrapper_contentWrapper">
            <ProtocolCards data={data} />
          </div>
        )}
      </LayoutWrapper>
    </>
  );
}
