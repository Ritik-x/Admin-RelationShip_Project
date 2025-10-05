import { useState, useEffect } from "react";
import { agentAPI, taskAPI } from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAgents: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch agents
      const agentsResponse = await agentAPI.getAgents();
      const agents = agentsResponse.data;

      // Fetch tasks for each agent
      let allTasks = [];
      for (const agent of agents) {
        try {
          const tasksResponse = await taskAPI.getTasksByAgent(agent._id);
          const agentTasks = tasksResponse.data.map((task) => ({
            ...task,
            agentName: agent.name,
          }));
          allTasks = [...allTasks, ...agentTasks];
        } catch (error) {
          console.log(`No tasks for agent ${agent.name}`);
        }
      }

      const completedTasks = allTasks.filter((task) => task.completed).length;
      const pendingTasks = allTasks.filter((task) => !task.completed).length;

      setStats({
        totalAgents: agents.length,
        totalTasks: allTasks.length,
        completedTasks,
        pendingTasks,
      });

      setRecentTasks(allTasks.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your CRM system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Agents
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalAgents}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">📋</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Tasks
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalTasks}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Completed Tasks
                  </dt>
                  <dd className="text-lg font-medium text-green-600">
                    {stats.completedTasks}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Tasks
                  </dt>
                  <dd className="text-lg font-medium text-yellow-600">
                    {stats.pendingTasks}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Tasks
          </h3>
          <div className="mt-5">
            {recentTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No tasks found</p>
            ) : (
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {recentTasks.map((task) => (
                    <li key={task._id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              task.completed ? "bg-green-400" : "bg-yellow-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {task.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Agent: {task.agentName} • Phone: {task.phone}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-sm text-gray-500">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
