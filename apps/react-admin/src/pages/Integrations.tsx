import { Box, Typography, Grid, Card, CardContent, CardHeader, Button, Chip, IconButton } from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

// Mock data
const integrations = [
  {
    id: 1,
    name: 'Shopify',
    status: 'active',
    description: 'Connect your Shopify store to sync products and orders',
    lastSync: '2024-02-20 10:30:45',
  },
  {
    id: 2,
    name: 'WooCommerce',
    status: 'inactive',
    description: 'Integrate with WooCommerce to manage your online store',
    lastSync: '2024-02-19 15:45:12',
  },
  {
    id: 3,
    name: 'QuickBooks',
    status: 'active',
    description: 'Sync your financial data with QuickBooks',
    lastSync: '2024-02-20 09:15:30',
  },
];

export default function Integrations() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Integrations
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Integration
        </Button>
      </Box>

      <Grid container spacing={3}>
        {integrations.map((integration) => (
          <Grid item xs={12} md={6} lg={4} key={integration.id}>
            <Card>
              <CardHeader
                action={
                  <Box>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {integration.name}
                    <Chip
                      size="small"
                      icon={integration.status === 'active' ? <CheckCircleIcon /> : <ErrorIcon />}
                      label={integration.status}
                      color={integration.status === 'active' ? 'success' : 'error'}
                    />
                  </Box>
                }
              />
              <CardContent>
                <Typography color="text.secondary" paragraph>
                  {integration.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last sync: {integration.lastSync}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 