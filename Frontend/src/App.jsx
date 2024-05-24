import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [statuses, setStatuses] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        setCounter(x => x + 1);
        const response = await axios.get('https://pingingservice.onrender.com/trigger-health-check');
        const data = response.data;
        setStatuses(data);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
    const intervalId = setInterval(fetchStatuses, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-black">
      <header className="App bg-black">
        <h1 className="text-white">Pinging Service Dashboard</h1>
        
        <p className="text-white">Health check attempts: {counter}</p>
        <div className="status-container">
          {statuses.map((status, index) => (
            <div
              key={index}
              className={`status-box ${status.status === 'UP' ? 'bg-green-500' : 'bg-red-500'}`}
            >
              <span className="text-white">{status.url}: {status.status}</span>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
