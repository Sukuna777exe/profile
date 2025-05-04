import React, { useState, useEffect } from 'react';
import { Database } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const DatabaseStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [queryCount, setQueryCount] = useState(0);
  const [lastQuery, setLastQuery] = useState('');
  const [queryLog, setQueryLog] = useState<string[]>([]);
  
  // Simulate database queries
  useEffect(() => {
    const queries = [
      'SELECT * FROM users WHERE online = true',
      'INSERT INTO metrics (views, timestamp) VALUES (1, NOW())',
      'UPDATE user_status SET last_seen = NOW()',
      'SELECT COUNT(*) FROM visitors',
      'INSERT INTO logs (event, data) VALUES ("view", "profile")'
    ];
    
    // Simulate connection establishing
    setTimeout(() => {
      setConnectionStatus('connected');
      toast({
        title: "DATABASE CONNECTED",
        description: "Real-time data synchronization enabled",
        className: "bg-black/80 border-purple-500/30 text-cyan-400 font-mono",
      });
    }, 2000);
    
    // Simulate queries
    const interval = setInterval(() => {
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];
      setLastQuery(randomQuery);
      setQueryCount(prev => prev + 1);
      setQueryLog(prev => [randomQuery, ...prev.slice(0, 2)]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="profile-card p-4 animate-blur-in animate-delay-300 bg-black/40 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.2)]">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-blue-400" />
            <h3 className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-mono">DATABASE</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-blue-400">
              {connectionStatus === 'connected' ? 'ONLINE' : 'CONNECTING'}
            </span>
            <div 
              className={`h-2 w-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-400' : 'bg-yellow-400'
              } animate-pulse`}
            ></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-xs font-mono">
            <div className="flex justify-between text-blue-400/70">
              <span>STATUS:</span>
              <span className="text-cyan-300">{connectionStatus.toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-blue-400/70">
              <span>QUERIES:</span>
              <span className="text-cyan-300">{queryCount}</span>
            </div>
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-1"></div>
          
          <div className="bg-black/50 rounded-md p-2 border border-white/5 font-mono text-[10px] h-24 overflow-hidden">
            <p className="text-green-400 animate-pulse mb-1">LATEST QUERY:</p>
            <p className="text-cyan-300 whitespace-nowrap overflow-hidden text-ellipsis">{lastQuery}</p>
            
            <p className="text-green-400 mt-2 mb-1">LOG:</p>
            {queryLog.map((query, index) => (
              <p key={index} className="text-blue-400/60 whitespace-nowrap overflow-hidden text-ellipsis">
                $ {query}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseStatus;
