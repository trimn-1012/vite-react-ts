import { useNavigate } from 'react-router-dom';

import routes from '@/routes/paths';
import { useUsersStore } from '@/stores/users/use-users-store';

const Users = () => {
  const { users } = useUsersStore();
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
