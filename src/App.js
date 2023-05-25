import { useState, useEffect } from 'react';
import processData from './helpers/getData';

// import PlannedUpgrades from "./components/PlannedUpgrades/PlannedUpgrades";
import ProtocolCards from './components/ProtocolCards/ProtocolCards';
import LayoutWrapper from './components/LayoutWrapper/LayoutWrapper';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import './App.scss';

export default function App() {
  const [initialData, setInitialData] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    processData().then((data) => {
      setInitialData(data);
      setSearchResult(data);
    });
  }, []);

  useEffect(() => {
    console.log(searchValue);
    if (searchValue.length === 0) {
      setSearchResult(initialData);
    } else {
      setSearchResult(
        initialData.filter((item) => item.protocol.includes(searchValue))
      );
    }
  }, [searchValue]);

  return (
    <>
      <LayoutWrapper>
        {initialData === null ? (
          <p className="layoutWrapper_loading">Loading...</p>
        ) : (
          <div className="layoutWrapper_contentWrapper">
            <Input
              placeholder="Search by protocol name"
              // bordered={false}
              className="search_input"
              size="large"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
              allowClear
            />
            {searchResult.length != 0 ? (
              <ProtocolCards data={searchResult} searchValue={searchValue} />
            ) : (
              <p className="layoutWrapper_no-results">
                No results for
                <br /> <b>{searchValue}</b>
              </p>
            )}
          </div>
        )}
      </LayoutWrapper>
    </>
  );
}
