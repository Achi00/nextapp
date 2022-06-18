import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const easing = [0.6, -0.5, 0.01, 0.99]

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
}
const fadeInDown = {
  initial: {
    y: -60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

// State to store count value
const Counter = () => {
  const [count, setCount] = useState(1)
  const [price, setPrice] = useState(499)
  return(
    <>
    <div className="count">{count}</div>
    <button onClick={() => setCount(count + 1,setPrice(price + 499))} className="add">+</button>
    <button disabled={count == 1} onClick={() => setCount(count - 1,setPrice(price - 499))} className="minus">-</button>
    {/* <div className="price">{price} $</div> */}
    </>
  )
}

const Product = props => (
  <motion.div exit={{opacity: 0}} initial="initial" animate="animate">
    <div className='fullscreen'>
      <div className='product'>
        <div className='img'>
          <motion.img className={'product-img'}
          animate={{x: 0, opacity: 1}} 
          initial={{x: 200, opacity: 0}}
          transition={{delay: 0.2}}
           key={props.product.image} 
           src={props.product.image} />
        </div>
        <div className='product-details'>
          <div className='inner'>
            <Link href='/'>
              <motion.div variants={fadeInUp}>
                <a className='go-back'>Back to main</a>
              </motion.div>
            </Link>
            <motion.div variants={fadeInDown}>
              <span className='category'>Home.</span>
            </motion.div>
            <motion.h1 variants={fadeInDown}>{props.product.name}</motion.h1>
            <motion.p className="details" variants={fadeInDown}>{props.product.details}</motion.p>
            <motion.div variants={fadeInDown} className='additonals'>
              <span>2+ Floors</span>
              <span>Garage</span>
            </motion.div>
            <motion.div variants={fadeInUp} className='qty-price'>
              {/* <div className='qty'>
                <div className='amount'><Counter /></div>          
              </div> */}
              <motion.span variants={fadeInUp} className='price'>{props.product.price}</motion.span>
    
            </motion.div>
            <motion.div variants={fadeInUp} className='btn-row'>
              <button className='size'> {props.product.m2}m²</button>
              <button className='subscribe'> {props.product.status}</button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

Product.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(
    `https://my-json-server.typicode.com/Achi00/db/products/${id}`
  );
  const product = await res.json();
  return { product };
};

export default Product;