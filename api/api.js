import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function login(email, password) {
  const res = await api.post('user/login', { email, password });
  return res.data;
}

export async function register(name, nome, email, password) {
  const res = await api.post('user/register', { name, nome, email, password});
  return res.data;
}