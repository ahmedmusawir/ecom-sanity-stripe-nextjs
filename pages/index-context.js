import React, { useContext } from 'react';
import { Product, HeroBanner, FooterBanner } from '../components';
import { GlobalContext } from '../context/GlobalContext';
import { ProductsContext } from '../context/ProductsContext';
import { Dna } from 'react-loader-spinner';
import { client } from '../lib/client';

const Home = ({ products }) => {
  const { index, setIndex } = useContext(GlobalContext);
  const { featured, bannerData, isPending } = useContext(ProductsContext);

  console.log('Banner Data:', bannerData);

  return (
    <>
      {isPending && (
        <div style={{ textAlign: 'center' }}>
          <Dna
            visible={true}
            height='80'
            width='80'
            ariaLabel='dna-loading'
            wrapperStyle={{}}
            wrapperClass='dna-wrapper'
          />
        </div>
      )}
      <h1>{bannerData.length && <HeroBanner heroBanner={bannerData[0]} />}</h1>
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {featured &&
          featured?.map((product) => (
            <Product key={product._id} product={product} setIndex={setIndex} />
          ))}
      </div>

      <h1>
        {bannerData.length && <FooterBanner footerBanner={bannerData[0]} />}
      </h1>
    </>
  );
};

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
