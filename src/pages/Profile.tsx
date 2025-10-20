import { useAuth } from '../hooks/useAuth';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2>{user.name}</h2>
        </div>

        <div className="profile-info">
          <div className="info-group">
            <label>ID de Usuario</label>
            <p>{user.userId}</p>
          </div>

          <div className="info-group">
            <label>Nombre</label>
            <p>{user.name}</p>
          </div>

          <div className="info-group">
            <label>Email</label>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
