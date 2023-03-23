import useSWR from 'swr';
import { useDispatch } from 'react-redux';

import { fetchUsers, keyUsers } from '@/apis/getUsers';
import RouteController from '@/routes';
import { updateUsers } from '@/appSlice';

function App() {
  const dispatch = useDispatch();
  useSWR(keyUsers, fetchUsers, {
    revalidateOnFocus: false,
    onSuccess: data => {
      dispatch(updateUsers(data.users));
    },
  });

  return <RouteController />;
}

export default App;
