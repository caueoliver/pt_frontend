export interface Produto {
  id: number;
  name: string;
  preco: number;
  idLoja: number;
  estoque: number;
  avaliacao?: number;
  imagemUrl: string;
}