import React from 'react'
import { Card as MuiCard, CardContent, CardHeader, CardActions, Typography } from '@mui/material'
import type { CardContentProps, CardHeaderProps, CardActionsProps } from '@mui/material'

// Определяем наши собственные пропсы, не расширяя MuiCardProps
export interface CardProps {
  // Базовые пропсы из MUI Card
  className?: string
  style?: React.CSSProperties
  elevation?: number
  // Наши кастомные пропсы
  title?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  contentProps?: CardContentProps
  headerProps?: CardHeaderProps
  footerProps?: CardActionsProps
}

export const Card: React.FC<CardProps> = ({
  title,
  content,
  footer,
  elevation = 1,
  children,
  className,
  style,
  contentProps,
  headerProps,
  footerProps,
  ...props
}) => {
  return (
    <MuiCard 
      elevation={elevation} 
      className={className}
      style={style}
      {...props}
    >
      {title && (
        <CardHeader
          title={
            typeof title === 'string' ? (
              <Typography variant="h6" component="div">
                {title}
              </Typography>
            ) : (
              title
            )
          }
          {...headerProps}
        />
      )}
      {(content || children) && (
        <CardContent {...contentProps}>
          {content || children}
        </CardContent>
      )}
      {footer && <CardActions {...footerProps}>{footer}</CardActions>}
    </MuiCard>
  )
}

export default Card 