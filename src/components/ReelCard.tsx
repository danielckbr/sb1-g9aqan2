import React, { useState } from 'react';
import { Heart, Star, Download, MessageCircle, Wand2, TrendingUp } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';
import { GlassButton } from './GlassButton';
import { CommentsModal } from './CommentsModal';
import { AIScriptModal } from './AIScriptModal';

interface ReelCardProps {
  video: {
    src: string;
    avatar: string;
    username: string;
    description: string;
  };
  isActive: boolean;
}

export const ReelCard: React.FC<ReelCardProps> = ({ video, isActive }) => {
  const [showComments, setShowComments] = useState(false);
  const [showAIScript, setShowAIScript] = useState(false);

  return (
    <div className="relative h-screen w-full bg-black">
      <VideoPlayer src={video.src} isActive={isActive} />
      
      <div className="absolute top-1/3 right-2 flex flex-col gap-4">
        <GlassButton icon={Heart} label="Curtir" count="87.5k" onClick={() => {}} />
        <GlassButton icon={MessageCircle} label="Comentar" count="1.2k" onClick={() => setShowComments(true)} />
        <GlassButton icon={TrendingUp} label="Engajamento" count="24.5%" onClick={() => {}} />
        <GlassButton icon={Star} label="Salvar" count="3.4k" onClick={() => {}} />
        <GlassButton icon={Download} label="Baixar" onClick={() => {}} />
        <GlassButton icon={Wand2} label="Gerar" onClick={() => setShowAIScript(true)} />
      </div>

      <div className="absolute bottom-6 left-4 right-16">
        <div className="flex items-center gap-3 mb-3">
          <img src={video.avatar} className="w-10 h-10 rounded-full border-2 border-white" alt={video.username} />
          <span className="text-white font-helvetica-rounded">{video.username}</span>
        </div>
        <p className="text-white font-light text-sm leading-relaxed">{video.description}</p>
      </div>

      <CommentsModal isOpen={showComments} onClose={() => setShowComments(false)} />
      <AIScriptModal isOpen={showAIScript} onClose={() => setShowAIScript(false)} />
    </div>
  );
};