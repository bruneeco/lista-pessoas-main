import  './UserCard.css';

function UserCard({ user, onClick }) {
// exibe o cartão com informaçoes basicas do usuario.
 // quando clicado ele chama a funcao onClick e vai para o usuario selecionado
  return (
    <a onClick={() => onClick(user)} style={{ cursor: 'pointer' }}>
    <div className="user-card">
      <img src={user.avatar} alt={`${user.firstname} avatar`}  />
      <h3 className="name">{user.firstname} {user.lastname}</h3>
      <p>{user.email}</p>
      <small>{user.address}</small>
    </div>
    </a>
  );
}

export default UserCard;