import { useState } from "react";

const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (field: any, value: any) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetForm,
  };
};

export default useForm;