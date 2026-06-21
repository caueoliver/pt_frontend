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
export async function reviewsUser(userId) {
  const res = await api.get(`/avaliacao_produto/user/${userId}`);
  return res.data;
}

export async function updateProfile(userId, data) {
  const res = await api.patch(`/user/update/${userId}`,data);
  return res.data;
}
export async function updatePassword(userId, data) {
  const res = await api.patch(`/user/update/${userId}`, { password: data.newPassword });
  return res.data;
}

export async function deleteUser(userId){
  const res = await api.delete(`/user/delete/${userId}`);
  return res.data;
}

//produtos mais baratos gerais
export async function getProdutosMaisBaratos() {
  const res = await api.get('/produto/mais-baratos');
  return res.data;
}

//produtos mais recentes gerais
export async function getProdutosRecentes() {
  const res = await api.get('/produto/recentes');
  return res.data;
}

//melhores produtos gerais
export async function getProdutosMelhoresAvaliados() {
  const res = await api.get('/produto/melhores-avaliados');
  return res.data;
}

//todos os produtos
export async function getAllProdutos(){
  const res = await api.get('/produto/todos')
  return res.data;
}

//todas as lojas
export async function getAllLojas(){
  const res = await api.get('/loja/todos')
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
  const res = await api.post('comentarios-avaliacao-loja', { usuarioId, avaliacaoLojaId, conteudo });
  return res.data;
}

export async function editarComentario(id, conteudo) {
  const res = await api.patch(`comentarios-avaliacao-loja/${id}`, { conteudo });
  return res.data;
}

export async function deletarComentario(id) {
  const res = await api.delete(`comentarios-avaliacao-loja/${id}`);
  return res.data;
}

//loja pelo id
export async function getLojaById(lojaId){
  const res = await api.get(`loja/${lojaId}`)
  return res.data;
}
//reviews pelo id da loja
export async function getReviewsByLoja(lojaId){
  const res = await api.get(`loja/${lojaId}/reviews`)
  return res.data;
}

//melhores produtos de determinada loja
export async function getProdutosMelhoresByLoja(lojaId){
  const res = await api.get(`/loja/${lojaId}/melhores`);
  return res.data;
}

//todos os produtos de determinada loja
export async function getProdutosByLoja(lojaId){
  const res = await api.get(`/loja/${lojaId}/produtos`);
  return res.data;
}

export async function getProdutos() {
  const res = await api.get('produto');
  return res.data;
}

export async function getLojas() {
  const res = await api.get('loja');
  return res.data;
}

export async function getAvaliacoesProduto(productId) {
  const res = await api.get(`/avaliacaoproduto/produto/${productId}`);
  return res.data;
}

export async function criarAvaliacaoProduto(productId, nota, comentario) {
  const token = localStorage.getItem('token');
  const usuarioId = token ? JSON.parse(atob(token.split('.')[1])).sub : null;
  const res = await api.post('/avaliacao_produto', { usuarioId, productId, nota, comentario });
//integração para as lojas
export async function getLojasByUsuario(userId) {
  const res = await api.get(`/loja/usuario/${userId}`);
  return res.data;
}

export async function createLoja(data) {
  const res = await api.post('/loja', data);
  return res.data;
}

export async function getProdutosByUsuario(userId) {
  const res = await api.get(`/produto/usuario/${userId}`);
  return res.data;
}

export async function createProduto(data) {
  const res = await api.post('/produto', data);
  return res.data;
}

export async function createImagensProduto(data) {
  const res = await api.post('/imagens-produto', data);
  return res.data;
}