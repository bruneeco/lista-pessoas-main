import { useState, useEffect } from 'react'; 
import UserCard from './components/UserCard'; 
import UserProfile from './components/UserProfile.jsx';
import './App.css'; 

function App() {
  // estados para armazenar a dados que podem ser alterados
  const [usuarios, setUsuarios] = useState([]);
  const [pagina, setPagina] = useState(1);
  const limitePorPagina = 4; 
  const [perfilSelecionado, setPerfilSelecionado] = useState(null); 


  // faz a requisiçao dos usuarios 
  useEffect(() => {
    fetch('http://localhost:3001/peoples') 
      .then((res) => res.json()) 
      .then((data) => setUsuarios(data)) 
      .catch((err) => console.error('Erro ao buscar usuários:', err)); 
  }, []);

  // calcula o indice inicial e final dos usuarios que vão aparecer na página atual
  const inicio = (pagina - 1) * limitePorPagina; // Ex: página 2 => (2 - 1) * 4 = 4
  const fim = pagina * limitePorPagina; // Ex: 2 * 4 = 8
  const usuariosNaPagina = usuarios.slice(inicio, fim); // seleciona apenas os usuarios da pagina atual

  // função para avançar para a proxima pagina
  const proximaPagina = () => {
    const totalPaginas = Math.ceil(usuarios.length / limitePorPagina); //total de paginas com base na quantidade de usuários
    //math.ceil arredonda para cima o valor, garantindo que se houver um usuario a mais, uma nova pagina seja criada
    if (pagina < totalPaginas) { // só avança se ainda houver mais paginas
      setPagina(pagina + 1);
    }
  };

  // função para voltar para a pagina anterior
  const paginaAnterior = () => {
    if (pagina > 1) { // só volta se não estiver na primeira pagina
      setPagina(pagina - 1);
    }
  };

  // função que define qual perfil de usuario será exibido
  const exibirPerfil = (usuario) => {
    setPerfilSelecionado(usuario); // armazena o usuario clicado
  };

  // função que limpa o perfil selecionado e volta para a lista
  const voltarAoDashboard = () => {
    setPerfilSelecionado(null); // reseta o estado, escondendo o perfil
  };

  // renderiza o perfil do usuario se houver um selecionado,
  // caso contrario, mostra a lista com os botões de navegação
  return (
    <div className="App">
      {perfilSelecionado ? (
        // mostra o perfil do usuario selecionado
        <UserProfile user={perfilSelecionado} onVoltar={voltarAoDashboard} />
      ) : (
        <>
          <h1>Painel de Usuários</h1>
          <p>Usuários encontrados: {usuarios.length}</p>

          {/* lista os usuarios da pagina atual */}
          <div className="user-container">
            {usuariosNaPagina.map((usuario) => (
              <UserCard key={usuario.id} user={usuario} onClick={exibirPerfil} />
            ))}
          </div>

          {/* controles de navegação de paginas */}
          <div className="paginas">
            <button onClick={paginaAnterior} disabled={pagina === 1}>
              &lt; {/* seta para esquerda */}
            </button>
            <span>
              Página {pagina} de {Math.ceil(usuarios.length / limitePorPagina)}
            </span>
            <button
              onClick={proximaPagina}
              disabled={pagina === Math.ceil(usuarios.length / limitePorPagina)}
            >
              &gt; {/* seta para direita */}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App; 
