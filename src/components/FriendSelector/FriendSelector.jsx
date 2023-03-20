import React, { useState, useEffect } from 'react';

function FriendSelector({ onFriendSelect, selectedFriends, currentDogId }) {
    const [dogFriends, setDogFriends] = useState([]);

    useEffect(() => {
        const dogFriendsData = localStorage.getItem('dogs');
        const parsedDogFriends = JSON.parse(dogFriendsData);
        const availableDogFriends = parsedDogFriends.filter((friend) => !selectedFriends.some((selectedFriend) => selectedFriend.id === friend.id) && friend.id !== currentDogId);
        setDogFriends(availableDogFriends);

    }, [selectedFriends, currentDogId]);


    function handleFriendSelect(event) {
        const selectedFriendId = Array.from(event.target.selectedOptions, (option) => option.value);
        const newSelectedFriends = dogFriends.filter((friend) => selectedFriendId.includes(friend.id));
        removeDogFriendsDataList(newSelectedFriends);
        document.getElementById('friend-select').selectedIndex = 0;
        onFriendSelect(newSelectedFriends);
    }

    function removeDogFriendsDataList(newSelectedFriends) {
        setDogFriends(dogFriends.filter((friend) => !newSelectedFriends.some((selectedFriend) => selectedFriend.id === friend.id)));
    }

    return (
        <div>
            <label htmlFor="friend-select">Choose a friend:</label>
            <select id="friend-select" onChange={handleFriendSelect}>
                <option value="">-- Select a friend --</option>
                {dogFriends.map((dogfriend) => (
                    <option key={dogfriend.id} value={dogfriend.id}>
                        {dogfriend.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FriendSelector;
