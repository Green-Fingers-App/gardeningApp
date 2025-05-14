import { LoginData, SignUpData, Validator } from "@/types/authtypes";

export const loginValidator: Validator<LoginData> = {
  validateAll: (loginData) => {
    const errors: Partial<Record<keyof typeof loginData, string>> = {};
    const { email, password } = loginData;

    const emailError = validateEmail(email);
    if (emailError) {
      errors.email = emailError;
    }

    const passwordError = loginPasswordValidation(password);
    if (passwordError) {
      errors.password = passwordError;
    }
    return errors;
  },
};

export const signUpValidator: Validator<SignUpData> = {
  validateAll: (signUpData) => {
    const errors: Partial<Record<keyof typeof signUpData, string>> = {};
    const { username, email, password, confirmPassword } = signUpData;

    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }

    const usernameError = validateUsername(username);
    if (usernameError) {
      errors.username = usernameError;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      errors.email = emailError;
    }

    const confirmPasswordError = validateConfirmPassword(
      confirmPassword,
      password
    );
    if (confirmPasswordError) {
      errors.confirmPassword = confirmPasswordError;
    }

    return errors;
  },
  validateField: (name, value, values) => {
    switch (name) {
      case "username":
        return validateUsername(value);
      case "password":
        return validatePassword(value);
      case "email":
        return validateEmail(value);
      case "confirmPassword":
        if (!values) {
          return null;
        }
        return validateConfirmPassword(value, values.password);
      default:
        return null;
    }
  },
};

const validatePassword = (password: string): string | null => {
  const trimmed = password.trim();

  if (!trimmed) {
    return "Password is required.";
  }
  if (trimmed.length < 8) {
    return "Password must have at least 8 characters.";
  }
  if (!/[A-Z]/.test(trimmed)) {
    return "Password must at least contain 1 uppercase letter.";
  }
  if (!/[a-z]/.test(trimmed)) {
    return "Password must at least contain 1 lowercase letter.";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimmed)) {
    return "Password must at least contain one special character.";
  }

  return null;
};

const validateUsername = (username: string) => {
  const trimmed = username.trim();

  if (!trimmed) {
    return "Username is required.";
  }
  if (trimmed.length < 3 || trimmed.length > 20) {
    return "Username must be between 3 to 20 characters";
  }
  if (!/^[a-zA-Z][a-zA-Z0-9._-]*$/.test(trimmed)) {
    return "Username must start with a letter and contain only letters, numbers, '.', '-', or '_'.";
  }
  if (/[_\-.]{2,}/.test(trimmed)) {
    return "Username cannot contain consecutive special characters.";
  }
  if (/[_\-.]$/.test(trimmed)) {
    return "Username cannot end with a special character.";
  }
  return null;
};

const validateEmail = (emailInput: string): string | null => {
  const trimmed = emailInput.trim();
  if (!trimmed) {
    return "Email is Required";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Invalid Email";
  }

  return null;
};

const loginPasswordValidation = (passwordInput: string): string | null => {
  const trimmed = passwordInput.trim();
  if (!trimmed) {
    return "Password is required";
  }
  return null;
};

const validateConfirmPassword = (
  confirmPassword: string,
  password: string
): string | null => {
  const trimmed = confirmPassword.trim();

  if (!trimmed) {
    return "Please confirm your password";
  }

  if (trimmed !== password) {
    return "Passwords do not match";
  }
  return null;
};
