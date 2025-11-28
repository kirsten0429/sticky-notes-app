export interface Note {
  id: string;
  content: string;
  createdAt: number;
  color: string;
  rotation: number;
  isCompleted: boolean;
}

export const NOTE_COLORS = [
  'bg-yellow-200',
  'bg-blue-200',
  'bg-pink-200',
  'bg-green-200',
  'bg-orange-200',
  'bg-purple-200',
];