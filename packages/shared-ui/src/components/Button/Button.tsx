import React from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'text' | 'contained' | 'outlined' | 'primary' | 'secondary'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  disabled = false,
  onClick,
  ...props
}) => {
  // Map custom variants to MUI variants
  const muiVariant = variant === 'primary' ? 'contained' : 
                    variant === 'secondary' ? 'outlined' : 
                    variant

  // Map custom variants to MUI colors
  const muiColor = variant === 'primary' ? 'primary' :
                  variant === 'secondary' ? 'secondary' :
                  color

  return (
    <MuiButton
      variant={muiVariant}
      color={muiColor}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </MuiButton>
  )
}

export default Button 