import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { ME_QUERY } from "../../api/queries";

const Settings = ({ setDarkMode, darkMode }) => {
  const { data, loading, error } = useQuery(ME_QUERY);

  return (
    <>
      {/* <div>{data && data.me.name}</div> */}
      <label for="darkmode">
        <input name="darkmode" id="darkmode" type="checkbox" value={darkMode} checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        Dark
      </label>
    </>
  );
};

export default Settings;
