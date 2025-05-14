import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'

export interface InputProps extends Omit<TextFieldProps, 'variant' | 'type' | 'onChange'> {
  onChange?: (value: string) => void
  type?: 'text' | 'email' | 'password' | 'number'
  variant?: 'outlined' | 'filled' | 'standard'
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  variant = 'outlined',
  error,
  helperText,
  disabled,
  placeholder,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value)
    }
  }

  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={handleChange}
      type={type}
      variant={variant}
      error={error}
      helperText={helperText}
      disabled={disabled}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default Input 