// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/users.json");
        if (!response.ok) {
          throw new Error("Failed to fetch users data");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <p className="text-xl font-bold">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.gender}</p>
          <p className="text-gray-600">{user.domain}</p>
          <p className="text-gray-600">
            Available: {user.available ? "Yes" : "No"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
