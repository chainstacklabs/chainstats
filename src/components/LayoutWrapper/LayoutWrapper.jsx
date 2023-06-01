import React from 'react';
import { ConfigProvider, theme } from 'antd';
import useLocalStorage from '../../helpers/useLocalStorage';
import Header from '../Header/Header';
import './LayoutWrapper.scss';

const LayoutWrapper = ({ children }) => {
  const [uiTheme, setUiTheme] = useLocalStorage(
    'chainstack-chainstats-app-theme',
    'light'
  );
  const themeClassName = (theme) => {
    return `app labs-theme-${theme}`;
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#007BFF',
        },
        algorithm:
          uiTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <div className={themeClassName(uiTheme)}>
        <Header
          theme={uiTheme}
          currentTheme={theme}
          handleThemeChange={setUiTheme}
        />
        <div className="content">{children}</div>
      </div>
    </ConfigProvider>
  );
};

export default LayoutWrapper;
