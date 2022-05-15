import React, { useState } from 'react';

export interface InputType {
  [key: string]: any
}

const useCustomForm = (callback: Function, initialInput: InputType) => {

  const [inputs, setInputs] = useState(initialInput);

  const handleSubmit = () => {
    callback();
  }

  const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    event.persist();
    const { name, value } = event.currentTarget;
    setInputs(prevState => ({
      ...prevState, [name]: value
    }));
  }

  const handleResetForm = () => {
    setInputs(initialInput);
  }

  const setEditValues = (values: InputType) => {
    setInputs(values);
  }

  return {
    handleSubmit,
    handleInputChange,
    handleResetForm,
    setEditValues,
    inputs
  };
}

export default useCustomForm;