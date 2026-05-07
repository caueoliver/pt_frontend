import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3001",
  headers: { 
  "Content-Type": "application/json" 
  },
})

export async function login(email,senha) {  
  const res = await api.post('login',{email,senha});
  return res.data;
}