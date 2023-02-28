import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [dogs, setDog] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setImageUrl(data.message);
    };
    fetchImage();

    const dogs = JSON.parse(localStorage.getItem('dogs')) || [];
    console.log('Dogs:', dogs);
    if (dogs.length > 0) {
      const dog = dogs.find((d) => d.id === id);
      console.log('dog:', dog);
      setDog(dog);
    }


  }, [id]);

  return (
    <div>
      <Link to="/">Tillbaka</Link>
      <img src={imageUrl} alt="DogsPhoto" />
      <p>Name: {dogs && dogs.name}</p>
      <p>Nick: {dogs && dogs.nick}</p>
      <p>Age: {dogs && dogs.age}</p>
      <p>Bio: {dogs && dogs.description}</p>
      <p>Vänner:</p>
      <ul>
        {dogs && dogs.friends.map((friend) => (
          <li key={friend}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
