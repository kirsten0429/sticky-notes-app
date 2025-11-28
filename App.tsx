import React, { useState, useEffect, useCallback } from 'react';
import { Plus, StickyNote as StickyNoteIcon } from 'lucide-react';
import { Note, NOTE_COLORS } from './types';
import { generateId, getRandomRotation } from './utils';
import { StickyNote } from './components/StickyNote';
import { CompletedList } from './components/CompletedList';

const STORAGE_KEY = 'sticky_notes_app_v1';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse notes", e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;

    const newNote: Note = {
      id: generateId(),
      content: inputValue.trim(),
      createdAt: Date.now(),
      color: selectedColor,
      rotation: getRandomRotation(),
      isCompleted: false,
    };

    setNotes((prev) => [newNote, ...prev]);
    setInputValue('');
  }, [inputValue, selectedColor]);

  const toggleComplete = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isCompleted: !note.isCompleted } : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const activeNotes = notes.filter((n) => !n.isCompleted);
  const completedNotes = notes.filter((n) => n.isCompleted);

  return (
    <div className="min-h-screen pb-safe">
      {/* Header & Input Area */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-yellow-400 p-1.5 rounded-lg text-white shadow-sm">
              <StickyNoteIcon size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">隨手貼 Sticky</h1>
          </div>

          <form onSubmit={addNote} className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
              placeholder="記點什麼..."
              className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none text-gray-700 shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg disabled:opacity-30 disabled:bg-gray-400 hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={20} />
            </button>
          </form>

          {/* Color Selector - visible when typing or has input */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${inputValue || isInputFocused ? 'max-h-12 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">顏色:</span>
              {NOTE_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full shadow-sm border border-black/5 transition-transform hover:scale-110 ${color} ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
                  }`}
                  aria-label="Select color"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Board */}
      <main className="max-w-5xl mx-auto p-4 md:p-8">
        {activeNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-white/50 flex items-center justify-center border-2 border-dashed border-gray-300">
              <Plus size={32} className="opacity-50" />
            </div>
            <p className="font-medium">目前沒有便條紙</p>
            <p className="text-sm opacity-70">在上方新增一張來開始吧！</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 auto-rows-fr">
            {activeNotes.map((note) => (
              <StickyNote
                key={note.id}
                note={note}
                onComplete={toggleComplete}
                onDelete={deleteNote}
              />
            ))}
          </div>
        )}

        {/* Completed List */}
        <CompletedList 
          notes={completedNotes} 
          onRestore={toggleComplete}
          onDelete={deleteNote}
        />
      </main>
    </div>
  );
};

export default App;