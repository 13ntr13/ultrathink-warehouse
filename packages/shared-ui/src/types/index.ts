// Common types for all components
export type Variant = 'primary' | 'secondary' | 'text'
export type Size = 'small' | 'medium' | 'large'
export type Color = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

// Input specific types
export type InputVariant = 'outlined' | 'filled' | 'standard'
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'

// Card specific types
export type Elevation = 0 | 1 | 2 | 3 | 4

// Button specific types
export interface ButtonProps {
  variant?: Variant
  size?: Size
  color?: Color
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

// Input specific types
export interface InputProps {
  variant?: InputVariant
  type?: InputType
  label?: string
  placeholder?: string
  error?: boolean
  helperText?: string
  disabled?: boolean
  fullWidth?: boolean
  value?: string
  onChange?: (value: string) => void
}

// Card specific types
export interface CardProps {
  elevation?: Elevation
  children?: React.ReactNode
} 