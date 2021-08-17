import React, { useCallback, useState, useEffect } from 'react';
import api from './services/api';

import './globo.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const listDevs = await api.get('/devs');
      
      setDevs(listDevs.data);
    }
    loadDevs();
  }, []);

  const handleAddDev = useCallback(
    async (data) => {
      const checkUser = devs.filter(dev => dev.github_username === data.github_username);
      
      if(checkUser.length === 0) {
        const response = await api.post('/devs', data);
        console.log('Okay');
        setDevs([...devs, response.data]);
      } else {
        alert('User já cadastrado');
      }
    },
    [devs],
  )

  return (
   <div id="app">
     <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
     </aside>

     <main>
      <ul>
        { devs.map(dev => <DevItem key={dev._id} dev={dev} /> ) }
      </ul>
     </main>
   </div>
  );
}

export default App;
