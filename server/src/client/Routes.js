import React from 'react';
import HomePage from './components/pages/HomePage';
import UsersListPage from './components/pages/UserListPage';
import AdminListPage from './components/pages/AdminListPage';
import NotFoundPage from './components/pages/NotFoundPage';
import App from './App';

// we have ro define our routes like so in order to be able to do SSR routing
// this array is consumed by react-router-config.

// we have to use this routing technique because we have to know what data
// the components will need before we render the route.
export default [
  {
    component: App.component,
    loadData: App.loadData,
    routes: [
      {
        component: HomePage.component,
        loadData: HomePage.loadData,
        path: '/',
        exact: true,
      },
      {
        component: AdminListPage.component,
        loadData: AdminListPage.loadData,
        path: '/admins',
        exact: true,
      },
      {
        component: UsersListPage.component,
        loadData: UsersListPage.loadData,
        path: '/users',
      },
      {
        // 404 page
        component: NotFoundPage.component,
      }
    ]
  },
];

