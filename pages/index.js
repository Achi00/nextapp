import React, { useEffect } from "react";
import Image from 'next/image'
import Link from "next/link";
import { useAnimation, motion } from 'framer-motion';
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

const Text = () =>{
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.p className="text" ref={ref}
    animate={controls}
    initial="hidden"
    variants={reveal}><span>WE DESIGN SPACES WITH AN INTENT TO CREATE A HEALTHIER ENVIRONMENT</span><br />
    OUR WORK IS CHARACTERIZED BY STRONG CONCEPTUAL LEGIBILITY,<br /> INNOVATION AND SUSTAINABLE APPROACH</motion.p>
  );
}

const BottomSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div ref={ref}
    animate={controls}
    initial="hidden"
    variants={reveal} className="bottom">
    <motion.p 
    className="text1"
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={reveal}>
      <span >COMMITTED TO CREATE A HEALTHIER ENVIRONMENT</span><br />
      OUR WORK IS CHARACTERIZED BY STRONG CONCEPTUAL LEGIBILITY,<br /> INNOVATION AND SUSTAINABLE    APPROACH
    </motion.p>
    <motion.div 
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={reveal} className="images">
        <motion.div ref={ref}
      animate={controls}
      initial="hidden"
      variants={reveal} className="image1-wrapper">
        <Image src='/01.jpg' width={550} height={350}/>
        </motion.div>
        <p className="p1">
          <span>Project Processing</span><br />
          We relish the challenges inherent across a wide range of work,<br />
          engaging our expertise and agility to deliver lasting, meaningful<br />
          design that brings value and contributes towards healthier planet.<br />
          Our design philosophy is based on deep respect and consideration<br />
          for our planet's well being and resources.
        </p>
    </motion.div>
    <motion.div 
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={reveal} className="images1">
        <motion.div ref={ref}
      animate={controls}
      initial="hidden"
      variants={reveal} className="image2-wrapper">
        <Image src='/02.jpg' width={550} height={350}/>
        </motion.div>
    </motion.div>
    <motion.div 
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={reveal} className="images2">
        <motion.div ref={ref}
      animate={controls}
      initial="hidden"
      variants={reveal} className="image3-wrapper">
        <Image src='/03.jpg' width={550} height={350}/>
        </motion.div>
    </motion.div>
        <motion.p 
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={reveal} className="p2">
          <span>Collaboration</span><br />
          Consolidated group of professionals committed to create and deliver<br />
          world class solutions enriched with local traditions, context and <br />
          latest technology. We aim to create long lasting values that embrace<br />
          environmental impact, social and economical platforms with global<br />
          reach and local context. We embrace diversity and promote social<br />
          responsibility. We are committed to contribute to the larger context<br />
          and an ability to affect positive change.
        </motion.p>
    </motion.div>
  );
}


const View = () => {
  return(
    <div className="navigation">
            <Link href="/view">
            <li>3D view</li>
            </Link>
    </div>
  )
}

const Index = props => (
  <motion.div exit={{opacity: 0}} initial="initial" animate="animate">
    <motion.div 
      initial={{y: 60, opacity: 0}} 
      animate={{y: 0, opacity: 1}}
      transition={{deley: 0.5}} 
      className="header">
      <div className="logo">Home.</div>
      <div className="nav">
        <ul>
            <Link href="/view">
            <li>3D view</li>
            </Link>
        </ul>   
      </div>
    </motion.div>
    <div className='container center'>
      <div className='title'>
        <h1>Select <br/> Example</h1>
      </div>
      <motion.div variants={stagger} className='product-row'>
        {props.products.map(product => (
          <Link
            key={product.id}
            href='/products/[id]'
            as={`/products/${product.id}`}>
            <motion.div whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }} variants={fadeInUp} className='card'>
              <span className='category'>Home.</span>
              <motion.img 
              initial={{x: 60, opacity: 0}} 
              animate={{x: 0, opacity: 1}}
              transition={{deley: 0.3}} 
              key={product.image} 
              src={product.image} width={250} />
              <div className='product-info'>
                <h4>{product.name}</h4>
                <span>{product.price}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
      {/* second row */}
      <motion.div variants={stagger}  initial={{y: 100, opacity: 0}} 
      animate={{y: 0, opacity: 1}}
      transition={{deley: 0.9}}  className="second-row">
        <p>25+ Projects</p>
        <p>50+ Employe</p>
        <p>5+ Awards</p>
      </motion.div>
      <div className="last-row">
        <div className="middleImg-wrapper">
        <Image className='img' src='/img1.jpg' width={2200} height={900}/>
        </div>
        <Text />           
      </div>
      <div className="bottom-section">
        <BottomSection />  
      </div>
    </div>
        
  </motion.div>
);

Index.getInitialProps = async function() {
  const res = await fetch(
    "https://my-json-server.typicode.com/Achi00/db/products/"
    // fetch("https://my-json-server.typicode.com/Achi00/db/examples/")
  );
  const data = await res.json();
  return {
    products: data,
    examples: data
  };
};

export default Index;