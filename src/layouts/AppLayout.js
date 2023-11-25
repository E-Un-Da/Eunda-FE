import React from 'react';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppSidebar from './AppSidebar';
import '../styles/AppLayout.scss';

function AppLayout(props) {
  const { children } = props;
  return (
    <>
      <AppHeader />
      <div className='page-container'>
        <div className='sidebar'>
          <AppSidebar />
        </div>
        <div className='contents'>{children}</div>
      </div>
      <AppFooter />
    </>
  );
}

export default AppLayout;
