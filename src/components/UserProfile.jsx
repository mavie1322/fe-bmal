import React from 'react';
import { useParams } from 'react-router-dom';

export function UserProfile() {
  const params = useParams()
  console.log(params)


  return <div>User Profile</div>;
}

