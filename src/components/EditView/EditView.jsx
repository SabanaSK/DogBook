import React, { useState, useEffect } from 'react';
import './EditView.css';
import FriendSelector from '../FriendSelector/FriendSelector.jsx';
import { useParams } from 'react-router-dom';
import GoBackButton from '../GoBack.jsx';

const EditDogForm = () => {
    const [name, setName] = useState('');
    const [nick, setNick] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [isInYard, setIsInYard] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [dogData, setDogData] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('dogs')) || [];
        const dog = data.find((dog) => dog.id === id);
        if (dog) {
            setDogData(dog);
            setName(dog.name);
            setNick(dog.nick);
            setAge(dog.age);
            setDescription(dog.description);
            setIsInYard(dog.isInYard);
            setSelectedFriends(dog.friends);
        }
    }, [id]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleNickChange = (event) => {
        setNick(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleIsInYardChange = (event) => {
        setIsInYard(event.target.checked);
    };

    function handleFriendSelect(friends) {
        setSelectedFriends([...selectedFriends, ...friends]);
    }

    function handleRemoveFriend(friend) {
        const newSelectedFriends = selectedFriends.filter((selectedFriend) => selectedFriend.id !== friend.id);
        setSelectedFriends(newSelectedFriends);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedDog = {
            id: id,
            name: name,
            nick: nick,
            age: age,
            description: description,
            friends: selectedFriends,
            isInYard: isInYard,
        };

        const data = JSON.parse(localStorage.getItem('dogs')) || [];
        const updatedData = data.map((dog) => (dog.id === id ? updatedDog : dog));

        localStorage.setItem('dogs', JSON.stringify(updatedData));

        setShowSuccessMessage(true);
    };

    if (!dogData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='EditDiv'>
            <GoBackButton />
            <form onSubmit={handleSubmit}>
                <h2>Edit {dogData.name}'s profile</h2>
                {showSuccessMessage && <div className='successMessage'>Dog updated successfully!</div>}
                <label>
                    Name:
                    <input type='text' value={name} onChange={handleNameChange} required />
                </label>
                <label>
                    Present:
                    <input type='checkbox' checked={isInYard} onChange={handleIsInYardChange} />
                </label>
                <br />
                <label>
                    Nick:
                    <input type='text' value={nick} onChange={handleNickChange} required />
                </label>
                <br />
                <label>
                    Age:
                    <input type='number' value={age} onChange={handleAgeChange} min='1' max='100' required />
                </label>
                <br />
                <label>
                    Bio:
                    <textarea value={description} onChange={handleDescriptionChange} />
                </label>
                <br />
                {selectedFriends.length > 0 && (
                    <div>
                        <p>Selected friends:</p>
                        <div className="selected-friends">
                            {selectedFriends.map((friend) => (
                                <div key={friend.id}>
                                    {friend.name}
                                    <button className='removeButton' onClick={() => handleRemoveFriend(friend)}>Remove</button>
                                    <br />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <br />
                <FriendSelector onFriendSelect={handleFriendSelect} selectedFriends={selectedFriends} currentDogId={id} />
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditDogForm;