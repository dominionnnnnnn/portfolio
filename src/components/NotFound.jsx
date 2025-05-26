import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center p-8 mt-18">
      <h1 className="text-4xl font-bold mb-4 ">404 - Page Not Found</h1>
      <p className="mb-4">The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-500 underline">Go Home</Link>
    </div>
  );
};

export default NotFound;
