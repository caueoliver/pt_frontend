'use client';
import { useState } from 'react';
import { Categoria } from '@/components/cardCategoria';

const categoriasDefinidas: Categoria[] = [ 
  { id: 1, nome: "Mercado", icone: '/img_feed/mercado.png' }, 
  { id: 2, nome: "Farmácia", icone: '/img_feed/farmacia.png' },
  { id: 3, nome: "Beleza", icone: '/img_feed/beleza.png' },
  { id: 4, nome: "Moda", icone: '/img_feed/moda.png' },
  { id: 5, nome: "Eletrônicos", icone: '/img_feed/eletronicos.png' },
  { id: 6, nome: "Jogos", icone: '/img_feed/jogos.png' },
  { id: 7, nome: "Brinquedos", icone: '/img_feed/brinquedos.png' },
  { id: 8, nome: "Casa", icone: '/img_feed/casa.png' },
];

interface FiltroLojaProps {
  onFiltroChange: (categoriasSelecionadas: string[]) => void;
}

export function FiltroLojas({onFiltroChange}: FiltroLojaProps) {
  
  //guarda as categorias definidas
  const [categorias, setCategorias] = useState<Categoria[]>(categoriasDefinidas);
  
  //controla se o menu dos filtros está aberto ou não
  const [menuAberto, setMenuAberto] = useState(false);
  
  //guarda quais categorias o usuário escolheu clicar
  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  const marcarCat = (nomeCat : string) => {
    let novaLista;
    const catPadronizada = nomeCat.toLowerCase();

    // testa se a categoria já está na lista das selecionadas
    if (selecionadas.includes(catPadronizada)){
        //se já estava ele desmarca (retira da lista)
        setSelecionadas(selecionadas.filter((item) => item !== catPadronizada));
        novaLista = selecionadas.filter((item) => item !== catPadronizada);
    } else {
        setSelecionadas([...selecionadas, catPadronizada]);
        novaLista = [...selecionadas, catPadronizada];
    }

    setSelecionadas(novaLista);
    onFiltroChange(novaLista);
  };

  return (
    <div className="relative z-50 flex flex-col items-center">
      
      {/* botão para abrir o menu de filtros disponíveis */}
      <button 
        onClick={() => setMenuAberto(!menuAberto)}
        className="px-6 py-3 bg-white text-[#a881e6] rounded-full shadow-sm w-90  flex justify-between items-center"
      >
        <span className='text-2xl font-light tracking-wide'>filtros</span>
        
        
        <img 
          src="/img_feed/filtro.png" 
          alt="Seta"
          // caso o menu esteja aberto a seta vira 180°
          className={`w-4 h-4 object-contain transition-transform duration-300 ${menuAberto ? 'rotate-180' : ''}`} 
        />

      </button>

      {/* menu flutuante com as opções */}
      {menuAberto && (
        <div className="absolute top-14 w-90 bg-white rounded-3xl p-6 shadow-xl flex flex-col gap-4">
          
          <div className="flex flex-col gap-3">
            {/* percorre todo array de categorias*/}
            {categorias.map((cat) => {
              
              // verifica se a categoria atual está no array de selecionadas
              const taSelecionado = selecionadas.includes(cat.nome.toLowerCase());

              return (
                <label 
                  key={cat.id} 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => marcarCat(cat.nome)}
                >
                  
                  {/* cria um quadrado que simula uma checkbox*/}
                  {/* se estiver selecionado ele pinta de roxo, se não, deixa transparente */}
                  <div className={`w-6 h-6 rounded-lg border-2 border-purple-600 flex items-center justify-center transition-colors
                    ${taSelecionado ? 'bg-purple-600' : 'bg-transparent'}
                  `}>
                    {/* desenha o símbolo de check se estiver marcado */}
                    {taSelecionado && <span className="text-white text-sm font-bold">✓</span>}
                  </div>
                  
                  {/* exibe o nome e a imagem da categoria */}
                  <span className="text-purple-600 font-light text-lg select-none flex items-center gap-2">
                    {cat.nome} 
                    
                    {/* exibe a imagem apenas se o ícone não for a string 'null' */}
                    {cat.icone !== 'null' && (
                      <img src={cat.icone} alt={cat.nome} className="w-5 h-5 object-contain" />
                    )}
                  </span>

                </label>
              );
            })}

          </div>

        </div>
      )}
           
    </div>

    
  );
}