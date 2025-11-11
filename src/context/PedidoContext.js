import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../api/pedidos';

const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPedidos = async (page = 0, size = 10) => {
    setLoading(true);
    try {
      const data = await api.listarPedidos(page, size);
      setPedidos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPedido = async (pedido) => {
    setLoading(true);
    try {
      const newPedido = await api.crearPedido(pedido);
      setPedidos((prev) => [newPedido, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PedidoContext.Provider value={{ pedidos, fetchPedidos, addPedido, loading, error }}>
      {children}
    </PedidoContext.Provider>
  );
};

export const usePedidos = () => useContext(PedidoContext);
