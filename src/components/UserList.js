import React from "react";
import UserCard from "./UserCard";

function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map((user, i) => (
        <div key={user.id} style={{ animationDelay: `${i * 50}ms` }}>
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
}

export default UserList;