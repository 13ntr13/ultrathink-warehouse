import { Box, Typography, Button, Paper } from '@mui/material';
import { Error as ErrorIcon, Home as HomeIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Error500() {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 500,
          width: '100%',
        }}
      >
        <ErrorIcon
          sx={{
            fontSize: 80,
            color: 'error.main',
            mb: 2,
          }}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          500 Server Error
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          paragraph
        >
          Произошла внутренняя ошибка сервера. Пожалуйста, попробуйте обновить страницу или вернуться позже.
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Обновить страницу
          </Button>
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
          >
            На главную
          </Button>
        </Box>
      </Paper>
    </Box>
  );
} 