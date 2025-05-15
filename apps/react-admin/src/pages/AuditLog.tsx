import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

// Mock data
const mockLogs = [
  {
    id: 1,
    timestamp: '2024-02-20 10:30:45',
    user: 'John Doe',
    action: 'Login',
    details: 'User logged in from IP 192.168.1.1',
    status: 'Success',
    ip: '192.168.1.1',
  },
  {
    id: 2,
    timestamp: '2024-02-20 10:35:12',
    user: 'Jane Smith',
    action: 'Update Product',
    details: 'Updated product "Widget X" price from $99 to $89',
    status: 'Success',
    ip: '192.168.1.2',
  },
  {
    id: 3,
    timestamp: '2024-02-20 10:40:23',
    user: 'Bob Johnson',
    action: 'Delete Order',
    details: 'Deleted order #12345',
    status: 'Failed',
    ip: '192.168.1.3',
  },
  {
    id: 4,
    timestamp: '2024-02-20 10:45:56',
    user: 'Alice Brown',
    action: 'Create User',
    details: 'Created new user account for "Charlie Wilson"',
    status: 'Success',
    ip: '192.168.1.4',
  },
  {
    id: 5,
    timestamp: '2024-02-20 10:50:34',
    user: 'John Doe',
    action: 'Update Settings',
    details: 'Updated system settings',
    status: 'Success',
    ip: '192.168.1.1',
  },
];

const actionTypes = [
  'All Actions',
  'Login',
  'Logout',
  'Create',
  'Update',
  'Delete',
  'Settings',
];

const statusTypes = ['All Statuses', 'Success', 'Failed', 'Warning'];

export default function AuditLog() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('All Actions');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleActionChange = (event: any) => {
    setSelectedAction(event.target.value);
    setPage(0);
  };

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
    setPage(0);
  };

  const handleDateChange = (field: 'start' | 'end') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateRange({
      ...dateRange,
      [field]: event.target.value,
    });
    setPage(0);
  };

  const handleExport = () => {
    // TODO: Implement export logic
    console.log('Exporting audit log...');
  };

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip.includes(searchQuery);

    const matchesAction =
      selectedAction === 'All Actions' || log.action === selectedAction;

    const matchesStatus =
      selectedStatus === 'All Statuses' || log.status === selectedStatus;

    const matchesDateRange =
      (!dateRange.start || log.timestamp >= dateRange.start) &&
      (!dateRange.end || log.timestamp <= dateRange.end);

    return matchesSearch && matchesAction && matchesStatus && matchesDateRange;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Audit Log
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Export Log
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search logs..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Action Type</InputLabel>
              <Select
                value={selectedAction}
                label="Action Type"
                onChange={handleActionChange}
              >
                {actionTypes.map((action) => (
                  <MenuItem key={action} value={action}>
                    {action}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={handleStatusChange}
              >
                {statusTypes.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Start Date"
              type="datetime-local"
              value={dateRange.start}
              onChange={handleDateChange('start')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="End Date"
              type="datetime-local"
              value={dateRange.end}
              onChange={handleDateChange('end')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell>
                    <Chip
                      label={log.status}
                      color={
                        log.status === 'Success'
                          ? 'success'
                          : log.status === 'Failed'
                          ? 'error'
                          : 'warning'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{log.ip}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <ViewIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredLogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
} 