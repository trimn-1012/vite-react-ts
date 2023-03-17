type TRoutes = {
  path: string;
  pathWithParams?: string;
  build: (...args: any[]) => string;
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
    pathWithParams: `${url.users}/:id`,
    build: (id?: number) => `${url.users}${id ? `/${id}` : ''}`,
  },
};

export default routes;
