import React from 'react';
import './App.css';
import {Menu, Icon} from 'antd'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Nav() {
  const user = useSelector(state => state.user);

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
          <Link to={`/screensource/${user}`} ><Icon type="home" />Sources</Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Link to='/screenmyarticles' ><Icon type="read" />My Articles</Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Link to='/'><Icon type="logout" />Logout</Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}

export default Nav;
