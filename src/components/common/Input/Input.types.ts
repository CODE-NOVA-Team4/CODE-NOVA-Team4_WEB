export interface InputProps {
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    fullWidth?: boolean;
    label?: string;
  }