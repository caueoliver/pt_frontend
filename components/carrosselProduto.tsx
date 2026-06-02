'use client';
import { CardProduto, Produto } from './cardProduto';

// define uma interface com os atributos do CarrosselProduto, um titulo e uma lista de produtos
interface CarrosselProdutosProps {
  titulo: string;
  listaProdutos: Produto[];
}

//a função tem como argumento os atributos definidos na interface
export function CarrosselProduto({titulo, listaProdutos}: CarrosselProdutosProps){
    return(

      // div pai que define o tamanho e a cor do fundo do carrossel
      <div className='bg-[#F6F3E4] h-[370px]'>
            {/* titulo e subtitulo do carrossel */}
            <span className='text-black text-4xl font-bold'>Produtos </span>
            <span className='text-[#6A38F3] font-bold'> {titulo}</span>

        {/* div para a parte do carrossel de fato, define o scroll e como vao ficar posicionados os card dentro dele */}
        <div className="w-full flex gap-6 overflow-x-auto snap-x snap-mandatory px-12 pb-5 pt-8 scrollbar-hide">
        
        {/* utiliza um laço de repetição para percorrer toda a lista de produtos*/}
        {/* renderiza um card produto utilzando como argumento o produto atual da lista*/}
        {listaProdutos.map((item) => (
          <div key={item.id} className="snap-start shrink-0">
            <CardProduto produto={item} />
          </div>
        ))}

        </div>
      </div>

    );
}
