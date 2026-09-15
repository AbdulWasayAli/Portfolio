import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <section className="not-found-container">
      {/* Decorative animated background elements */}
      <div className="not-found-bg-shape shape-1"></div>
      <div className="not-found-bg-shape shape-2"></div>
      <div className="not-found-bg-shape shape-3"></div>

      <div className="not-found-content">
        <div className="error-code-container">
          <h1 className="error-code">404</h1>
        </div>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Oops! It seems you've wandered into the digital void. The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="home-button">
          <span className="button-text">Go Back Home</span>
          <div className="button-glow"></div>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
