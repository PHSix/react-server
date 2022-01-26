import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface SwellBoxInterface {
  size: number;
}

const SwellBox = styled.div<SwellBoxInterface>`
  height: ${props=>props.size}px;
  width: ${props=>props.size}px;
  top: ${props=>screen.height / 2 - props.size / 2}px;
  left: ${props=>- (props.size / 2)}px;
  transition-duration: 2s;
  transition-property: all;
`

export const AnimateBackground = function () {
  const initSize = 0;
  const maxSize = (()=> window.innerWidth < window.innerHeight ? screen.width : screen.height)()
  const [size, setSize] = useState(initSize);
  const dl = 200;
  useEffect(()=> {
  setTimeout(function () {
    setSize(maxSize)
    }, 1000)
  }, [])
  return <section className='w-screen h-screen absolute z-0 overflow-hidden'>
    <SwellBox
      size={size}
      className={`absolute rounded-full bg-red-300 z-40`}
      >
    </SwellBox>
    <SwellBox
      size={size === initSize ? size :size + 1 * dl}
      className={`absolute rounded-full bg-purple-300 z-30`}
      >
    </SwellBox>
    <SwellBox
      size={size === initSize ? size: size + 2 * dl}
      className={`absolute rounded-full bg-yellow-300 z-20`}
      >
    </SwellBox>
    <SwellBox
      size={size === initSize ? size: size + 3 * dl}
      className={`absolute rounded-full bg-indigo-300 z-10`}
      >
    </SwellBox>
    <SwellBox
      size={size === initSize ? size: size + 4 * dl}
      className={`absolute rounded-full bg-pink-300 z-0`}
      >
    </SwellBox>
  </section>
}
