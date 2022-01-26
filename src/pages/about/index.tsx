import {} from 'react';

export const About = function () {
  return (
    <main className="flex flex-col h-full w-full justify-center text-left px-8 text-lg items-center py-8">
      <section className="md:w-1/2">
        {/* TODO: 头像 */}
        <p className="font-bold">PH</p>
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
          <span className="font-bold">标签：</span>Linux, JavaScript, FrontDesk
        </p>
        <p className="font-normal">个人项目</p>
        <hr></hr>
      </section>
    </main>
  );
};
