import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function login(email, password) {
  const res = await api.post('user/login', { email, password });
  return res.data;
}

export async function register(name, nome, email, password) {
  const res = await api.post('user/register', { name, nome, email, password});
  return res.data;
}

export async function getUserById(userId) {
  const res = await api.get(`/user/${userId}`);
  return res.data;
}
//achar essa funcao no back
export async function reviewsUser(userId) {
  const res = await api.get(`/reviews/user/${userId}`);
  return res.data;
}

export async function updateProfile(userId, data) {
  const res = await api.patch(`/user/${userId}`,data);
  return res.data;
}

export async function updatePassword(userId, data){
  const res = await api.patch(`/user/${userId}/password`, data);
  return res.data;
}

export async function deleteUser(userId){
  const res = await api.delete(`/user/delete/${userId}`);
  return res.data;
}

export async function getProdutosMaisBaratos() {
  const res = await api.get('/produto/mais-baratos');
  return res.data;
}

export async function getProdutosRecentes() {
  const res = await api.get('/produto/recentes');
  return res.data;
}

export async function getProdutosMelhoresAvaliados() {
  const res = await api.get('/produto/melhores-avaliados');
  return res.data;
}

export async function getAllProdutos(){
  const res = await api.get('/produto')
  return res.data;
}

export async function getAllLojas(){
  const res = await api.get('/loja')
  return res.data;
}

export async function getAvaliacoesLoja() {
  const res = await api.get('avaliacoes-loja');
  return res.data;
}

export async function editarAvaliacao(id, nota, comentario) {
  const res = await api.patch(`avaliacoes-loja/${id}`, { nota, comentario });
  return res.data;
}

export async function deletarAvaliacao(id) {
  const res = await api.delete(`avaliacoes-loja/${id}`);
  return res.data;
}

export async function criarComentario(avaliacaoLojaId, conteudo) {
  const token = localStorage.getItem('token');
  const usuarioId = token ? JSON.parse(atob(token.split('.')[1])).sub : null;
  const res = await api.post('comentarios-avaliacao', { usuarioId, avaliacaoLojaId, conteudo });
  return res.data;
}

export async function editarComentario(id, conteudo) {
  const res = await api.patch(`comentarios-avaliacao/${id}`, { conteudo });
  return res.data;
}

export async function deletarComentario(id) {
  const res = await api.delete(`comentarios-avaliacao/${id}`);
  return res.data;
}
