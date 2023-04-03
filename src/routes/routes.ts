import Layout from '@/screen/Layout';
import { lazy } from 'react';
const Dashboard = lazy(() => import('@/screen/Dashboard/Dashboard'));
const Employee = lazy(() => import('@/screen/Employee/Employee'));
const Team = lazy(() => import('@/screen/Team/Team'));

import { RouteProperties } from './index';

export const root = '/';

export const routePaths = {
  dashboard: root,
  employee: root + 'employees',
  employeeUpdate: root + 'employees/:id',
  team: root + 'team',
  teamUpdate: root + 'team/:id'
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
      },
      {
        path: routePaths.employeeUpdate,
        element: Employee
      },
      {
        path: routePaths.team,
        element: Team
      },
      {
        path: routePaths.teamUpdate,
        element: Team
      }
    ]
  }
];
export default routes;
