import React from 'react';
// userSelector gives as acces to a specific state(we have user,genreOrCategory) check folder features
import { useDispatch, useSelector } from 'react-redux';

import { userSelector } from '../../features/auth';

const Profile = () => {
  // get the user stored inside the state using useSelector hook
  const { user } = useSelector((state) => state.user);

  console.log(user);
  return (
    <div />
  );
};

export default Profile;
