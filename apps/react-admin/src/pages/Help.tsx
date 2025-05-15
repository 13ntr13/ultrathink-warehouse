import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import {
  Help as HelpIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Book as BookIcon,
  VideoLibrary as VideoIcon,
  ContactSupport as ContactIcon,
} from '@mui/icons-material';

export default function Help() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Help Center
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Welcome to UltraThink Warehouse Help Center
        </Typography>
        <Typography color="text.secondary" paragraph>
          Find answers to common questions and learn how to use our platform effectively.
        </Typography>
      </Paper>

      <List>
        <ListItem>
          <ListItemIcon>
            <QuestionAnswerIcon />
          </ListItemIcon>
          <ListItemText
            primary="Frequently Asked Questions"
            secondary="Find answers to the most common questions about using our platform"
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText
            primary="Documentation"
            secondary="Detailed guides and documentation for all features"
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <VideoIcon />
          </ListItemIcon>
          <ListItemText
            primary="Video Tutorials"
            secondary="Watch step-by-step video guides"
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <ContactIcon />
          </ListItemIcon>
          <ListItemText
            primary="Contact Support"
            secondary="Get in touch with our support team"
          />
        </ListItem>
      </List>
    </Box>
  );
} 