import { useEffect, useState } from 'react';
import md5 from 'md5';
import markdownIt from 'markdown-it';
import { useLocation, useNavigate } from 'react-router-dom';
import './markdown.css';
import { TypingHeader } from '../../components/animate/typingHeader';

interface PostState {
  title: string;
  createdAt: string;
}

interface PostMsg {
  author: string;
  body: string;
  createdAt: Date;
  title: string;
}

export const Post = function () {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost]: [PostMsg, Function] = useState({
    title: '',
    author: '',
    body: '',
    createdAt: new Date(),
  });
  const [body, setBody]: [string, Function] = useState('');
  // 当获取不到state的时候，重定向回去
  useEffect(function () {
    const localtionState = location.state as PostState;
    if (localtionState === null) {
      navigate('/blog', { replace: true });
      return;
    }
    const title = localtionState.title;
    const createdAt = localtionState.createdAt;
    const fileMd5 = md5(title + createdAt);
    fetch(`/posts/${fileMd5}.json`)
      .then(async (resp) => {
        return await resp.json();
      })
      .then((respJson) => {
        setPost({
          author: respJson.author,
          body: respJson.body,
          createdAt: new Date(respJson.created_at),
          title: respJson.title,
        });
        const md = new markdownIt();
        setBody(md.render(respJson.body));
      });
  }, []);
  return (
    <main className="w-full p-8 md:w-3/4 xl:w-1/2 md:m-auto md:my-20">
      <section className="max-w-full">
        <TypingHeader
          className={'text-xl text-center'}
          title={post.title}
        ></TypingHeader>
      </section>
      <hr className="my-8" />
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: body }}
      ></article>
    </main>
  );
};

export default Post;
