import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Profile.css';
import GoBackButton from '../GoBack.jsx';

const Profile = () => {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [dog, setDog] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setImageUrl(data.message);
    };
    fetchImage();

    const dogs = JSON.parse(localStorage.getItem('dogs')) || [];
    const friendships = JSON.parse(localStorage.getItem('friendships')) || [];
    if (dogs.length > 0) {
      const dog = dogs.find((d) => d.id === id);
      if (dog) {
        setDog(dog);
        const dogFriendships = friendships.filter((friendship) => (
          friendship.dog1Id === id || friendship.dog2Id === id
        ));
        const dogFriends = dogs.filter((d) => (
          dogFriendships.some((friendship) => friendship.dog1Id === d.id || friendship.dog2Id === d.id)
        ));
        setFriends(dogFriends.filter((friend) => friend.id !== id));
      }
    }
  }, [id]);

  return (
    <>
      <GoBackButton />
      <div className='profileDiv'>
        <img src={imageUrl} alt="DogsPhoto" />
        <div className='name'>
          <p>Name: {dog && dog.name}</p>
          <Link to={`/edit/${id}`}> Edit </Link>
        </div>
        <p>Nick: {dog && dog.nick}</p>
        <p>Age: {dog && dog.age}</p>
        <p>Bio: {dog && dog.description}</p>
        <div>
          <label htmlFor="present">Present:</label>
          <input

            type="checkbox"
            id="present"
            name="present"
            defaultChecked={dog && dog.isInYard}
            disabled
          />
        </div>
        {friends.length > 0 && (
          <div>
            <p>Friends:</p>
            {friends.map((friend) => (
              <div key={friend.id}>
                <Link to={`/profile/${friend.id}`}>
                  {friend.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
