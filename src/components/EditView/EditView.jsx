import React, { useState, useEffect } from 'react';
import './EditView.css';
import FriendSelector from '../FriendSelector/FriendSelector.jsx';
import { useParams } from 'react-router-dom';
import GoBackButton from '../GoBack.jsx';
import { v4 as uuidv4 } from "uuid";

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
            const friendships = JSON.parse(localStorage.getItem('friendships')) || [];
            const friendIds = friendships.reduce((ids, friendship) => {
                if (friendship.dog1Id === id) {
                    ids.push(friendship.dog2Id);
                } else if (friendship.dog2Id === id) {
                    ids.push(friendship.dog1Id);
                }
                return ids;
            }, []);
            const friends = data.filter((friend) => friendIds.includes(friend.id) && friend.id !== id);
            setSelectedFriends(friends);
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

    function handleRemoveFriend(friend, dogId) {
        const newSelectedFriends = selectedFriends.filter((selectedFriend) => selectedFriend.id !== friend.id);
        const friendships = JSON.parse(localStorage.getItem('friendships')) || [];

        // Find the index of the friendship to delete
        const friendshipIndex = friendships.findIndex((friendship) => (
            (friendship.dog1Id === friend.id && friendship.dog2Id === dogId) ||
            (friendship.dog1Id === dogId && friendship.dog2Id === friend.id)
        ));

        if (friendshipIndex !== -1) {
            // Remove the friendship from the array
            friendships.splice(friendshipIndex, 1);
        }

        localStorage.setItem('friendships', JSON.stringify(friendships));

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

        const friendships = JSON.parse(localStorage.getItem('friendships')) || [];
        selectedFriends.forEach((friend) => {
            const existingFriendship = friendships.find((friendship) => (
                (friendship.dog1Id === friend.id && friendship.dog2Id === updatedDog.id) ||
                (friendship.dog1Id === updatedDog.id && friendship.dog2Id === friend.id)
            ));

            if (!existingFriendship) {
                // Add new friendship to friendships array
                const newFriendship = {
                    id: uuidv4(),
                    dog1Id: friend.id,
                    dog2Id: updatedDog.id,
                };
                friendships.push(newFriendship);
            }
        });

        localStorage.setItem('friendships', JSON.stringify(friendships));
        localStorage.setItem('dogs', JSON.stringify(updatedData));

        setShowSuccessMessage(true);
    };

    if (!dogData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='EditDiv'>
            <h2>Edit {dogData.name}'s profile</h2>
            <GoBackButton />
            {showSuccessMessage && <div className='successMessage'>Dog updated successfully!</div>}
            <form onSubmit={handleSubmit}>
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
                                    <button onClick={() => handleRemoveFriend(friend, id)}>Remove</button>
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