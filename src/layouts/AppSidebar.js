import React from 'react';
import '../styles/AppSidebar.scss';

const AppSidebar = () => {
  return (
    <div className='sidebar-layout'>
      <div className='sidebar-item'>Home</div>
      <div className='sidebar-item'>study</div>
      <div className='sidebar-item'>Calendar</div>
      <div className='sidebar-item'>Notes</div>
    </div>
  );
};

export default AppSidebar;
