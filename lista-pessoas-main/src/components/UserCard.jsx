import  './UserCard.css';

function UserCard({ user, onClick }) {
  //retorna o avatar que mostra a foto e os dados no dashboard ativado pelo on click
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