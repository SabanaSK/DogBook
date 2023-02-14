import React from 'react';
import Profile from './component/profile';


const App = () => {
  const dogProfile = {
    name: 'Betton',
    nick: 'Buddy',
    age: 3,
    description: 'A friendly golden retriever who loves to play fetch',
    friends: ['Fido', 'Rufus', 'Daisy'],
  };
  return (
    <div>
      <h1>Hunddagis Adminverktyg</h1>
      <Profile profile={dogProfile} />
    </div>
  );
};

export default App;
