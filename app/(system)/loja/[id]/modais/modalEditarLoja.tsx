// src/components/ModalEditarLoja.tsx
import { useState } from 'react';
import { Loja } from '@/interfaces/lojaInterface';

interface ModalEditarLojaProps {
  isOpen: boolean;
  onClose: () => void;
  loja: Loja;
}

export function ModalEditarLoja({ isOpen, onClose, loja }: ModalEditarLojaProps) {
  // estados para os inputs
  const [nome, setNome] = useState(loja.nome);
  const [categoria, setCategoria] = useState(loja.categoria);

  const categorias = [
  "Mercado",
  "Farmácia",
  "Beleza",
  "Moda", 
  "Eletrônicos",
  "Jogos", 
  "Brinquedos", 
  "Casa", 
];

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-4">
      
      {/* container do modal */}
      <div className="bg-[#EBEBEB] w-full max-w-[800px] rounded-3xl p-6 md:p-8 relative flex flex-col gap-2 md:gap-5 shadow-2xl max-h-[95vh] overflow-hidden">
        
        {/* botão de fechar (X) */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-6 text-2xl text-black hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        {/* título */}
        <h2 className="text-center text-2xl md:text-3xl font-medium text-black mb-1 md:mb-2">Editar loja</h2>

        {/* input: nome da loja */}
        <input 
          type="text" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da loja"
          className="w-full bg-white rounded-full px-6 py-2 md:py-3 text-black outline-none shadow-sm font-light text-sm md:text-base"
        />

        {/* select: categoria */}
        <div className="relative">
          <select 
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full bg-white rounded-full px-6 py-2.5 md:py-3 text-black outline-none shadow-sm appearance-none font-light cursor-pointer text-sm md:text-base"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* campos de upload de arquivos */}
        <div className="flex flex-col gap-2 md:gap-3 mt-1">
          <UploadBox label="Anexe a foto de perfil de sua loja" />
          <UploadBox label="Anexe a logo em SVG de sua loja" />
          <UploadBox label="Anexe o banner de sua loja" />
        </div>

        {/* botões de ação */}
        <div className="flex flex-col items-center gap-3 md:gap-4 mt-2">
          <button 
            className="w-full bg-red-600 text-white py-2.5 md:py-3 rounded-full font-medium hover:bg-red-700 transition-colors shadow-md text-sm md:text-base"
            onClick={() => console.log("Deletar loja")}
          >
            DELETAR
          </button>
          
          <button 
            className="w-2/3 bg-[#6A38F3] text-white py-2.5 md:py-3 rounded-full font-medium hover:bg-purple-700 transition-colors shadow-md text-sm md:text-base"
            onClick={() => {
              console.log("Salvar alterações", { nome, categoria });
              onClose();
            }}
          >
            Salvar
          </button>
        </div>

      </div>
    </div>
  );
}

//componente auxiliar
function UploadBox({ label }: { label: string }) {
  return (
    <label className="border-[1.5px] border-dashed border-[#6A38F3] rounded-2xl flex flex-col items-center justify-center py-5 cursor-pointer hover:bg-purple-50/50 transition-colors">
      <input type="file" className="hidden" />
      {/* ícone de arquivo generico */}
      <svg className="w-8 h-8 text-[#6A38F3] mb-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 15h8v2H8v-2zm0-4h8v2H8v-2z" />
      </svg>
      <span className="text-gray-700 text-sm font-light text-center px-4">{label}</span>
    </label>
  );
}