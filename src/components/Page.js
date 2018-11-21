import React from 'react'
import Header from './Header'

function Page({ children }) {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '2vh'}}>
        {children}
      </div>
    </>
  )
}

export default Page;
