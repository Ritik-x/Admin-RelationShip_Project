const AgentCard = ({ agent }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {agent.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-medium text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.email}</p>
            <p className="text-sm text-gray-500">{agent.mobile}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">📅</span>
            <span>Joined {new Date(agent.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
