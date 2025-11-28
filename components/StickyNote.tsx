import React from 'react';
import { Note } from '../types';
import { formatDate } from '../utils';
import { Check, X } from 'lucide-react';

interface StickyNoteProps {
  note: Note;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const StickyNote: React.FC<StickyNoteProps> = ({ note, onComplete, onDelete }) => {
  return (
    <div
      className={`relative group flex flex-col justify-between p-4 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 hover:z-10 cursor-pointer ${note.color} rounded-sm`}
      style={{
        transform: `rotate(${note.rotation}deg)`,
        minHeight: '160px',
        aspectRatio: '1/1',
      }}
      onClick={() => onComplete(note.id)}
    >
      {/* Pin effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-400 shadow-sm opacity-80 border border-red-600/20"></div>

      <div className="flex-grow flex items-center justify-center text-center overflow-hidden">
        <p className="text-gray-800 font-hand text-xl leading-tight break-words w-full px-1 max-h-full overflow-y-auto no-scrollbar">
          {note.content}
        </p>
      </div>

      <div className="mt-2 flex justify-between items-end border-t border-black/5 pt-1">
        <span className="text-[10px] text-gray-500 font-medium">
          {formatDate(note.createdAt)}
        </span>
        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
           <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="p-2 -m-2 hover:bg-black/10 rounded-full text-gray-600 active:bg-black/20"
            title="刪除"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Completion Hint Overlay - Visible on hover only (Desktop) */}
      <div className="absolute inset-0 bg-black/0 md:hover:bg-black/5 transition-colors hidden md:flex items-center justify-center opacity-0 md:hover:opacity-100 pointer-events-none">
        <Check className="text-gray-600/50" size={48} />
      </div>
    </div>
  );
};