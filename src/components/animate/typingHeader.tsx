import { useEffect, useState } from 'react';
import styled, {keyframes} from 'styled-components';

interface TypingProps {
  title: string;
}

const blink = keyframes`
  0% {
    opacity: 0%;
  }
  50% {
    opacity: 100%;
  }
  100% {
    opacity: 0%;
  }
`

const Blink = styled.p`
  animation-duration: 1s;
  animation-name: ${blink};
  animation-iteration-count: infinite;
` 

export const TypingHeader = function ({ title }: TypingProps) {
  const [typeWords, setTypeWords] = useState('');
  useEffect(() => {
    const timer = setInterval(() => {
      setTypeWords((type: string) => {
        if (type.length == title.length) {
          clearInterval(timer);
          return type;
        }
        return type + title[type.length];
      });
    }, 50);
  }, []);

  return (
    <section className="m-8 z-10">
      <pre className='inline' >{typeWords}</pre>
      <Blink className='inline'>_</Blink>
    </section>
  );
};
