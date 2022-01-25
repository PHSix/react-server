import { RouteObject } from 'react-router-dom';
import { About } from '../pages/about';
import { Blog } from '../pages/blog';
import { Home } from '../pages/home';
import { Post } from '../pages/post';
import Tree from '../pages/tree';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/blog',
    element: <Blog />,
  },
  {
    path: '/blog/post',
    element: <Post />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/tree',
    element: <Tree />,
  },
];

export default routes;
