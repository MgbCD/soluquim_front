import axios from 'axios';

const API_URL = 'http://localhost:8081/api/pedidos';

export const listarPedidos = async (page = 0, size = 10) => {
  const response = await axios.get(`${API_URL}?page=${page}&size=${size}`);
  return response.data;
};

export const crearPedido = async (pedido) => {
  const response = await axios.post(API_URL, pedido);
  return response.data;
};

export const obtenerPedido = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
