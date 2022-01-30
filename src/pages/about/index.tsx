import {ReactNode} from 'react';

const Tag = function ({ colorClass, children}: { colorClass: string, children: ReactNode}) {
  return <span className={colorClass + " p-1 mx-2 rounded-md"}>
    {children}
  </span>
}

export const About = function () {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full px-8 py-8 text-lg text-left">
      <div className="md:w-1/2">
        {/* TODO: 头像 */}
        <p className="font-bold">PH</p>
        <section className="mb-4">
        <p className="font-normal">个人简介</p>
        <hr></hr>
        <p>
          <span className="font-bold">学历：</span>现大三在读
        </p>
        <p>
          <span className="font-bold">邮箱：</span>15917977183@163.com
        </p>
        <p>
          <span className="font-bold">github地址：</span>
          <a href="https://github.com/PHSix" className="text-lg text-red-600">
            GITHUB
          </a>
        </p>
        <p>
          <span className="font-bold">标签：</span>
          <Tag colorClass='bg-red-300'>Linux</Tag>
          <Tag colorClass='bg-pink-300'>Javascript</Tag>
          <Tag colorClass='bg-purple-300'>Frontend</Tag>
        </p>
        </section>
        <section className="mb-4">
        <p className="font-normal">个人项目</p>
        <hr></hr>
        </section>
      </div>
    </main>
  );
};

export default About;
