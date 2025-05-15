import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  Receipt as ReceiptIcon,
  Download as DownloadIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

// Mock data
const mockInvoices = [
  {
    id: 'INV-001',
    date: '2024-02-01',
    amount: 299.99,
    status: 'Paid',
    dueDate: '2024-02-15',
    items: [
      { name: 'Basic Plan', quantity: 1, price: 299.99 },
    ],
  },
  {
    id: 'INV-002',
    date: '2024-01-01',
    amount: 299.99,
    status: 'Paid',
    dueDate: '2024-01-15',
    items: [
      { name: 'Basic Plan', quantity: 1, price: 299.99 },
    ],
  },
  {
    id: 'INV-003',
    date: '2024-03-01',
    amount: 299.99,
    status: 'Pending',
    dueDate: '2024-03-15',
    items: [
      { name: 'Basic Plan', quantity: 1, price: 299.99 },
    ],
  },
];

const mockPaymentMethods = [
  {
    id: 1,
    type: 'Credit Card',
    last4: '4242',
    expiry: '12/25',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Credit Card',
    last4: '5555',
    expiry: '09/24',
    isDefault: false,
  },
];

const billingPlans = [
  {
    name: 'Basic',
    price: 299.99,
    features: [
      'Up to 5 users',
      'Basic analytics',
      '24/7 support',
      '1GB storage',
    ],
  },
  {
    name: 'Pro',
    price: 599.99,
    features: [
      'Up to 20 users',
      'Advanced analytics',
      'Priority support',
      '10GB storage',
      'Custom integrations',
    ],
  },
  {
    name: 'Enterprise',
    price: 999.99,
    features: [
      'Unlimited users',
      'Enterprise analytics',
      'Dedicated support',
      'Unlimited storage',
      'Custom integrations',
      'API access',
      'SLA guarantee',
    ],
  },
];

export default function Billing() {
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleOpenPaymentDialog = () => {
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
    setSelectedPlan(null);
    setPaymentMethod('');
  };

  const handleAddPaymentMethod = () => {
    // TODO: Implement add payment method logic
    handleClosePaymentDialog();
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // TODO: Implement download invoice logic
    console.log(`Downloading invoice ${invoiceId}...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Billing & Subscription
      </Typography>

      <Grid container spacing={3}>
        {/* Current Plan */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Current Plan"
              action={
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleOpenPaymentDialog}
                >
                  Change Plan
                </Button>
              }
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Basic Plan
              </Typography>
              <Typography variant="h4" color="primary" gutterBottom>
                $299.99
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="text.secondary"
                >
                  /month
                </Typography>
              </Typography>
              <List>
                {billingPlans[0].features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Methods */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Payment Methods"
              action={
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleOpenPaymentDialog}
                >
                  Add Payment Method
                </Button>
              }
            />
            <CardContent>
              <List>
                {mockPaymentMethods.map((method) => (
                  <ListItem
                    key={method.id}
                    secondaryAction={
                      <Box>
                        {method.isDefault && (
                          <Chip
                            label="Default"
                            size="small"
                            color="primary"
                            sx={{ mr: 1 }}
                          />
                        )}
                        <IconButton edge="end">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemIcon>
                      <CreditCardIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${method.type} ending in ${method.last4}`}
                      secondary={`Expires ${method.expiry}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Billing History */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Billing History" />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Invoice</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Chip
                            label={invoice.status}
                            color={getStatusColor(invoice.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Payment Method Dialog */}
      <Dialog
        open={openPaymentDialog}
        onClose={handleClosePaymentDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Payment Method</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  placeholder="MM/YY"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVC"
                  placeholder="123"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  placeholder="John Doe"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Set as default payment method"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDialog}>Cancel</Button>
          <Button onClick={handleAddPaymentMethod} variant="contained">
            Add Payment Method
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 