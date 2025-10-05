import { useState, useEffect } from "react";
import { agentAPI } from "../services/api";
import AgentForm from "../components/AgentForm";
import AgentCard from "../components/AgentCard";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAgents();
  }, []);

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

  const handleAgentCreated = (newAgent) => {
    setAgents([...agents, newAgent]);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your team of agents
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add Agent
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <AgentForm
          onAgentCreated={handleAgentCreated}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent._id} agent={agent} />
        ))}
      </div>
      {agents.length === 0 && !loading && (
        <div className="text-center py-12">
          <span className="text-6xl">👥</span>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No agents</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new agent.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Add Agent
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agents;
