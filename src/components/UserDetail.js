import React from "react";

function UserDetail({ user }) {
  return (
    <div>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Phone:</b> {user.phone}</p>
      <p><b>Website:</b> {user.website}</p>
    </div>
  );
}

export default UserDetail;