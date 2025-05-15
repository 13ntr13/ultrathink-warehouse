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
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Switch,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

// Mock data
const mockRoles = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full access to all features and settings',
    permissions: ['all'],
    users: 3,
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Access to manage products, orders, and users',
    permissions: ['products', 'orders', 'users'],
    users: 5,
  },
  {
    id: 3,
    name: 'Editor',
    description: 'Can edit products and view orders',
    permissions: ['products', 'orders'],
    users: 8,
  },
  {
    id: 4,
    name: 'Viewer',
    description: 'Read-only access to products and orders',
    permissions: ['products', 'orders'],
    users: 12,
  },
];

const allPermissions = [
  { id: 'dashboard', label: 'Dashboard Access' },
  { id: 'products', label: 'Product Management' },
  { id: 'orders', label: 'Order Management' },
  { id: 'users', label: 'User Management' },
  { id: 'reports', label: 'Reports Access' },
  { id: 'settings', label: 'Settings Access' },
  { id: 'billing', label: 'Billing Access' },
  { id: 'notifications', label: 'Notifications Management' },
];

export default function AccessRoles() {
  const [roles, setRoles] = useState(mockRoles);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');

  const handleOpenDialog = (role?: any) => {
    if (role) {
      setSelectedRole(role);
      setRoleName(role.name);
      setRoleDescription(role.description);
      setSelectedPermissions(role.permissions);
    } else {
      setSelectedRole(null);
      setRoleName('');
      setRoleDescription('');
      setSelectedPermissions([]);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRole(null);
    setRoleName('');
    setRoleDescription('');
    setSelectedPermissions([]);
  };

  const handleSave = () => {
    if (selectedRole) {
      // Update existing role
      setRoles(
        roles.map((role) =>
          role.id === selectedRole.id
            ? {
                ...role,
                name: roleName,
                description: roleDescription,
                permissions: selectedPermissions,
              }
            : role
        )
      );
    } else {
      // Add new role
      const newRole = {
        id: roles.length + 1,
        name: roleName,
        description: roleDescription,
        permissions: selectedPermissions,
        users: 0,
      };
      setRoles([...roles, newRole]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSelectAll = () => {
    setSelectedPermissions(
      selectedPermissions.length === allPermissions.length
        ? []
        : allPermissions.map((p) => p.id)
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Access Roles
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Role
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Users</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SecurityIcon color="primary" />
                    {role.name}
                  </Box>
                </TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {role.permissions.map((permission) => (
                      <Chip
                        key={permission}
                        label={permission}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{role.users}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(role)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(role.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedRole ? 'Edit Role' : 'Add New Role'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role Name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Permissions
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          selectedPermissions.length === allPermissions.length
                        }
                        indeterminate={
                          selectedPermissions.length > 0 &&
                          selectedPermissions.length < allPermissions.length
                        }
                        onChange={handleSelectAll}
                      />
                    }
                    label="Select All"
                  />
                </Box>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {allPermissions.map((permission) => (
                    <ListItem key={permission.id}>
                      <ListItemIcon>
                        <Checkbox
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => handlePermissionToggle(permission.id)}
                        />
                      </ListItemIcon>
                      <ListItemText primary={permission.label} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!roleName || !roleDescription}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 