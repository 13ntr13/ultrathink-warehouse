import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Error404() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Страница не найдена
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        К сожалению, запрошенная страница не существует или была удалена.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>На главную</Button>
    </Box>
  );
} 