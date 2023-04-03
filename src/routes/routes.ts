import Layout from '@/screen/Layout';
import { lazy } from 'react';
const Dashboard = lazy(() => import('@/screen/Dashboard/Dashboard'));
const Employee = lazy(() => import('@/screen/Employee/Employee'));

import { RouteProperties } from './index';

export const root = '/';

export const routePaths = {
  dashboard: root,
  employee: root + 'employees',
  team: root + 'team'
};

const routes: RouteProperties[] = [
  {
    path: root,
    element: Layout,
    children: [
      {
        path: routePaths.dashboard,
        element: Dashboard
      },
      {
        path: routePaths.employee,
        element: Employee
      }
    ]
  }
];
export default routes;
