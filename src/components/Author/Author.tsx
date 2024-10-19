import './Author.css';
import { AuthorProps } from './types';
import { useImageUrl } from '../../hooks/useImageUrl';

function Author({
  hostAvatar,
  hostName,
  residentAvatar,
  residentName,
  residentSpecies,
  placement,
}: AuthorProps) {

  const hostAvatarUrl = useImageUrl(hostAvatar);
  const residentAvatarUrl = useImageUrl(residentAvatar);

  return (
    <div className={`author ${placement}__author`}>
      <div className="author__avatars">
        <img className="author__avatar" src={hostAvatarUrl} alt={hostName} />
        <img
          className="author__avatar"
          src={residentAvatarUrl}
          alt={residentName}
        />
      </div>
      <div className="author__info">
        <div className="author__info-wrapper">
          <h2 className="author__resident-name">{residentName}</h2>
          <p className="author__species">{residentSpecies}</p>
        </div>
        <p className="author__host-name">Hosted by {hostName}</p>
      </div>
    </div>
  );
}

export default Author;
