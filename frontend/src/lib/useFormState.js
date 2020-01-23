import { useState } from "react";

const useFormState = initialState => {
  const [state, setState] = useState(initialState);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => setState(initialState);

  return {
    state,
    handleChange,
    resetForm
  };
};

export default useFormState;
