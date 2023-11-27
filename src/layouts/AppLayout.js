import React from 'react';
import { Outlet } from "react-router-dom";
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppSidebar from './AppSidebar';
import '../styles/AppLayout.scss';

const AppLayout = (props) => {
  const { children } = props;
  return (
    <>
      <AppHeader />
      <div className='page-container'>
        <div className='sidebar'>
          <AppSidebar />
        </div>
        <div className='contents'>
          {/* {children} */}
          <Outlet />
        </div>
      </div>
      {/* <AppFooter /> */}
    </>
  );
}

export default AppLayout;
