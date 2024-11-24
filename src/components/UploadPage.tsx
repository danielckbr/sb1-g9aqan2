import React, { useState } from 'react';
import { Upload, Plus, X, Youtube, Instagram, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

interface VideoUpload {
  file: File;
  type: 'reels' | 'youtube';
  thumbnail: File | null;
  caption: string;
  categories: string[];
  subcategories: string[];
  instagramData?: {
    likes: number;
    comments: number;
    views: number;
  };
}

export const UploadPage: React.FC = () => {
  const [uploads, setUploads] = useState<VideoUpload[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Lifestyle', subcategories: ['Rotina', 'Organização'] },
    { id: '2', name: 'Fitness', subcategories: ['Treino', 'Nutrição'] }
  ]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', subcategory: '' });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      if (file.type.includes('video')) {
        setUploads(prev => [...prev, {
          file,
          type: 'reels',
          thumbnail: null,
          caption: '',
          categories: [],
          subcategories: []
        }]);
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-helvetica-rounded mb-8">Upload de Conteúdo</h1>

        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-white/20 rounded-3xl p-8 mb-8 text-center bg-white/5 backdrop-blur-lg"
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-white/60" />
          <p className="font-light mb-2">Arraste seus vídeos aqui ou</p>
          <label className="inline-block px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
            <span>Selecione os arquivos</span>
            <input
              type="file"
              className="hidden"
              accept="video/*"
              multiple
              onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
            />
          </label>
        </div>

        {/* Uploads List */}
        <div className="space-y-6">
          {uploads.map((upload, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-start gap-6">
                {/* Thumbnail Upload */}
                <div className="w-48 h-48 bg-black/20 rounded-xl flex items-center justify-center relative">
                  {upload.thumbnail ? (
                    <img
                      src={URL.createObjectURL(upload.thumbnail)}
                      alt="Thumbnail"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <label className="cursor-pointer group">
                      <ImageIcon className="w-8 h-8 text-white/60 group-hover:text-white/80" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploads(prev => prev.map((u, i) => 
                              i === index ? { ...u, thumbnail: file } : u
                            ));
                          }
                        }}
                      />
                    </label>
                  )}
                </div>

                {/* Video Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <h3 className="font-helvetica-rounded">{upload.file.name}</h3>
                    <button
                      onClick={() => setUploads(prev => prev.filter((_, i) => i !== index))}
                      className="p-1 rounded-full hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Platform Selection */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setUploads(prev => prev.map((u, i) => 
                        i === index ? { ...u, type: 'reels' } : u
                      ))}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                        upload.type === 'reels' ? 'bg-white/20' : 'bg-white/10'
                      }`}
                    >
                      <Instagram className="w-5 h-5" />
                      <span>Reels</span>
                    </button>
                    <button
                      onClick={() => setUploads(prev => prev.map((u, i) => 
                        i === index ? { ...u, type: 'youtube' } : u
                      ))}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                        upload.type === 'youtube' ? 'bg-white/20' : 'bg-white/10'
                      }`}
                    >
                      <Youtube className="w-5 h-5" />
                      <span>YouTube</span>
                    </button>
                  </div>

                  {/* Caption */}
                  <textarea
                    placeholder="Adicione uma legenda..."
                    value={upload.caption}
                    onChange={(e) => setUploads(prev => prev.map((u, i) => 
                      i === index ? { ...u, caption: e.target.value } : u
                    ))}
                    className="w-full bg-black/20 rounded-xl p-4 font-light placeholder:text-white/40 resize-none"
                    rows={3}
                  />

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setUploads(prev => prev.map((u, i) => 
                            i === index ? {
                              ...u,
                              categories: u.categories.includes(category.name)
                                ? u.categories.filter(c => c !== category.name)
                                : [...u.categories, category.name]
                            } : u
                          ));
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          upload.categories.includes(category.name)
                            ? 'bg-white/20'
                            : 'bg-white/10'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                    <button
                      onClick={() => setShowCategoryModal(true)}
                      className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Nova Categoria
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Modal */}
        <AnimatePresence>
          {showCategoryModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCategoryModal(false)} />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-md bg-black/20 backdrop-blur-xl rounded-3xl p-6 text-white"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-helvetica-rounded">Nova Categoria</h3>
                  <button onClick={() => setShowCategoryModal(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nome da categoria"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/10 rounded-xl p-4 font-light placeholder:text-white/40"
                  />
                  <input
                    type="text"
                    placeholder="Nova subcategoria (opcional)"
                    value={newCategory.subcategory}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, subcategory: e.target.value }))}
                    className="w-full bg-white/10 rounded-xl p-4 font-light placeholder:text-white/40"
                  />
                  <button
                    onClick={() => {
                      if (newCategory.name) {
                        setCategories(prev => [...prev, {
                          id: String(prev.length + 1),
                          name: newCategory.name,
                          subcategories: newCategory.subcategory ? [newCategory.subcategory] : []
                        }]);
                        setNewCategory({ name: '', subcategory: '' });
                        setShowCategoryModal(false);
                      }
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-helvetica-rounded"
                  >
                    Criar Categoria
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};