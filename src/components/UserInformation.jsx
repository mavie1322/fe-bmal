import React, { useEffect, useState } from "react";
import { getUserByUsername } from "../utils/api";

function UserInformation({ username }) {
  const [user, setUser] = useState({ username: "", name: "", avatar_url: "" });

  useEffect(() => {
    getUserByUsername(username).then((commentData) => {
      setUser(commentData);
    });
  }, [username]);

  return (
    <div className='userProfile_data'>
      <h3>{user.username}</h3>
      <img src={user.avatar_url} alt={`${user.username} avatar`} />
      <p>Name : {user.name}</p>
    </div>
  );
}

export default UserInformation;
