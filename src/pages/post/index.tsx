import { useEffect, useState } from 'react';
import { marked } from 'marked';
import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate } from 'react-router-dom';
import "./post.css"

interface PostState {
  id: number;
}

interface PostMsg {
  author: string;
  body: string[];
  createdAt: Date;
  title: string;
}

export const Post = function () {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost]: [PostMsg, Function] = useState({
    title: '',
    author: '',
    body: [],
    createdAt: new Date(),
  });
  const [body, setBody]: [string, Function] = useState('');
  const localtionState = location.state as PostState;
  const id = localtionState.id;
  // 当获取不到state的时候，重定向回去
  if (!id) {
    navigate('/blog');
  }
  useEffect(function () {
    fetch(`/src/assets/posts/${id}.json`)
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
        setBody(marked.parse(respJson.body.join()));
      });
  }, []);
  return (
    <main className="whitespace-pre-wrap w-full p-8 md:w-1/2 md:m-auto md:my-20">
      <section className="max-w-full">
        <div
          className="text-center text-2xl md:text-5xl"
        >{post.title}</div>
        <hr className="my-8"/>
        <article>
          <ReactMarkdown>
          {body}
          </ReactMarkdown>
        </article>
        // <article className="markdown-body" dangerouslySetInnerHTML={{ __html: body }}></article>
      </section>
    </main>
  );
};
