import React from "react";
import styled from "styled-components";
import { useHistory, NavLink } from "react-router";


const Sidebar = () => {
  return (
    <NavLink activeClassName="active" to={`/add-user`}>
      +
    </NavLink>
  );
};

export default Sidebar;
