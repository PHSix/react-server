import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

interface Entry {
  fliename?: string;
  title: string;
  id: number;
  label: string[];
  created_at: string;
}

interface RespJson {
  entries: Entry;
}

interface GotoCallback {
  (e: Entry): void;
}

const entryConponent = function (entry: Entry, gotoCb: GotoCallback) {
  const time = new Date(entry.created_at);
  return (
    <div className="cursor-pointer py-4 px-8 duration-300 hover:bg-slate-50" onClick={() => gotoCb(entry)}>
      <p className="text-xl">{entry.title}</p>
      <p className="text-sm text-right text-gray-500">{`${time.getFullYear()}年${time.getMonth()}月${time.getDay()}日`}</p>
    </div>
  );
};

const fetchAnimate = function () {
  return (
    <section className="h-full w-full flex flex-col justify-center items-center">
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
    fetch('/src/assets/entries.json').then((resp) => {
      resp.json().then((respJson: RespJson) => {
        if (pined) {
          setFetchStatus(true);
          setEntries(respJson.entries);
        }
      });
    });
  }, []);
  const navigate = useNavigate();
  const gotoPost = function (e: Entry) {
    navigate("/blog/post" ,  {
      state: {
        id: e.id,
      }
    });
  };
  return (
    <main className="w-full m-8 md:w-1/2 md:mx-auto md:mt-64">
      {fetchStatus
        ? entries.map((entry, idx) => {
            if (idx === 0) {
              return (
                <div key={entry.id}>{entryConponent(entry, gotoPost)}</div>
              );
            }
            return (
              <div key={entry.id}>
                <hr key={entry.id + 1000} />
                {entryConponent(entry, gotoPost)}
              </div>
            );
          })
        : fetchAnimate()}
    </main>
  );
};
