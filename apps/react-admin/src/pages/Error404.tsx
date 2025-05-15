import { Box, Typography, Button, Paper } from '@mui/material';
import { SearchOff as SearchOffIcon, Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Error404() {
  const navigate = useNavigate();

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
        <SearchOffIcon
          sx={{
            fontSize: 80,
            color: 'warning.main',
            mb: 2,
          }}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          404 Not Found
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          paragraph
        >
          Страница, которую вы ищете, не существует или была перемещена.
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
          >
            Вернуться на главную
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
        </Box>
      </Paper>
    </Box>
  );
} 