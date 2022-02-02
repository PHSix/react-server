import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface FileInfo {
  filename: string;
  isdir: boolean;
}

const Entry = function ({
  fileInfo,
  clickCb,
}: {
  fileInfo: FileInfo;
  clickCb: (filename: string) => void;
}) {
  return (
    <>
      <hr />
      <div
        className="w-full py-2 px-2 cursor-pointer"
        onClick={() => {
          if (fileInfo.isdir === true) clickCb(fileInfo.filename);
          else alert('功能正在规划中...');
        }}
      >
        <span>{fileInfo.filename}</span>
      </div>
    </>
  );
};

export const Tree = function () {
  // hooks
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dirEntries, setDirEntries]: [FileInfo[], Function] = useState([]);
  const fetchEntries = async (path: string) => {
    const resp = await fetch(`/api/files?path=${path}`, {
      method: 'GET',
    }).catch((err) => {
      alert('文件站后端还在开发中...');
      navigate('/blog', { replace: true });
    });
    if (!resp) {
      return [];
    } else {
      console.log(resp.headers.get('Content-Type'));
      if (resp.status === 400) {
        return [];
      }
      const dir = ((await resp.json()) as any).children;
      return dir;
    }
  };
  // mounted时检查
  useEffect(() => {
    if (searchParams.get('path')) {
    } else {
      setSearchParams({ path: '/' }, { replace: true });
    }
  }, []);
  useEffect(() => {
    fetchEntries(searchParams.get('path') as string).then((dir) => {
      setDirEntries(dir);
    });
  }, [searchParams]);

  const gotoPath = (filename: string) => {
    const curPath = searchParams.get('path') as string;
    setSearchParams({
      path:
        curPath + (curPath[curPath?.length - 1] === '/' ? '' : '/') + filename,
    });
  };

  return (
    <main className="min-h-full py-16 w-full flex flex-col items-center justify-center">
      <section className="md:w-3/5 xl:w-1/2 min-h-full">
        <div className="h-full bg-gray-50 w-full rounded-xl border-1 border-gray-500 shadow-xl">
          {/* 路径 */}
          <div className="px-4 py-3 bg-gray-100 rounded-t-xl">
            {searchParams.get('path')}
          </div>
          {dirEntries.map((entry, idx) => {
            return (
              <Entry fileInfo={entry} key={idx} clickCb={gotoPath}></Entry>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Tree;
