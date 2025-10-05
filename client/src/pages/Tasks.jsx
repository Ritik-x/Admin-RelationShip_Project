import { useState, useEffect } from "react";
import { agentAPI, taskAPI } from "../services/api";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    if (selectedAgent) {
      fetchTasks(selectedAgent);
    } else {
      setTasks([]);
    }
  }, [selectedAgent]);
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await agentAPI.getAgents();
      setAgents(response.data);
    } catch (error) {
      setError("Failed to fetch agents");
      console.error("Error fetching agents:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async (agentId) => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasksByAgent(agentId);
      setTasks(response.data);
    } catch (error) {
      setError("Failed to fetch tasks");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = (taskId, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  if (loading && agents.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage tasks assigned to agents
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Agent Selector */}
      <div className="bg-white shadow rounded-lg p-6">
        <label
          htmlFor="agent-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Agent
        </label>
        <select
          id="agent-select"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Choose an agent...</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name} ({agent.email})
            </option>
          ))}
        </select>
      </div>

      {/* Tasks List */}
      {selectedAgent && (
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 bg-white shadow rounded-lg">
              <span className="text-6xl">📋</span>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No tasks
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This agent has no assigned tasks.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onTaskUpdate={handleTaskUpdate}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {!selectedAgent && (
        <div className="text-center py-12 bg-white shadow rounded-lg">
          <span className="text-6xl">👆</span>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Select an Agent
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Choose an agent from the dropdown above to view their tasks.
          </p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
