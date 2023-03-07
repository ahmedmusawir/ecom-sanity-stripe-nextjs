import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { useRouter } from 'next/router';

const Product = ({ product: { image, name, slug, price }, setIndex }) => {
  const router = useRouter();

  //THIS WAS ADDED TO FIX THE PRODUCT IMG NOT FOUND BUG
  const handleRedirect = () => {
    setIndex(0);
    router.push(`/product/${slug.current}`);
  };

  return (
    <div onClick={handleRedirect}>
      {/* <Link href={`/product/${slug.current}`} onClick={() => setIndex(0)}> */}
      <div className='product-card'>
        <img
          src={urlFor(image && image[0]).url()}
          width={250}
          height={250}
          className='product-image'
          alt=''
        />
        <p className='product-name'>{name}</p>
        <p className='product-price'>${price}</p>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default Product;
