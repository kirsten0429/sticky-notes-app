import React from 'react';
import { Note } from '../types';
import { formatDate } from '../utils';
import { Trash2, RotateCcw, CheckCircle2 } from 'lucide-react';

interface CompletedListProps {
  notes: Note[];
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
}

const CompletedList: React.FC<CompletedListProps> = ({ notes, onRestore, onDelete }) => {
  if (notes.length === 0) return null;

  return (
    <div className="mt-12 max-w-2xl mx-auto w-full px-4 pb-20">
      <div className="flex items-center gap-2 mb-4 text-gray-500 border-b border-gray-300 pb-2">
        <CheckCircle2 size={18} />
        <h2 className="text-sm font-bold uppercase tracking-wider">已完成事項</h2>
        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
          {notes.length}
        </span>
      </div>
      
      <div className="space-y-2">
        {notes.map((note) => (
          <div 
            key={note.id}
            className="group flex items-center justify-between bg-white/60 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-gray-200 hover:bg-white transition-colors"
          >
            <div className="flex flex-col min-w-0 flex-1 mr-4">
              <span className="text-gray-500 line-through truncate font-hand text-lg">
                {note.content}
              </span>
              <span className="text-[10px] text-gray-400">
                建立於 {formatDate(note.createdAt)}
              </span>
            </div>
            
            <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onRestore(note.id)}
                className="p-2 hover:bg-blue-100 text-blue-500 rounded-full transition-colors"
                title="還原"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="p-2 hover:bg-red-100 text-red-500 rounded-full transition-colors"
                title="永久刪除"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedList;