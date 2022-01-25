import { userConfig } from '../../config/user';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SLink } from './link';
import { Avatar } from './avatar';
import './sider.css';

interface Route {
  to: string;
  tag: string;
  key: number;
  focus: boolean;
}

export const Sider = function () {
  const [routes, setRoutes]: [Route[], Function] = useState([
    {
      key: 1,
      to: '/blog/posts',
      tag: '列表',
      focus: false,
    },
    {
      key: 2,
      to: '/blog/about',
      tag: '关于',
      focus: true,
    },
  ]);
  const location = useLocation();
  useEffect(() => {
    setRoutes(
      routes.map((r) => {
        if (r.to === location.pathname) return { ...r, focus: true };
        else return { ...r, focus: false };
      })
    );
  }, [location.pathname]);
  return (
    <section className="sider-main">
      <div className="sider-user-info">
        <Avatar />
        <span
          style={{
            fontSize: '2rem',
          }}
        >
          {userConfig.name}
        </span>
        <span
          style={{
            fontSize: '1.2rem',
            marginTop: '1rem',
            marginBottom: '3rem',
          }}
        >
          {userConfig.email}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {routes.map((k) => {
          return (
            <SLink to={k.to} tag={k.tag} key={k.key} focus={k.focus}></SLink>
          );
        })}
        {location.pathname.match("/post/") ? <SLink to={""} tag={"文章"} focus={true}></SLink> : ""}
      </div>
    </section>
  );
};

export default Sider;
