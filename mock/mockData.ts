
import {  Produto } from '@/components/cardProduto';
import { Loja } from '@/components/cardLoja';
import { Categoria } from '@/components/cardCategoria';


export const fakeUser = {
  name: "Luis Fernandes",
  username: "luisdev",
  email: "luis@gmail.com",
  avatarUrl: "https://i.pravatar.cc/300",
};

export const fakeReviews = [
  {
    id: 1,
    comment: "Muito bom esse filme.",
    user: {
      name: "Luis",
      avatarUrl: "https://i.pravatar.cc/300",
    },
  },

  {
    id: 1,
    comment: "Gostei bastante da fotografia.",
    user: {
      name: "Luis",
      avatarUrl: "https://i.pravatar.cc/300",
    },
  },
];

export const Categ_mock: Categoria[] = [ 
    {id: 1, nome: "Mercado", icone:'null'},
    {id: 2, nome: "Farmácia", icone: 'null'},
    {id: 3, nome: "Beleza", icone: 'null'},
    {id: 4, nome: "Moda", icone: 'null'},
    {id: 5, nome: "Eletrônicos", icone: 'null'},
    {id: 6, nome: "Jogos", icone: 'null'},
    {id: 7, nome: "Brinquedos", icone: 'null'},
    {id: 8, nome: "Casa", icone: 'null'},

    ];

export const Lojas_mock: Loja [] = [
    {id: 1, nome: "CJR", categoria: "mercado", imagemUrl:"/img_feed/CJR.png"},
    {id: 2, nome: "CJR", categoria: "moda", imagemUrl:"/img_feed/CJR.png"},
    {id: 3, nome: "CJR", categoria: "beleza", imagemUrl:"/img_feed/CJR.png"},
    {id: 4, nome: "CJR", categoria: "eletrônicos", imagemUrl:"/img_feed/CJR.png"},
    {id: 5, nome: "CJR", categoria: "mercado", imagemUrl:"/img_feed/CJR.png"},
    
];

export const Produtos_mock: Produto[] = [
        { id: 1, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 2, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 3, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 4, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 5, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 6, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 7, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 8, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },  
        { id: 9, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"DISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
        { id: 10, nome: "Brownie Meio A.", preco: 7.50, avaliacao: 4.9, descricao: "brownie foda", status:"INDISPONÍVEL", imagemUrl: "/img_feed/brownie.png" },
      ];