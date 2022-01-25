import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AnimateBackground } from '../../components/animate/animateBackground';
import { TypingHeader } from '../../components/animate/typingHeader';

interface Label {
  labelName: string;
  labelTo: string;
  labelColorClass: string;
  idx: number;
  fromColorClass: string;
  toColorClass: string;
}
interface LabelProps {
  hiddenValue: boolean;
}

const Label = styled.div<LabelProps>`
  width: 130%;
  position: relative;
  left: calc(${(props) => (props.hiddenValue ? 120 : 0)}vw + 7%);
  transition-duration: 1s;
  transition-property: all;
`;

/**
 * 动画label组件
 */
const animateLabel = function (label: Label) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  setTimeout(() => {
    setHidden(false);
  }, label.idx * 250);
  const labelColorClass = `${label.fromColorClass} ${label.toColorClass} ${label.labelColorClass}`;
  // const labelColorClass = `to-red-300 from-purple-300 ${label.labelColorClass}`;
  // const labelColorClass = `bg-red-500`;
  return (
    <Label
      hiddenValue={hidden}
      key={label.idx}
      onClick={() => {
        navigate(label.labelTo);
      }}
      className={`text-white text-right shadown-3xl rounded-md cursor-pointer my-8 ${labelColorClass}`}
    >
      <p className="sm:text-sm md:text-base mr-8 my-4">{label.labelName}</p>
    </Label>
  );
};

export const Home = function () {
  const labels: Label[] = [
    {
      labelName: '博客',
      labelTo: '/blog',
      idx: 1,
      labelColorClass: 'bg-gradient-to-l',
      toColorClass: 'to-red-300',
      fromColorClass: 'from-purple-300',
    },
    {
      labelName: '关于我',
      labelTo: '/about',
      idx: 2,
      labelColorClass: 'bg-gradient-to-l',
      toColorClass: 'to-green-300',
      fromColorClass: 'from-yellow-300',
    },
    {
      labelName: '文件站',
      labelTo: '/tree',
      idx: 3,
      labelColorClass: 'bg-gradient-to-l',
      toColorClass: 'to-blue-300',
      fromColorClass: 'from-gray-300',
    },
  ];
  return (
    <main
      className="min-h-screen w-full overflow-x-hidden flex-col flex justify-center"
      style={{
        backgroundImage: 'url(/src/assets/background.jpg)',
        backgroundSize: 'cover',
      }}
    >
      <AnimateBackground></AnimateBackground>
      <TypingHeader title={'Welcome to my website.'}></TypingHeader>
      <section className="w-3/4 md:w-1/5 min-h-1/2 flex flex-col justify-center z-10">
        <div className="h-1/2 w-full flex flex-col justify-around items-center">
          {labels.map((label) => {
            return animateLabel(label);
          })}
        </div>
      </section>
    </main>
  );
};
