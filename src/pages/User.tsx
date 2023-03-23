import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

import { fetchUser, keyUser } from '@/apis/getUser';

const User = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data } = useSWR(id ? `${keyUser}/${id}` : null, fetchUser, {
    revalidateOnFocus: false,
  });

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <p>{data.lastName}</p>
      <p>{data.age}</p>
    </div>
  );
};

export default User;
