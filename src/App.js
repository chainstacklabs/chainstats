import { useState, useEffect } from 'react';
import processData from './helpers/getData';

// import PlannedUpgrades from "./components/PlannedUpgrades/PlannedUpgrades";
import ProtocolCards from './components/ProtocolCards/ProtocolCards';
import LayoutWrapper from './components/LayoutWrapper/LayoutWrapper';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    processData().then((data) => setData(data));
  }, []);

  return (
    <>
      <LayoutWrapper>
        {!data ? (
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              color: 'var(--color-typo-primary)',
            }}
          >
            Loading...
          </p>
        ) : (
          <div style={{ padding: '32px', margin: 'auto', maxWidth: '1400px' }}>
            {/* <PlannedUpgrades plannedUpgrades={plannedUpgrades} /> */}
            <ProtocolCards data={data} />
          </div>
        )}
      </LayoutWrapper>
    </>
  );
}
