import React from 'react'

import './styles.css'

function DevItem({ dev }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{ dev.name || dev.login }</strong>
          <span>{ dev.techs.join(', ') }</span>
        </div>
      </header>
      <p>{ dev.bio || <br/> }</p>
      <a 
        href={`https://github.com/${dev.github_username}`} 
        target="_blank" 
        rel="noreferrer"
      >
        Acessar perfil no Github
      </a>
    </li>
  );
}

export default DevItem;