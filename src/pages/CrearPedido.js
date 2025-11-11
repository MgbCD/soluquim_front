import React from 'react';
import { usePedidos } from '../context/PedidoContext';
import PedidoForm from '../components/PedidoForm';

const CrearPedido = () => {
  const { addPedido } = usePedidos();

  const handleSubmit = (data) => {

    data.eppIds = data.eppIds.split(',').map(Number);
    addPedido(data);
  };

  return (
    <div>
      <h2>Crear Pedido</h2>
      <PedidoForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CrearPedido;
