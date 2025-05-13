import { Validator } from "@/types/authtypes";
import { useState } from "react";

const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validate?: Validator<T>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = <K extends keyof T>(name: K, value: T[K]) => {
    setValues((prev) => {
      const updated = { ...prev, [name]: value };

      if (validate?.validateField && typeof value === "string") {
        const fieldError = validate.validateField(name, value, updated);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: fieldError ?? undefined,
        }));
      }

      return updated;
    });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    resetForm,
    setValues,
    setErrors,
  };
};

export default useForm;
