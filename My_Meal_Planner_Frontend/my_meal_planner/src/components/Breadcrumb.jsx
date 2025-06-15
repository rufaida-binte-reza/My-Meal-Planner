import { useLocation, Link } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex space-x-2">
        <li>
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((name, idx) => {
          const routeTo = '/' + pathnames.slice(0, idx + 1).join('/');
          const isLast = idx === pathnames.length - 1;

          return (
            <li key={idx} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="capitalize text-gray-500">{name.replaceAll('-', ' ')}</span>
              ) : (
                <Link to={routeTo} className="text-blue-600 hover:underline capitalize">
                  {name.replaceAll('-', ' ')}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
