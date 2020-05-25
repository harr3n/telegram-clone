import React from "react";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../../api/queries";
import SignInSignUp from "../SignInSignUp";
import Loading from "../Loading"

const IsSignedIn = props => {
  const { data, loading, error } = useQuery(ME_QUERY);
  
  if (loading) return <Loading />
  if(error || !data.me) return <SignInSignUp />
  return props.children
};

export default IsSignedIn