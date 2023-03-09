import React from 'react';
import { Product, HeroBanner, FooterBanner } from '../components';
import { client } from '../lib/client';

const Home = ({ products, bannerData }) => (
  <>
    <h1>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    </h1>
    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div className='products-container'>
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>

    <h1>
      <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
    </h1>
  </>
);

export const getServerSideProps = async () => {
  // const query = '*[_type == "product"]';
  const query = '*[_type == "product" && isFeatured == "featured"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
