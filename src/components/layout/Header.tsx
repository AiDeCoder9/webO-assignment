import { routePaths } from '@/routes/routes';
import { BsArrowLeft, BsFillLayersFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="d-flex">
        <div className="header-img">
          <BsFillLayersFill size={12} color="#fff" />
        </div>
        <Link className="header-btn" to={routePaths.dashboard}>
          <BsArrowLeft />
          Choose another category
        </Link>
      </div>
    </header>
  );
}
