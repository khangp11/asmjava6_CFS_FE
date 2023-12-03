import React, { ReactNode } from 'react'
import Footer from './Components/Footer'
import Header from './Components/Header'
import LayoutChildren from './Components/LayoutChildren';
interface LayoutProps {
    children: ReactNode;
  }
  
  const Layout = (props:any) => {
    return (
      <>
        <Header />
            {props.children}
        <Footer />
      </>
    );
  };

export default Layout