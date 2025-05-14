import { useState } from 'react'
import { Box, Typography, Paper, Grid } from '@mui/material'
import { Input, Button, Card } from '@ultrathink/shared-ui'

export default function SharedComponents() {
  const [inputValue, setInputValue] = useState('')

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shared Components Demo
      </Typography>

      <Grid container spacing={3}>
        {/* React Components */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              React Components
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Input
              </Typography>
              <Input
                label="Name"
                placeholder="Enter your name"
                value={inputValue}
                onChange={setInputValue}
                type="text"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Button
              </Typography>
              <Button
                onClick={() => alert('Button clicked!')}
                variant="contained"
                color="primary"
              >
                Click Me
              </Button>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Card
              </Typography>
              <Card
                title="Card Title"
                content="This is a card component"
                footer={
                  <Button variant="text" color="primary">
                    Learn More
                  </Button>
                }
              />
            </Box>
          </Paper>
        </Grid>

        {/* Vue Components */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Vue Components (Coming Soon)
            </Typography>
            <Typography color="text.secondary">
              Vue components will be available through a Vue adapter in the future.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
} 