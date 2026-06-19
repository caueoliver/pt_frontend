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

//produtos mais baratos geral
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

//loja pelo id
export async function getLojaById(lojaId){
  const res = await api.get(`loja/${lojaId}`)
  return res.data;
}

//melhores produtos de determinada loja
export async function getProdutosMelhoresByLoja(lojaId){
  const res = await api.get(`/produto/melhores-loja/${lojaId}`);
  return res.data;
}

//todos os produtos de determinada loja
export async function getAllProdutosByLoja(lojaId){
  const res = await api.get('/produto/melhores-by-loja');
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
