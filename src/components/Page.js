import React from 'react';
import Header from './Header';

function Page({ children }) {
  return (
    <div style={{ height: '100vh' }}>
      <Header />
      <div style={{ height: '100%', paddingTop: '2vh' }}>{children}</div>
    </div>
  );
}

export default Page;
