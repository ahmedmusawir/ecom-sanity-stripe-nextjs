import React, { useContext } from 'react';
import { client } from '../../lib/client';
import { urlFor } from '../../lib/client';
import { Product } from '../../components';
import { toast } from 'react-hot-toast';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { GlobalContext } from '../../context/GlobalContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const { index, setIndex, decQty, incQty, qty, onAdd } =
    useContext(GlobalContext);

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            {image && (
              <img
                src={urlFor(image && image[index]).url()}
                alt=''
                className='product-detail-image'
              />
            )}
          </div>
          <div className='small-images-container'>
            {image &&
              image?.map((item, i) => (
                <img
                  key={i}
                  src={urlFor(item && item.asset._ref).url()}
                  className={
                    i === index ? 'small-image selected-image' : 'small-image'
                  }
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <h4>Quantity:</h4>
          <div className='quantity'>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button className='add-to-cart' onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button
              className='buy-now'
              // onClick={''}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like...</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item} setIndex={setIndex} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
