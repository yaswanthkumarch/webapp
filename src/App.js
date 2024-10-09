import React, { useEffect, useState } from 'react';

function App() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = 'https://sampleapp-b2bdaxfrf9dmfyes.southindia-01.azurewebsites.net/api/users';
      
      try {
        const response = await fetch(baseUrl);
        console.log(response);
        if (!response.ok) throw new Error('Failed to fetch users data');

        // Get the response as JSON
        const data = await response.json();
        setUsersData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Users Data</h1>
      {usersData.length > 0 ? (
        <ul>
          {usersData.map((user, index) => (
            <li key={index}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Message:</strong> {user.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default App;
