import { useEffect, useState } from 'react';
import styled, {keyframes} from 'styled-components';

interface TypingProps {
  title: string;
  className?: string;
}

const blink = keyframes`
  0% {
    opacity: 0%;
  }
  20% {
    opacity: 30%;
  }
  50 % {
    opacity: 100%;
  }
  70% {
    opacity: 60%;
  }
  100% {
    opacity: 0%;
  }
`

const Blink = styled.p`
  animation-duration: 1.8s;
  animation-name: ${blink};
  animation-iteration-count: infinite;
` 

export const TypingHeader = function ({ title, className }: TypingProps) {
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
  }, [title]);

  return (
    <section className={`m-8 z-10 ${className ? className: ""}`}>
      <pre className='inline whitespace-pre-wrap' >{typeWords}</pre>
      <Blink className='inline'>_</Blink>
    </section>
  );
};
