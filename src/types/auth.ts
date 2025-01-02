export interface SignupForm {
    name: string;
    department: string;
    grade: string;
    email: string;
    password: string;
    passwordConfirm: string;
    verificationCode: string;
  }
  
  export interface SignupResponse {
    success: boolean;
    message: string;
  }