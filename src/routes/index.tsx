import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Users from '../pages/Users';
import User from '../pages/User';
import Layout from '../templates/Layout';
import routes from './paths';
import GuardRoute from './GuardRoute';
import AuthRoute from './AuthRoute';

const RouteController = () => {
  return (
    <Layout>
      <Routes>
        <Route path={routes.home.path} element={<Home />} />
        <Route element={<AuthRoute />}>
          <Route path={routes.login.path} element={<Login />} />
        </Route>
        <Route element={<GuardRoute />}>
          <Route path={routes.users.path}>
            <Route index element={<Users />} />
            <Route path={routes.users.pathWithParams} element={<User />} />
          </Route>
        </Route>
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Layout>
  );
};

export default RouteController;