import React from 'react';
import { Button } from 'antd';
import ButtonBrand from '../ButtonBrand/ButtonBrand';
import './Header.scss';

import Icon from '@ant-design/icons';
import IconMoon from '../Icons/IconMoon';
import IconSun from '../Icons/IconSun';

import logo from './logoSquareRounded.svg';

export default function Header(props) {
  return (
    <div className="header">
      <div className="header_left">
        <img
          src={logo}
          width={48}
          height={48}
          className="header_main_app__logo"
          alt="Chainstack labs"
        />

        <div className="header_left__labels">
          <div className="name">Blockchain size</div>
          <div className="description">
            What is total amount of data stored within a blockchain network?
          </div>
        </div>
      </div>
      <div className="header_right">
        {/* <Tag color="blue">Only for internal use</Tag> */}
        {[
          {
            label: 'Chainstack Labs',
            href: 'https://chainstack.com/labs/',
          },
        ].map((item, idx) => {
          return (
            <Button type="link" href={item.href} key={idx} target="_blank">
              {item.label} ↗
            </Button>
          );
        })}
        <ButtonBrand
          label="Start for free"
          link="https://console.chainstack.com/user/account/create"
        />
        <Button
          onClick={() =>
            props.handleThemeChange(props.theme === 'light' ? 'dark' : 'light')
          }
          type="ghost"
          icon={
            <Icon component={props.theme === 'light' ? IconSun : IconMoon} />
          }
        />
      </div>
    </div>
  );
}
