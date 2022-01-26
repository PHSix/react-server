import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { TypingHeader } from '../../components/animate/typingHeader';

interface Entry {
  title: string;
  id: number;
  createdAt: string;
}

interface RespJson {
  entries: Entry[];
}

interface GotoCallback {
  (e: Entry): void;
}

const entryConponent = function (entry: Entry, gotoCb: GotoCallback) {
  const time = new Date(entry.createdAt);
  return (
    <div
      className="px-2 py-4 cursor-pointer md:px-8 duration-300 hover:bg-slate-50"
      onClick={() => gotoCb(entry)}
    >
      <p className="text-sm md:text-xl">{entry.title}</p>
      <p className="text-xs text-right text-gray-500">{`时间：${time.getFullYear() +  1}年${time.getMonth() + 1}月${time.getDay() + 1}日`}</p>
    </div>
  );
};

const fetchAnimate = function () {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <ReactLoading type="bars" color="#000000"></ReactLoading>
    </section>
  );
};

export const Blog = function () {
  // TODO: 还有问题
  // 防止异步回调产生的内存泄漏
  let pined = true;
  const [fetchStatus, setFetchStatus] = useState(false);
  const [entries, setEntries]: [Entry[], Function] = useState([]);
  useEffect(function () {
    fetch('/list.json').then((resp) => {
      resp.json().then((respJson: RespJson) => {
        if (pined) {
          setFetchStatus(true);
          setEntries(respJson.entries.reverse());
        }
      });
    });
  }, []);
  useEffect(()=> {
  document.title = "我的个人博客";
  }, [])
  const navigate = useNavigate();
  const gotoPost = function (e: Entry) {
    navigate('/blog/post', {
      state: {
        title: e.title,
        createdAt : e.createdAt,
      },
    });
  };
  return (
    <main className="w-full mx-8 md:w-3/4 xl:w-1/2 md:mx-auto md:mt-32">
      <TypingHeader title="PH的个人博客(学习笔记)" className='text-xl text-center'></TypingHeader>
      <section>
      {fetchStatus
        ? entries.map((entry, idx) => {
            return (
              <div key={idx}>
                <hr key={idx + 1000} />
                {entryConponent(entry, gotoPost)}
              </div>
            );
          })
        : fetchAnimate()}
      </section>
    </main>
  );
};
