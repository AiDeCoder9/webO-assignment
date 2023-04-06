import routes from '@/routes/routes';
import { sanitizeURL } from '@/utils/sanitize-url';
import classNames from 'classnames';

import { useLocation, useResolvedPath, Link, useMatch, useParams } from 'react-router-dom';
export function BreadCrumbItem(props: BreadcrumbProps) {
  const { path, name } = props;
  const location = useLocation();
  const resolvedPath = useResolvedPath(path);
  const isActive = location.pathname === resolvedPath.pathname;

  return (
    <li className={classNames('breadcrumb-item', { active: isActive })} aria-current="page">
      {isActive ? name : <Link to={resolvedPath.pathname}>{name}</Link>}
    </li>
  );
}

export default function BreadCrumb() {
  const location = useLocation();
  const params = useParams();
  const match = useMatch({ path: '/:path/*' });
  const paths = match?.params.path?.split('/').filter((path) => path !== '');
  const currentRoute = routes[0].children?.find((route) => {
    if (route.path && params) {
      return sanitizeURL(route.path, params) === location.pathname;
    } else if (route.path) {
      return route.path === location.pathname;
    }
  });
  const currentPageName = currentRoute ? currentRoute.name : '';

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <BreadCrumbItem path={'/'} name={'Home'} />
        {paths &&
          paths.map((path, i) => {
            const breadcrumbPath = `/${paths.slice(0, i + 1).join('/')}`;
            return <BreadCrumbItem key={path} path={breadcrumbPath} name={currentPageName} />;
          })}
      </ol>
    </nav>
  );
}
