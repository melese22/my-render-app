import { Task } from '../lib/supabase';
import { Pencil, Trash2, Clock, Flag } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  in_progress: 'bg-blue-100 border-blue-300 text-blue-800',
  completed: 'bg-green-100 border-green-300 text-green-800',
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-orange-100 text-orange-700',
  high: 'bg-red-100 text-red-700',
};

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className={`rounded-xl border-2 p-5 shadow-lg hover:shadow-xl transition-all transform hover:scale-102 ${statusColors[task.status]}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold flex-1 pr-4">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            title="Edit task"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="mb-4 opacity-90">{task.description}</p>
      )}

      <div className="flex gap-2 flex-wrap">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${priorityColors[task.priority]}`}>
          <Flag size={14} />
          {task.priority.toUpperCase()}
        </span>
        <span className="px-3 py-1 bg-white/50 rounded-full text-sm font-semibold flex items-center gap-1">
          <Clock size={14} />
          {task.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>
    </div>
  );
}
