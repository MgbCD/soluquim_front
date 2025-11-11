import React from 'react';

const TablePedidos = ({ pedidos }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Valor Total</th>
          <th>Estado</th>
          <th>Empresa ID</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.valorTotal}</td>
            <td>{p.estado}</td>
            <td>{p.empresaId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablePedidos;
