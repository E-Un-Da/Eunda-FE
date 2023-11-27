
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import '../styles/AppSidebar.scss';


const AppSidebar = () => {
  // State to store the sidebar height
  const [sidebarHeight, setSidebarHeight] = useState(0);

  // Function to update the sidebar height
  const updateSidebarHeight = () => {
    const sidebarElement = document.querySelector('.sidebar-layout');
    if (sidebarElement) {
      setSidebarHeight(sidebarElement.clientHeight);
    }
  };

  // useEffect to run the updateSidebarHeight function on mount and window resize
  useEffect(() => {
    updateSidebarHeight();

    // Update the sidebar height when the window is resized
    window.addEventListener('resize', updateSidebarHeight);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateSidebarHeight);
    };
  }, []);
  
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
