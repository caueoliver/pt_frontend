'use client';
import { useState, useEffect, useRef } from 'react';
import { FiCamera, FiChevronDown } from 'react-icons/fi';

type Categoria = {
  id: number;
  name: string;
  parentCategoryId: number | null;
};

type Props = {
  lojaId: number;
  onClose: () => void;
  onCriado?: (produto: any) => void;
};

export function ModalCriarProduto({ lojaId, onClose, onCriado }: Props) {
  const [nome, setNome] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [imagens, setImagens] = useState<(File | null)[]>([null, null, null]);
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null]);

  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => {
    fetch('http://localhost:3001/categoria')
      .then((r) => r.json())
      .then(setCategorias)
      .catch(() => {});
  }, []);

  const handleImagem = (index: number, file: File | null) => {
    if (!file) return;
    const novas = [...imagens];
    novas[index] = file;
    setImagens(novas);
    const url = URL.createObjectURL(file);
    const novasPreviews = [...previews];
    novasPreviews[index] = url;
    setPreviews(novasPreviews);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8">
      <div className="relative bg-[#EFEFEF] rounded-3xl w-full max-w-lg mx-4 px-8 py-8">

        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl text-black hover:opacity-60 transition-opacity"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center text-black mb-6">Adicionar Produto</h2>

        {/* área principal de upload */}
        <div className="border-2 border-dashed border-[#6A38F3] rounded-2xl p-5 flex flex-col items-center mb-4">
          <div className="relative mb-1">
            <FiCamera size={48} className="text-[#6A38F3]" />
            <span className="absolute -bottom-1 -right-2 bg-[#EFEFEF] rounded-full text-[#6A38F3] text-sm font-bold w-5 h-5 flex items-center justify-center">
              +
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-2 mb-4">Anexe as fotos do seu produto</p>

          {/* 3 sub-boxes */}
          <div className="grid grid-cols-3 gap-3 w-full">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <input
                  ref={inputRefs[i]}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImagem(i, e.target.files?.[0] ?? null)}
                />
                <button
                  onClick={() => inputRefs[i].current?.click()}
                  className="w-full border-2 border-dashed border-[#6A38F3] rounded-xl flex items-center justify-center py-5 hover:bg-purple-50 transition-colors overflow-hidden"
                >
                  {previews[i] ? (
                    <img src={previews[i]!} className="w-full h-full object-cover rounded-xl" alt="" />
                  ) : (
                    <div className="relative">
                      <FiCamera size={28} className="text-[#6A38F3]" />
                      <span className="absolute -bottom-1 -right-2 bg-[#EFEFEF] rounded-full text-[#6A38F3] text-xs font-bold w-4 h-4 flex items-center justify-center">
                        +
                      </span>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* nome */}
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full bg-white rounded-full px-5 py-3 text-sm text-gray-700 outline-none border border-gray-200 mb-3 placeholder-gray-400"
        />

        {/* subcategoria */}
        <div className="relative mb-3">
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full bg-white rounded-full px-5 py-3 text-sm text-gray-500 outline-none border border-gray-200 appearance-none cursor-pointer"
          >
            <option value="" disabled>Subcategoria</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* descrição */}
        <textarea
          placeholder="Descrição do produto"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={4}
          className="w-full bg-white rounded-2xl px-5 py-3 text-sm text-gray-700 outline-none border border-gray-200 resize-none mb-3 placeholder-gray-400"
        />

        {/* preço */}
        <input
          type="number"
          placeholder="Preço do produto"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          min={0}
          step={0.01}
          className="w-full bg-white rounded-full px-5 py-3 text-sm text-gray-700 outline-none border border-gray-200 mb-5 placeholder-gray-400"
        />

        {/* quantidade */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <button
            onClick={() => setQuantidade((q) => Math.max(0, q - 1))}
            className="w-10 h-10 rounded-full border-2 border-[#6A38F3] text-[#6A38F3] text-xl flex items-center justify-center hover:bg-purple-50 transition-colors"
          >
            −
          </button>
          <span className="text-[#6A38F3] text-4xl font-bold w-12 text-center">{quantidade}</span>
          <button
            onClick={() => setQuantidade((q) => q + 1)}
            className="w-10 h-10 rounded-full border-2 border-[#6A38F3] text-[#6A38F3] text-xl flex items-center justify-center hover:bg-purple-50 transition-colors"
          >
            +
          </button>
        </div>

        {/* botão */}
        <button
          className="w-full bg-[#6A38F3] hover:bg-[#5a2ee0] text-white font-bold text-base rounded-full py-3 transition-colors"
        >
          Adicionar
        </button>

      </div>
    </div>
  );
}
