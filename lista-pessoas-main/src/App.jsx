// Importações principais
import { useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import UserProfile from './components/UserProfile.jsx';
import './App.css';

function App() {
  // Estados para armazenar usuários, página atual e seleção de perfil
  const [usuarios, setUsuarios] = useState([]);
  const [pagina, setPagina] = useState(1);
  const limitePorPagina = 4;
  const [perfilSelecionado, setPerfilSelecionado] = useState(null);

  // Requisição para buscar os dados dos usuários
  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const resposta = await fetch('http://localhost:3001/peoples');
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (erro) {
        console.error('Erro ao carregar dados dos usuários:', erro);
      }
    };

    carregarUsuarios();
  }, []);

  // Calcula de quais usuários devem ser exibidos na página atual
  const inicio = (pagina - 1) * limitePorPagina;
  const fim = pagina * limitePorPagina;
  const usuariosNaPagina = usuarios.slice(inicio, fim);

  // Funcoes de navegaçao
  const proximaPagina = () => {
    const totalPaginas = Math.ceil(usuarios.length / limitePorPagina);
    if (pagina < totalPaginas) {
      setPagina(pagina + 1);
    }
  };

  const paginaAnterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  // Lógica de exibição do perfil selecionado
  const exibirPerfil = (usuario) => {
    setPerfilSelecionado(usuario);
  };

  const voltarAoDashboard = () => {
    setPerfilSelecionado(null);
  };

  return (
    <div className="App">
      {perfilSelecionado ? (
        <UserProfile user={perfilSelecionado} onVoltar={voltarAoDashboard} />
      ) : (
        <>
          <h1>Painel de Usuários</h1>
          <p>Usuários encontrados: {usuarios.length}</p>

          <div className="user-container">
            {usuariosNaPagina.map((usuario) => (
              <UserCard key={usuario.id} user={usuario} onClick={exibirPerfil} />
            ))}
          </div>

          <div className="paginas">
            <button onClick={paginaAnterior} disabled={pagina === 1}>
              &lt;
            </button>
            <span>
              Página {pagina} de {Math.ceil(usuarios.length / limitePorPagina)}
            </span>
            <button
              onClick={proximaPagina}
              disabled={pagina === Math.ceil(usuarios.length / limitePorPagina)}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
