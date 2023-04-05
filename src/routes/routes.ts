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
    name: '',
    children: [
      {
        path: routePaths.dashboard,
        element: Dashboard,
        name: 'Dashboard'
      },
      {
        path: routePaths.employeeUpdate,
        element: Employee,
        name: 'Edit Employee'
      },
      {
        path: routePaths.employee,
        element: Employee,
        name: 'Add Employee'
      },
      {
        path: routePaths.team,
        element: Team,
        name: 'Add Team'
      },
      {
        path: routePaths.teamUpdate,
        element: Team,
        name: 'Edit Team'
      }
    ]
  }
];

export default routes;
