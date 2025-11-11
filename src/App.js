import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PedidoProvider } from './context/PedidoContext';
import PedidoList from './components/PedidoList';
import PedidoForm from './components/PedidoForm';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, Box } from '@mui/material';

function App() {
  return (
    <PedidoProvider>
      <Router>
        <CssBaseline /> 
        <AppBar 
          position="static" 
          elevation={5} 
          sx={{
            backgroundColor: 'rgba(76, 175, 80, 0.85)',
            borderRadius: '0 0 20px 20px', 
            mx: 2, 
            my: 2, 
            backdropFilter: 'blur(12px)', 
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 70 }}>
            <Typography 
              variant="h6" 
              sx={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', letterSpacing: 1 }}
            >
              Soluquim
            </Typography>
            <Box>
              <Button 
                component={Link} 
                to="/listar" 
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginRight: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '16px',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                Listar Pedidos
              </Button>
              <Button 
                component={Link} 
                to="/crear" 
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '16px',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                Crear Pedido
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ marginTop: '30px' }}>
          <Routes>
            <Route path="/listar" element={<PedidoList />} />
            <Route path="/crear" element={<PedidoForm />} />
            <Route path="*" element={<PedidoList />} />
          </Routes>
        </Container>
      </Router>
    </PedidoProvider>
  );
}

export default App;
