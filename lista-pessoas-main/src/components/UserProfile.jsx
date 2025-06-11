import './UserProfile.css';


//retorna o perfil do usuário com os dados que foram passados no card
function UserProfile({ user, onVoltar }) {
    return (
      <div className="user-profile">
        <div className="back-button">
        <button className='x' onClick={onVoltar}>✖</button>
        </div>
        <h1>{user.firstname} {user.lastname}</h1>

        <img className="foto" src={user.avatar} alt={`${user.firstname} avatar`} />
        <p className='escrita'><strong>Nome:</strong> {user.firstName} {user.lastName}</p>
        <p className='escrita'><strong>Email:</strong> {user.email}</p>
        <p className='escrita'><strong>Elemento Químico Favorito:</strong> {user.ChemicalElement}</p>
        <p className='escrita'><strong>Telefone:</strong> {user.telephone}</p>
        <p className='escrita'><strong>Endereço:</strong> {user.addres}</p>
      </div>
    );
  }
  
  export default UserProfile;