import { Typography, Grid, Card, CardContent, Box } from '@mui/material'
import { Button } from '@ultrathink/shared-ui'

export default function Dashboard() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Button variant="primary" sx={{ mr: 2 }}>Primary Button</Button>
        <Button variant="secondary" sx={{ mr: 2 }}>Secondary Button</Button>
        <Button variant="text">Text Button</Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Products
              </Typography>
              <Typography variant="h5">0</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h5">0</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h5">0</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Revenue
              </Typography>
              <Typography variant="h5">$0</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
} 