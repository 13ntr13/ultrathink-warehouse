import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Switch,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  DragIndicator as DragIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

// Mock data
const menuItems = [
  {
    id: 1,
    name: 'Dashboard',
    icon: 'dashboard',
    visible: true,
    order: 1,
  },
  {
    id: 2,
    name: 'Products & Orders',
    icon: 'shopping_cart',
    visible: true,
    order: 2,
  },
  {
    id: 3,
    name: 'Users',
    icon: 'people',
    visible: true,
    order: 3,
  },
  {
    id: 4,
    name: 'Reports',
    icon: 'assessment',
    visible: true,
    order: 4,
  },
  {
    id: 5,
    name: 'Settings',
    icon: 'settings',
    visible: true,
    order: 5,
  },
];

export default function SidebarCustomization() {
  const [items, setItems] = useState(menuItems);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleToggleVisibility = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const handleOpenDialog = (item?: any) => {
    setSelectedItem(item || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const handleSave = () => {
    // TODO: Implement save logic
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Настройка боковой панели
      </Typography>
      <Typography color="text.secondary">
        Здесь вы можете настроить меню и элементы боковой панели.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Sidebar Customization
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Menu Item
        </Button>
      </Box>

      <Paper>
        <List>
          {items.map((item, index) => (
            <Box key={item.id}>
              {index > 0 && <Divider />}
              <ListItem>
                <ListItemIcon>
                  <DragIcon />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  secondary={`Order: ${item.order}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleToggleVisibility(item.id)}
                    sx={{ mr: 1 }}
                  >
                    {item.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleOpenDialog(item)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" color="error">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Box>
          ))}
        </List>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedItem ? 'Edit Menu Item' : 'Add Menu Item'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Menu Item Name"
                  defaultValue={selectedItem?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Icon"
                  defaultValue={selectedItem?.icon}
                  helperText="Enter Material Icons name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Order"
                  defaultValue={selectedItem?.order}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={selectedItem?.visible ?? true}
                    />
                  }
                  label="Visible"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 