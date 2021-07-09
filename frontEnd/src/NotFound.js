import React from 'react';
import './App.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Nav from './Nav';

function NotFound() {

  return (
    <div>
      <Nav/>
      <div className="Banner"/>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
        <h1>Sorry Page Not Found...</h1>
        <Link to='/screensource'>
          <Button type="primary" shape="round" size='middle'>
            Back to HomePage
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
