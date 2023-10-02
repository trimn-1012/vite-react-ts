import useSWR from 'swr';

import { fetchUsers, keyUsers } from '@/apis/getUsers';
import RouteController from '@/routes';

import { useUsersStore } from './stores/users/use-users-store';

function App() {
  const { updateUsers } = useUsersStore();
  useSWR(keyUsers, fetchUsers, {
    revalidateOnFocus: false,
    onSuccess: data => {
      updateUsers(data.users);
    },
  });

  return <RouteController />;
}

export default App;
