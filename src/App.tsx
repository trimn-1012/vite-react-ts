import useSWR from 'swr';

import './App.css';
import { IUsersResponse } from './apis/getUsers/types';
import { fetchUsers, keyUsers } from './apis/getUsers';

function App() {
  const { data, mutate } = useSWR<IUsersResponse>(keyUsers, fetchUsers, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });

  const getUsers = async () => {
    await mutate();
  };

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={getUsers}>Get users</button>
        {data && data.users.map(user => <p key={user.id}>{user.lastName}</p>)}
      </div>
    </div>
  );
}

export default App;
