import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Upload as UploadIcon,
  Download as DownloadIcon,
  History as HistoryIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';

// Mock data
const importHistory = [
  {
    id: 1,
    type: 'Import',
    fileName: 'products.csv',
    status: 'completed',
    date: '2024-02-20 10:30:45',
    records: 150,
  },
  {
    id: 2,
    type: 'Export',
    fileName: 'orders_2024_02.xlsx',
    status: 'completed',
    date: '2024-02-19 15:45:12',
    records: 75,
  },
  {
    id: 3,
    type: 'Import',
    fileName: 'customers.csv',
    status: 'failed',
    date: '2024-02-18 09:15:30',
    records: 0,
  },
];

export default function ImportExport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'failed':
        return <ErrorIcon color="error" />;
      default:
        return <PendingIcon color="warning" />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Import / Export
      </Typography>

      <Grid container spacing={3}>
        {/* Import Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Import Data" />
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <input
                  accept=".csv,.xlsx,.xls"
                  style={{ display: 'none' }}
                  id="import-file"
                  type="file"
                  onChange={handleFileSelect}
                />
                <label htmlFor="import-file">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<UploadIcon />}
                    fullWidth
                  >
                    Select File
                  </Button>
                </label>
                {selectedFile && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {selectedFile.name}
                  </Typography>
                )}
              </Box>
              <Button
                variant="outlined"
                fullWidth
                disabled={!selectedFile}
                startIcon={<UploadIcon />}
              >
                Start Import
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Export Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Export Data" />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DownloadIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Export Products"
                    secondary="Download all products in CSV format"
                  />
                  <Button variant="outlined" size="small">
                    Export
                  </Button>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <DownloadIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Export Orders"
                    secondary="Download all orders in Excel format"
                  />
                  <Button variant="outlined" size="small">
                    Export
                  </Button>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <DownloadIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Export Customers"
                    secondary="Download customer data in CSV format"
                  />
                  <Button variant="outlined" size="small">
                    Export
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* History Section */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Import/Export History"
              action={
                <Button
                  variant="outlined"
                  startIcon={<HistoryIcon />}
                >
                  View All History
                </Button>
              }
            />
            <CardContent>
              <List>
                {importHistory.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemIcon>
                      {item.type === 'Import' ? <UploadIcon /> : <DownloadIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.fileName}
                      secondary={`${item.type} - ${item.date} - ${item.records} records`}
                    />
                    <Chip
                      icon={getStatusIcon(item.status)}
                      label={item.status}
                      color={
                        item.status === 'completed'
                          ? 'success'
                          : item.status === 'failed'
                          ? 'error'
                          : 'warning'
                      }
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 