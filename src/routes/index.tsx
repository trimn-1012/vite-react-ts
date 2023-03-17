import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Users from '../pages/Users';
import Layout from '../templates/Layout';
import routes from './paths';
import RequireAuth from './RequireAuth';

const RouteController = () => {
  return (
    <Layout>
      <Routes>
        <Route path={routes.home.path} element={<Home />} />
        <Route path={routes.login.path} element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path={routes.users.path} element={<Users />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default RouteController;
