import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy } from 'lucide-react';

interface AIScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIScriptModal: React.FC<AIScriptModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl p-6 text-white"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-helvetica-rounded">AI Generated Script</h3>
              <button onClick={onClose}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-helvetica-rounded">Morning Routine</h4>
                <div className="space-y-2 font-light">
                  <p>Take 1: Wake up at 6 AM, gentle stretching in bed</p>
                  <p>Take 2: Make bed with fresh linens</p>
                  <p>Take 3: Open curtains, let natural light in</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-helvetica-rounded">Breakfast Preparation</h4>
                <div className="space-y-2 font-light">
                  <p>Take 1: Prepare fresh coffee/tea</p>
                  <p>Take 2: Make healthy breakfast bowl</p>
                  <p>Take 3: Set beautiful table arrangement</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-helvetica-rounded">Self-Care Routine</h4>
                <div className="space-y-2 font-light">
                  <p>Take 1: 10-minute meditation</p>
                  <p>Take 2: Skincare routine</p>
                  <p>Take 3: Get dressed mindfully</p>
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Copy className="w-5 h-5" />
                <span>Copy Script</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};