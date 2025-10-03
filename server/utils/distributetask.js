/**
 * Distribute items equally among agents.
 * If remainder exists, distribute sequentially from first agent.
 * items: array
 * agents: array of agentIds (ObjectId or string)
 * returns: { [agentId]: array_of_items }
 */
function distribute(items, agents) {
  const result = {};
  const AgentsLen = agents.length;
  if (AgentsLen === 0) return result;

  // init arrays
  agents.forEach((a) => {
    result[a.toString()] = [];
  });

  const base = Math.floor(items.length / AgentsLen);
  let remainder = items.length % AgentsLen;

  let idx = 0;
  for (let i = 0; i < AgentsLen; i++) {
    const take = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;
    if (take > 0) {
      const slice = items.slice(idx, idx + take);
      result[agents[i].toString()] = slice;
      idx += take;
    } else {
      result[agents[i].toString()] = [];
    }
  }

  // safety: if any leftover, distribute round-robin
  while (idx < items.length) {
    const agentIndex = (idx - (items.length - idx)) % AgentsLen;
    const agentId = agents[agentIndex].toString();
    result[agentId].push(items[idx]);
    idx++;
  }

  return result;
}

export default distribute;
