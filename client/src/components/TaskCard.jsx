import { useState } from "react";

const TaskCard = ({ task, onTaskUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      onTaskUpdate(task._id, { completed: !task.completed });
      setIsUpdating(false);
    }, 500);
  };

  return (
    <div
      className={`bg-white overflow-hidden shadow rounded-lg ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3
              className={`text-lg font-medium ${
                task.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>

            {/* Phone */}
            <p className="mt-1 text-sm text-gray-500">📞 {task.phone}</p>

            {/* Notes */}
            {task.notes && (
              <p className="mt-2 text-sm text-gray-600">{task.notes}</p>
            )}
          </div>

          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleToggleComplete}
              disabled={isUpdating}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                task.completed
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              } disabled:opacity-50`}
            >
              {isUpdating ? "..." : task.completed ? "Completed" : "Pending"}
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center text-xs text-gray-500">
          <span className="mr-2">📅</span>
          <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
