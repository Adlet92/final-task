export const validatePassword = (value: string, repeatPassword: string): string[] => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
  
    const errors = [];
  
    if (!value || value.length < 6) {
      errors.push("Password must be at least 6 characters long");
    } 
    if (!lowercaseRegex.test(value)) {
      errors.push("Password must contain a lowercase letter");
    }
    if (!uppercaseRegex.test(value)) {
      errors.push("Password must contain an uppercase letter");
    }
  
    if (!numberRegex.test(value)) {
      errors.push("Password must contain a number");
    }
  
    if (value !== repeatPassword) {
      errors.push("Passwords do not match");
    }
  
    return errors;
  };
  
export const validateEmail = (email: string): string[] => {
    const errors: string[] = [];
    if (!email.trim()) {
      errors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Invalid email format");
    }
    return errors;
  };
  
  export const validateForm = (email: string, password: string, repeatPassword: string): string[] => {
    const emailErrors = validateEmail(email);
    const passwordErrors = validatePassword(password, repeatPassword);
    return [...emailErrors, ...passwordErrors];
  };
  