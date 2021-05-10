import React from 'react';

export default function UserIcons({user}) {
  return (
    <div className="user_flags" style={{margin: 0}}>
      {(user.privileges.verified) ? <span className="flag material-icons">check_circle</span> : ""}
      {(user.plus.active) ? <span className="flag material-icons">favorite</span> : ""}
    </div>
  )
}