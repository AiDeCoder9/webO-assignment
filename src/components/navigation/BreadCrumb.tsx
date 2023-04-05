import routes from '@/routes/routes';
import classNames from 'classnames';
import React from 'react';
import { useLocation, useResolvedPath, Link, useParams } from 'react-router-dom';
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
  console.log(location, params);
  const paths = location.pathname.split('/').filter((path) => path !== '');
  console.log(paths, 'paths');

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <BreadCrumbItem path={'/'} name={'Home'} />
        {paths.map((path, i) => {
          console.log(path, 'path check');
          const breadcrumbPath = `/${paths.slice(0, i + 1).join('/')}`;
          console.log(breadcrumbPath, 'kkkb');
          const route = routes[0].children?.find((r) => r.path === breadcrumbPath);

          return route && route.path ? (
            <BreadCrumbItem key={route.path} path={route.path} name={route.name} />
          ) : null;
        })}
      </ol>
    </nav>
  );
}
