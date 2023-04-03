import { Spinner } from '@/components/feedback';
import { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

export interface RouteProperties {
  path?: string;
  element: React.ComponentType<any>;
  children?: RouteProperties[];
  index?: boolean;
}

interface RenderRouteProps extends RouteProperties {
  redirectPath?: RouteRedirectProps;
}
type RouteRedirectProps = ({ from: string; to: string } | null)[];

const RenderRoute = (props: RenderRouteProps) => {
  const { element: Component } = props;
  return <Component {...props} />;
};

const PrivateRoute = (props: {
  redirectPath?: RouteRedirectProps;
  appRoutes: RouteProperties[];
  animate?: boolean;
}) => {
  const location = useLocation();
  const { appRoutes, redirectPath } = props;
  const routes: RouteProperties[] = [];

  const getFlatApplicationRoute = (route: RouteProperties) => {
    if (route.children) {
      route.children.map((item) => getFlatApplicationRoute(item));
    } else {
      routes.push(route);
    }
  };

  appRoutes.map((route) => getFlatApplicationRoute(route));

  const getNestedRoutes = (route?: RouteProperties) => {
    if (route) {
      return (
        <Route
          path={route.path}
          key={route.path}
          element={
            <Suspense fallback={<Spinner />}>
              <RenderRoute redirectPath={redirectPath} {...route} />
            </Suspense>
          }>
          {route?.children?.map((child) => getNestedRoutes(child))}
        </Route>
      );
    }
  };

  return (
    <Routes location={location}>
      {appRoutes?.map((route) => getNestedRoutes(route))}
      {redirectPath?.length &&
        redirectPath.map(
          (path, index) =>
            path && (
              <Route
                key={index}
                path={path.from}
                element={
                  <Navigate
                    to={path.to}
                    key={index}
                    state={{
                      from: path.from
                    }}
                    replace
                  />
                }
              />
            )
        )}
    </Routes>
  );
};

export default PrivateRoute;
