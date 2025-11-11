import React, { useEffect } from 'react';
import { usePedidos } from '../context/PedidoContext';
import TablePedidos from '../components/TablaPedidos';

const ListaPedidos = () => {
  const { pedidos, fetchPedidos, loading, error } = usePedidos();

  useEffect(() => {
    fetchPedidos();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <TablePedidos pedidos={pedidos} />
    </div>
  );
};

export default ListaPedidos;
