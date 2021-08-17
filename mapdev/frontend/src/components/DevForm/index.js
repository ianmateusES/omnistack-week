import React, { useState, useCallback, useEffect } from 'react';

import './styles.css'

function DevForm({ onSubmit }) {
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      await onSubmit({
        github_username,
        techs,
        latitude,
        longitude
      });

      setGithub_username('');
      setTechs('');
    },
    [github_username, techs, latitude, longitude, onSubmit],
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input 
          id="github_username" 
          name="github_username" 
          required
          value={github_username}
          onChange={event => setGithub_username(event.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input 
          id="techs" 
          name="techs" 
          required
          value={techs}
          onChange={event => setTechs(event.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input 
            id="latitude" 
            name="latitude" 
            required
            value={latitude}
            onChange={event => setLatitude(event.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input 
            id="longitude" 
            name="longitude" 
            required
            value={longitude}
            onChange={event => setLongitude(event.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}


export default DevForm;
