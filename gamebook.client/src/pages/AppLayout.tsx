import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
