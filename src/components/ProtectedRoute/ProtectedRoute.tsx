import { useEffect, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { getUser } from '../../redux/selectors';
import { RootState } from '../../redux/store';

interface ProtectedRouteProps {
    children: ReactNode;
    anonymous?: boolean;
  }

function ProtectedRoute({
  children,
  anonymous = false, // prop anonymus is used to indicate routes that can be visited anonymusly (without authrization). We set it fasle for protected routes
}: ProtectedRouteProps) {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const from = location.state?.from || '/';
//   const currentUser = useSelector(getUser);
useEffect(() => {
    console.log('User state changed in ProtectedRoute:', user);
  }, [user]);

  if (anonymous && user) {
    // navigate logged in user back if he tries to reach the route available only for not logged in users
    return <Navigate to={from} />;
  }

  if (!anonymous && !user) {
    // If user isn't logged in, return a Navigate component that sends the user to /login
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  // Otherwise, render the protected route's child component.
  return children;
}

export default ProtectedRoute;
