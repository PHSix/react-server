import React, { ReactNode, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import LoadingAmimate from '../components/animate/loading';
// 如果有export default的时候的写法
const Home = React.lazy(() => import('../pages/home'));
// 没有的时候的写法
const About = React.lazy(() =>
  import('../pages/about').then((module) => ({ default: module.About }))
);
const Blog = React.lazy(() =>
  import('../pages/blog').then((module) => ({ default: module.Blog }))
);
const Post = React.lazy(() =>
  import('../pages/post').then((module) => ({ default: module.Post }))
);
const Tree = React.lazy(() =>
  import('../pages/tree').then((module) => ({ default: module.Tree }))
);

const createLazyLoading = function (child: ReactNode) {
  return <Suspense fallback={<LoadingAmimate />}>{child}</Suspense>;
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: createLazyLoading(<Home />),
  },
  {
    path: '/blog',
    element: createLazyLoading(<Blog />),
  },
  {
    path: '/blog/post',
    element: createLazyLoading(<Post />),
  },
  {
    path: '/about',
    element: createLazyLoading(<About />),
  },
  {
    path: '/tree',
    element: createLazyLoading(<Tree />),
  },
];

export default routes;
