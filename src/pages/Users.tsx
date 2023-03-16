import { useSelector } from 'react-redux';

import { usersSelector } from '../globalSlice';

const Users = () => {
  const users = useSelector(usersSelector);

  if (!users) return <div>Empty</div>;

  return (
    <div>
      {users.map(user => (
        <p key={user.id}>{user.lastName}</p>
      ))}
    </div>
  );
};

export default Users;
