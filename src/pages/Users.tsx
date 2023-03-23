import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { usersSelector } from '@/appSlice';
import routes from '@/routes/paths';

const Users = () => {
  const users = useSelector(usersSelector);
  const navigate = useNavigate();

  if (!users) return <div>Empty</div>;

  return (
    <div>
      {users.map(user => (
        <p key={user.id} onClick={() => navigate(routes.users.build(user.id))}>
          {user.lastName}
        </p>
      ))}
    </div>
  );
};

export default Users;
