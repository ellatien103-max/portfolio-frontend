import avatarImg from './assets/photo.jpg.png';

function ProfileCard({ name, role, bio }) {
  const initials = name
    ?.split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <div className="profile-card">
      {avatarImg ? (
        <img src={avatarImg} alt={name} className="avatar-img" />
      ) : (
        <div className="avatar-placeholder">{initials}</div>
      )}
      <div className="profile-info">
        <h3>{name}</h3>
        <p className="profile-role">{role}</p>
        <p className="profile-bio">{bio}</p>
        <span className="diploma-badge">
          Software Engineering in training — in progress
        </span>
      </div>
    </div>
  );
}

export default ProfileCard;