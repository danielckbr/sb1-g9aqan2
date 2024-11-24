import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smile, MessageCircle } from 'lucide-react';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EmotionData {
  emotion: string;
  emoji: string;
  percentage: number;
  color: string;
}

const emotionData: EmotionData[] = [
  { emotion: 'Inspirado', emoji: '✨', percentage: 45, color: 'bg-purple-500' },
  { emotion: 'Motivado', emoji: '💪', percentage: 30, color: 'bg-blue-500' },
  { emotion: 'Determinado', emoji: '🎯', percentage: 25, color: 'bg-green-500' },
];

export const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'comments' | 'emotions'>('comments');

  const renderContent = () => {
    switch (activeTab) {
      case 'emotions':
        return (
          <div className="space-y-6">
            <h4 className="font-helvetica-rounded text-lg mb-4">Análise de Emoções</h4>
            {emotionData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-light flex items-center gap-2">
                    {data.emoji} {data.emotion}
                  </span>
                  <span className="font-light">{data.percentage}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${data.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-helvetica-rounded">mariafitness</p>
                <p className="font-light text-sm">Amei as dicas! Principalmente sobre manter o espaço organizado, faz toda diferença no dia 🙌</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-helvetica-rounded">carol.wellness</p>
                <p className="font-light text-sm">Esse conteúdo está incrível! Já coloquei em prática e tem feito muita diferença na minha rotina ✨</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="relative w-full max-h-[80vh] bg-black/20 backdrop-blur-xl rounded-t-3xl p-6 text-white"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-helvetica-rounded">Comentários</h3>
              <button onClick={onClose}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  activeTab === 'comments' ? 'bg-white/20' : 'bg-white/10'
                }`}
                onClick={() => setActiveTab('comments')}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Comentários</span>
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  activeTab === 'emotions' ? 'bg-white/20' : 'bg-white/10'
                }`}
                onClick={() => setActiveTab('emotions')}
              >
                <Smile className="w-5 h-5" />
                <span>Emoções</span>
              </button>
            </div>

            <div className="overflow-y-auto hide-scrollbar">
              {renderContent()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};