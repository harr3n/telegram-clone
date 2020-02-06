import React from "react";
import SmallUserBadge from "../../styles/UserBadge";

const Avatar = ({ user, size }) => {
  const colors = ["#BF616A", "#D08770", "#EBCB8B", "#A3BE8C", "#B48EAD"];

  const getColor = name =>
    colors[name.toLocaleLowerCase().charCodeAt(0) % colors.length];

  return (
      <SmallUserBadge className="avatar" size={size} color={getColor(user.name)}>
        {user.name.substring(0, 1)}
      </SmallUserBadge>
  );
};

export default Avatar;
