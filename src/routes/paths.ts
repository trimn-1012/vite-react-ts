type TRoutes = {
  path: string;
  build: (...args: unknown[]) => string;
};

const url = {
  login: '/login',
  home: '/',
  users: '/users',
};

type Routes = Record<keyof typeof url, TRoutes>;

const routes: Routes = {
  login: {
    path: `${url.login}`,
    build: () => `${url.login}`,
  },
  home: {
    path: `${url.home}`,
    build: () => `${url.home}`,
  },
  users: {
    path: `${url.users}`,
    build: () => `${url.users}`,
  },
};

export default routes;
