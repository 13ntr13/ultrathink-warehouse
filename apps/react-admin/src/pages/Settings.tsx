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
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';

// Mock data
const mockNotifications = [
  {
    id: 1,
    type: 'Email',
    name: 'Order Updates',
    description: 'Receive email notifications for order status changes',
    enabled: true,
  },
  {
    id: 2,
    type: 'Email',
    name: 'Inventory Alerts',
    description: 'Get notified when inventory levels are low',
    enabled: true,
  },
  {
    id: 3,
    type: 'Email',
    name: 'System Updates',
    description: 'Receive notifications about system maintenance and updates',
    enabled: false,
  },
];

const mockSecuritySettings = {
  twoFactorAuth: false,
  sessionTimeout: 30,
  passwordExpiry: 90,
  loginAttempts: 5,
};

const mockPreferences = {
  language: 'en',
  theme: 'light',
  timezone: 'UTC',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
};

export default function Settings() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [security, setSecurity] = useState(mockSecuritySettings);
  const [preferences, setPreferences] = useState(mockPreferences);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'notification' | 'security' | 'preference'>('notification');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const handleOpenDialog = (type: 'notification' | 'security' | 'preference') => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveSettings = () => {
    // TODO: Implement save settings logic
    setSnackbar({
      open: true,
      message: 'Settings saved successfully',
      severity: 'success',
    });
  };

  const handleNotificationToggle = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  const handleSecurityChange = (field: string, value: any) => {
    setSecurity({ ...security, [field]: value });
  };

  const handlePreferenceChange = (field: string, value: any) => {
    setPreferences({ ...preferences, [field]: value });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Notifications"
              action={
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('notification')}
                >
                  Add Notification
                </Button>
              }
            />
            <CardContent>
              <List>
                {notifications.map((notification) => (
                  <ListItem key={notification.id}>
                    <ListItemText
                      primary={notification.name}
                      secondary={notification.description}
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel
                        control={
                          <Switch
                            edge="end"
                            checked={notification.enabled}
                            onChange={() => handleNotificationToggle(notification.id)}
                          />
                        }
                        label=""
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Security"
              action={
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleOpenDialog('security')}
                >
                  Edit Security
                </Button>
              }
            />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Two-Factor Authentication"
                    secondary="Add an extra layer of security to your account"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={security.twoFactorAuth}
                      onChange={(e) =>
                        handleSecurityChange('twoFactorAuth', e.target.checked)
                      }
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Session Timeout"
                    secondary={`${security.sessionTimeout} minutes`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Password Expiry"
                    secondary={`${security.passwordExpiry} days`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Login Attempts"
                    secondary={`${security.loginAttempts} attempts before lockout`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Preferences */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Preferences"
              action={
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleOpenDialog('preference')}
                >
                  Edit Preferences
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={preferences.language}
                      label="Language"
                      onChange={(e) =>
                        handlePreferenceChange('language', e.target.value)
                      }
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Theme</InputLabel>
                    <Select
                      value={preferences.theme}
                      label="Theme"
                      onChange={(e) =>
                        handlePreferenceChange('theme', e.target.value)
                      }
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="system">System</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={preferences.timezone}
                      label="Timezone"
                      onChange={(e) =>
                        handlePreferenceChange('timezone', e.target.value)
                      }
                    >
                      <MenuItem value="UTC">UTC</MenuItem>
                      <MenuItem value="EST">EST</MenuItem>
                      <MenuItem value="PST">PST</MenuItem>
                      <MenuItem value="GMT">GMT</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Date Format</InputLabel>
                    <Select
                      value={preferences.dateFormat}
                      label="Date Format"
                      onChange={(e) =>
                        handlePreferenceChange('dateFormat', e.target.value)
                      }
                    >
                      <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                      <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                      <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Time Format</InputLabel>
                    <Select
                      value={preferences.timeFormat}
                      label="Time Format"
                      onChange={(e) =>
                        handlePreferenceChange('timeFormat', e.target.value)
                      }
                    >
                      <MenuItem value="12h">12-hour</MenuItem>
                      <MenuItem value="24h">24-hour</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
      </Box>

      {/* Settings Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogType === 'notification'
            ? 'Add Notification'
            : dialogType === 'security'
            ? 'Edit Security Settings'
            : 'Edit Preferences'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {dialogType === 'notification' && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notification Name"
                    placeholder="Enter notification name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    placeholder="Enter notification description"
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable notification"
                  />
                </Grid>
              </Grid>
            )}

            {dialogType === 'security' && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Session Timeout (minutes)"
                    value={security.sessionTimeout}
                    onChange={(e) =>
                      handleSecurityChange('sessionTimeout', parseInt(e.target.value))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Password Expiry (days)"
                    value={security.passwordExpiry}
                    onChange={(e) =>
                      handleSecurityChange('passwordExpiry', parseInt(e.target.value))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Login Attempts"
                    value={security.loginAttempts}
                    onChange={(e) =>
                      handleSecurityChange('loginAttempts', parseInt(e.target.value))
                    }
                  />
                </Grid>
              </Grid>
            )}

            {dialogType === 'preference' && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={preferences.language}
                      label="Language"
                      onChange={(e) =>
                        handlePreferenceChange('language', e.target.value)
                      }
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Theme</InputLabel>
                    <Select
                      value={preferences.theme}
                      label="Theme"
                      onChange={(e) =>
                        handlePreferenceChange('theme', e.target.value)
                      }
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="system">System</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 