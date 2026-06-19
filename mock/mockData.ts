
import {  Produto } from '@/interfaces/produtoInterface';
import { Loja } from '@/interfaces/lojaInterface';
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
    {id: 1, nome: "CJR", categoria: "mercado",idDono: 1, nomeDono: "Selena Gomes", logoUrl:"/img_feed/CJR.png", bannerUrl: "/img_loja/rareBeauty_banner.png", avaliacaoMedia: 5,},
    {id: 2, nome: "CJR", categoria: "moda",idDono: 1,nomeDono: "Selena Gomes", logoUrl:"/img_feed/CJR.png", bannerUrl: "/img_loja/rareBeauty_banner.png", avaliacaoMedia: 5,},
    {id: 3, nome: "CJR", categoria: "beleza",idDono: 1,nomeDono: "Selena Gomes", logoUrl:"/img_feed/CJR.png", bannerUrl: "/img_loja/rareBeauty_banner.png", avaliacaoMedia: 5,},
    {id: 4, nome: "CJR", categoria: "eletrônicos",idDono: 1,nomeDono: "Selena Gomes", logoUrl:"/img_feed/CJR.png", bannerUrl: "/img_loja/rareBeauty_banner.png", avaliacaoMedia: 5,},
    {id: 5, nome: "CJR", categoria: "mercado",idDono: 1,nomeDono: "Selena Gomes", logoUrl:"/img_feed/CJR.png", bannerUrl: "/img_loja/rareBeauty_banner.png", avaliacaoMedia: 5 },
    
];

export const Produtos_mock: Produto[] = [
        { id: 1, name: "Brownie Meio A.", preco: 7.50, idLoja: 1, avaliacao: 4.9, description: "brownie foda", estoque: 2, imagemUrl: "/img_feed/brownie.png" },
        { id: 2, name: "Brownie Meio A.", preco: 7.50, idLoja: 1, avaliacao: 4.9, description: "brownie foda", estoque: 0, imagemUrl: "/img_feed/brownie.png" },
        { id: 3, name: "Brownie Meio A.", preco: 7.50, idLoja: 1, avaliacao: 4.9, description: "brownie foda", estoque: 6, imagemUrl: "/img_feed/brownie.png" },
        { id: 4, name: "Brownie Meio A.", preco: 7.50, idLoja: 1, avaliacao: 4.9, description: "brownie foda", estoque: 0, imagemUrl: "/img_feed/brownie.png" },
        { id: 5, name: "Brownie Meio A.", preco: 7.50, idLoja: 1, avaliacao: 4.9, description: "brownie foda", estoque: 1, imagemUrl: "/img_feed/brownie.png" },
        { id: 6, name: "Brownie Meio A.", preco: 7.50, idLoja: 1, avaliacao: 4.9, description: "brownie foda", estoque: 1, imagemUrl: "/img_feed/brownie.png" },
        { id: 7, name: "Brownie Meio A.", preco: 7.50, idLoja: 1, avaliacao: 4.9, description: "brownie foda", estoque: 1, imagemUrl: "/img_feed/brownie.png" },
        { id: 8, name: "Brownie Meio A.", preco: 7.50, idLoja: 1, avaliacao: 4.9, description: "brownie foda", estoque: 0, imagemUrl: "/img_feed/brownie.png" },  
        { id: 9, name: "Brownie Meio A.", preco: 7.50, idLoja: 1, avaliacao: 4.9, description: "brownie foda", estoque: 0, imagemUrl: "/img_feed/brownie.png" },
        { id: 10, name: "Brownie Meio A.", preco: 7.50, idLoja: 1, avaliacao: 4.9, description: "brownie foda", estoque: 1, imagemUrl: "/img_feed/brownie.png" },
      ];