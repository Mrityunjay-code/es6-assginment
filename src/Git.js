import React, { useState, useCallback } from 'react';
import './git.css'
import axios from 'axios';

const Git = () => {
  const [text, setText] = useState('');
  const [da, setData] = useState([]);

  const changeText = (event) => {
    setText(event.target.value);
  };

  const getMovie = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://api.github.com/users/${text}`);
      const data = response.data;
      setData([data]); 
    } catch (err) {
      console.log(err.message);
      setData([]); 
    }
  }, [text]);

  return (
    <div>
      <h1>GitHub user</h1>
      <form onSubmit={getMovie}>
        <input
          className='n1' type='search' placeholder='Search' aria-label='Search' value={text} onChange={changeText} />
        <button className='n2' type='submit'>
          Search
        </button>
        <br />
        <br />
      </form>

      {da.map((user) => (
        <div key={user.id}>
          <img src={user.avatar_url} alt={`${user.login} avatar`} />
          <h1>User: {user.login}</h1>
          <h3>Name: {user.name}</h3>
          <p>Profile URL: {user.html_url}</p>
          <p>Follower: {user.followers_url}</p>
          <p>{user.starred_url}</p>
        </div>
      ))}
    </div>
  );
};

export default Git;
