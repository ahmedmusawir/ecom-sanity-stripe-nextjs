import React from 'react';

const Home = () => (
  <>
    <h1>HeroBanner</h1>
    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div className='products-container'>
      {['Product 1', 'Product 2'].map((product, i) => (
        <li key={i}>{product}</li>
      ))}
    </div>

    <h1>Footer</h1>
  </>
);

export default Home;
