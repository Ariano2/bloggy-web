import React from 'react';
import Header from './Header';
import Feed from './Feed';

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Header />
      <Feed />
    </div>
  );
};

export default Home;
