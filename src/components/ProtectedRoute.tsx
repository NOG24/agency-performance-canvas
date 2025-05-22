
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { UserRole } from '@/utils/permissionsSystem';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredPermission
}) => {
  const { user, isLoading, can, canAccess } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    // You could render a loading spinner here
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Check if user is authenticated
  if (!user) {
    // Redirect to login page and save the intended destination
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }
  
  // Check for required role
  if (requiredRole && user.role !== requiredRole && user.role !== 'admin' && user.role !== 'owner') {
    // User doesn't have the required role
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Check for required permission
  if (requiredPermission && !can(requiredPermission as any)) {
    // User doesn't have the required permission
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Check if user can access this route based on permissions
  if (!canAccess(location.pathname)) {
    // User doesn't have permission to access this route
    return <Navigate to="/unauthorized" replace />;
  }
  
  // All checks passed, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
