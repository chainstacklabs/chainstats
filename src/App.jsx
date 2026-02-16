import { lazy, Suspense, useEffect, useState } from 'react';
import processData from './helpers/getData';
import LayoutWrapper from './components/LayoutWrapper/LayoutWrapper';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getProtocolSearchAliases } from './helpers/protocolDisplay';

import './App.scss';

const TableWrapper = lazy(() => import('./components/TableWrapper/TableWrapper'));

export default function App() {
  const [initialData, setInitialData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setFetchError('');

      try {
        const data = await processData();
        setInitialData(data);
        setSearchResult(data);
      } catch (error) {
        setFetchError(
          'Could not load data from Chainstack API. Please refresh the page in a moment.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!initialData.length || searchValue.length === 0) {
      setSearchResult(initialData);
    } else {
      setSearchResult(
        initialData.filter((item) => {
          return getProtocolSearchAliases(item.protocol).some((alias) =>
            alias.toLowerCase().includes(searchValue)
          );
        })
      );
    }
  }, [searchValue, initialData]);

  return (
    <>
      <LayoutWrapper>
        {isLoading ? (
          <p className="layoutWrapper_loading">Loading...</p>
        ) : fetchError ? (
          <p className="layoutWrapper_error">{fetchError}</p>
        ) : (
          <div className="layoutWrapper_contentWrapper">
            <Input
              placeholder="Search by protocol name"
              className="search_input"
              size="large"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchValue(e.target.value.trim().toLowerCase())}
              allowClear
            />
            {searchResult.length !== 0 ? (
              <>
                <Suspense fallback={<p className="layoutWrapper_loading">Loading table...</p>}>
                  <TableWrapper data={searchResult} />
                </Suspense>
                {/* <ProtocolCards data={searchResult} searchValue={searchValue} /> */}
              </>
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
