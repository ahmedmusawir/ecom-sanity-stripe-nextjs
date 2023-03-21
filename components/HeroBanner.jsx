import React, { useContext } from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { useRouter } from 'next/router';

const HeroBanner = ({ heroBanner, setIndex }) => {
  const router = useRouter();
  //THIS WAS ADDED TO FIX THE PRODUCT IMG NOT FOUND BUG
  //When the index of the image changed by mouse over on the single product page
  //the image was not found on the product that has fewer than 4 sub images, thus
  //the image was not found. When we setIndex(0) it fixes that bug.
  const handleRedirect = () => {
    setIndex(0);
    router.push(`/product/${heroBanner.product}`);
  };

  return (
    <div className="hero-banner-container container">
      <div className="">
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={urlFor(heroBanner.image)}
          alt="headphones"
          className="hero-banner-image"
        />

        <div>
          <button onClick={handleRedirect}>{heroBanner.buttonText}</button>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
