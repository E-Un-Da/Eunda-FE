import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AppSidebar.scss';

const AppSidebar = () => {
  return (
    <div className='sidebar-layout'>
      <Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
        <div className='sidebar-item'>Home</div>
      </Link>
      <Link to={`/studies`} style={{ textDecoration: 'none', color: 'black' }}>
        <div className='sidebar-item'>study</div>
      </Link>
      <div className='sidebar-item'>Calendar</div>
      <div className='sidebar-item'>Notes</div>
    </div>
  );
};

export default AppSidebar;
