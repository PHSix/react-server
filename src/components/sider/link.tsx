// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Prop {
  to?: string;
  tag: string;
  focus: boolean;
}

export const SLink = function ({ to, tag, focus }: Prop) {
  const navigate = useNavigate();
  const push = function (target: string | undefined) {
    if (target === undefined) return;
    else navigate(target);
  };
  return (
    <div
      className={focus ? 'sider-link-box-cur' : 'sider-link-box'}
      style={{ userSelect: 'none' }}
      onClick={() => push(to)}
    >
      {tag}
      {
        // <Link to={to}>{tag}</Link>
      }
    </div>
  );
};
