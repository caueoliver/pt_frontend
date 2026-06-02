'use client';
import { useState } from 'react';

// a interface para avisar a pag do feed o que está sendo digitado
interface BarraPesquisaProps {
  placeholder?: string; // define o texto de fundo
  onSearch: (termo: string) => void;
}

export function BarraPesquisa({ placeholder = "Procurando por...", onSearch }: BarraPesquisaProps) {
  const [termo, setTermo] = useState('');

  // função que roda a cada letra que o usuário digita
  const digitacao = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textoDigitado = e.target.value;
    setTermo(textoDigitado);
    onSearch(textoDigitado); 
  };

  // função para limpar o campo quando clica no 'x'
  const limparBusca = () => {
    setTermo('');
    onSearch('');
  };

  return (
    // campo de pesquisa 
    <div className="relative w-full max-w-2xl max-w-md shrink-0 pr-3">
      
      {/* icone da lupa */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <img src="/img_feed/pesquisa.png" alt="lupa" />
      </div>

      {/* input em si */}
      <input
        type="text"
        value={termo}
        onChange={digitacao}
        placeholder={placeholder}
        className="w-full py-4 pl-12 pr-12 bg-white border border-transparent rounded-full text-black placeholder-gray-400 shadow-md focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
      />

      {/* botão de 'x' que só aparece se tiver alguma coisa digitada */}
      {termo && (
        <button
          onClick={limparBusca}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
        >
          {/* Ícone SVG de um 'X' simples */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

    </div>
  );
}