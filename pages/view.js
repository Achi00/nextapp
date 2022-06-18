import React, {useRef} from 'react'
import { useLoader, Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshReflectorMaterial, OrbitControls, ScrollControls, useScroll, Text } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import { useAnimation, motion } from 'framer-motion';


//animate: defines animation : x: 0
//initial: defines initial state, x: 60
//exit: when component exits

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


const Model = () => {
  const gltf = useLoader(GLTFLoader, "./scene.gltf");
  const scroll = useScroll()
  const ref = useRef()
  const textRef2 = useRef()
  useFrame(() => (ref.current.rotation.y = scroll.offset * 5,textRef2.current.rotation.y = -scroll.offset * 5))
  return (
    <group ref={ref} position={[3, -3, -6]}>
      <primitive object={gltf.scene} scale={0.001} />
      {/* part2 */}
  <group ref={textRef2} rotation={[0, -Math.PI / 2, 0]} position={[0, 0, -10]}>
    <Text
    font="/Koulen-Regular.ttf"
    scale={[10, 10, 1]}
    position={[0, 1, 0]}
    color="#D3D3D3"
    anchorX="center"
    anchorY="middle"
  >With Garage</Text>
  </group>
  <Text
    font="/Koulen-Regular.ttf"
    scale={[10, 10, 1]}
    position={[5, 1, 1]}
    color="#D3D3D3"
    anchorX="center"
    anchorY="middle"
  >180, 000$</Text>
    </group>
  );
};

// Floor

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#202020"
            metalness={0.5}
          />
        </mesh>
  );
}

const Info = () => {
  const scroll = useScroll()
  const textRef1 = useRef()
  const textRef2 = useRef()
  useFrame(() => (textRef1.current.position.z = -scroll.offset * 1))
  return(
    // part 1
    <>
  <group ref={textRef1} rotation={[0, Math.PI / 12, 0]} position={[0, -5, 0]}>
    <Text
    font="/Koulen-Regular.ttf"
    scale={[6, 6, 1]}
    position={[0, 2.5, -1.99]}
    color="#D3D3D3"
    anchorX="center"
    anchorY="middle"
  >2 Floors</Text>
  </group>
  </>
  )
}

function view() {
  return (
    <div className="App">
      <div className="canvas-container">
      <p>Go To Main</p> 
      <a href="/" class="arrow left"></a>
      <motion.div variants={stagger} className='product-row'>
        <h1>Private House</h1>
        <h2>The project of the house outlines the synthesis between nature and the interior in keeping with a trend of comfort and domesticity.
          The relationship between the room and the external landscape is especially evident with the large living-room glass wall with an opening, which is located on the ground floor and connects to the terrace framing a view of the pinewood landscape.</h2>
        <button className='btn'>120 m²</button>
        <div className="status">Completed</div>
        <div className="scroll">Scroll Through 3D Model Container</div>
      </motion.div>
      </div>
      <Canvas>
        <ScrollControls pages={0.3}>
        <Suspense fallback={null}>
          <Model />
          <Floor />
          {/* <OrbitControls /> */}
          <Environment preset="sunset"/>
        </Suspense>
        <Info />
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default view