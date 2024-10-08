// import axios from 'axios';
import { useState } from 'react';
import { Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserTabs from './UserTabs';
import UserInfo from './UserInfo';
import UserPrivacy from './UserPrivacy';
import TopBar from './TopBar';
import UserControls, { GlobalStateProvider } from './UserControls';

// User context
interface User {
  id: number;
  google_id: string;
  userName: string;
  email: string;
  avatar: string;
  bio: string;
  city: string;
  state: string;
}

// Main component
const UserPrivateProfile = ({
  fetchUserData,
  user,
  setUser,
  onLogout,
  BUCKET_NAME,
}) => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('info');

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <GlobalStateProvider>
      <TopBar route={'Settings'} />

      <Grid id='lvl-one'>
        <UserTabs
          handleLogOut={() => UserControls.handleLogOut(onLogout, navigate)}
          setCurrentView={setCurrentView}
        />

        <Grid
          // id='lvl-two'
          // className='u-pages'
        >
          {currentView === 'info' && (
            <UserInfo
              BUCKET_NAME={BUCKET_NAME}
              fetchUserData={fetchUserData}
              setUser={setUser}
              user={user}
            />
          )}
          {currentView === 'help' && (
            <UserPrivacy user={user} fetchUserData={fetchUserData} />
          )}
        </Grid>
      </Grid>
    </GlobalStateProvider>
  );
};

export default UserPrivateProfile;
