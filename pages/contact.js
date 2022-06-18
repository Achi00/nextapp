import React, { useEffect } from "react";
import { useAnimation, motion } from 'framer-motion';
import Image from 'next/image'
import { useInView } from "react-intersection-observer";

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

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const reveal = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  hidden: { opacity: 0, x: 200 },
};

function contact() {
    const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <div className="contact-page">
        <div className="logo"><h1><a href="/">Home.</a></h1></div>
        <div className="head">
        <motion.div ref={ref}
      animate={controls}
      initial="hidden"
      variants={reveal} className="contactImg">
        <Image src='/contact.jpg' width={2560} height={900}/>
        </motion.div>
        <motion.div ref={ref}
      animate={controls}
      initial="hidden"
      variants={reveal} className="main-text">
            <h1>Contact Us</h1>
            <h2>WE ARE HAPPY TO HEAR FROM YOU</h2>
            <p>Staying connected, transparent and approachable allows us to better meet our clients expectations, exchange valuable information and together strive for the positive change.</p>
        </motion.div>
        </div>
        <motion.div ref={ref}
      animate={controls}
      initial="hidden"
      variants={reveal} className="info-section">
            <h1>Contact</h1>
            <div className="media">
                <h1>Adress:</h1>
                <h2>Address #12231</h2>
                <h1 className="phone">Phone:</h1>
                <h1 className="phone-num">555 555 555</h1>
            </div>
        </motion.div>
    </div>
  )
}

export default contact