
// Advanced permissions system for NOG Performance Dashboard

// User roles in order of increasing permissions
export type UserRole = 'client' | 'analyst' | 'manager' | 'admin' | 'owner';

// Permission types for different actions
export type Permission = 
  | 'view_dashboard'
  | 'view_campaigns'
  | 'edit_campaigns'
  | 'create_campaigns'
  | 'delete_campaigns'
  | 'view_clients'
  | 'edit_clients'
  | 'create_clients'
  | 'delete_clients'
  | 'view_observations'
  | 'create_observations'
  | 'edit_observations'
  | 'view_automations'
  | 'create_automations'
  | 'view_reports'
  | 'generate_reports'
  | 'send_reports'
  | 'view_settings'
  | 'edit_settings'
  | 'edit_branding'
  | 'manage_integrations'
  | 'manage_permissions'
  | 'view_all_companies'
  | 'manage_companies';

// Default permissions for each role
const rolePermissions: Record<UserRole, Permission[]> = {
  client: [
    'view_dashboard',
    'view_campaigns',
    'view_observations',
    'view_reports'
  ],
  analyst: [
    'view_dashboard',
    'view_campaigns',
    'edit_campaigns',
    'create_campaigns',
    'view_clients',
    'view_observations',
    'create_observations',
    'edit_observations',
    'view_reports',
    'generate_reports'
  ],
  manager: [
    'view_dashboard',
    'view_campaigns',
    'edit_campaigns',
    'create_campaigns',
    'delete_campaigns',
    'view_clients',
    'edit_clients',
    'view_observations',
    'create_observations',
    'edit_observations',
    'view_automations',
    'create_automations',
    'view_reports',
    'generate_reports',
    'send_reports',
    'view_settings',
    'edit_branding',
    'manage_integrations'
  ],
  admin: [
    'view_dashboard',
    'view_campaigns',
    'edit_campaigns',
    'create_campaigns',
    'delete_campaigns',
    'view_clients',
    'edit_clients',
    'create_clients',
    'delete_clients',
    'view_observations',
    'create_observations',
    'edit_observations',
    'view_automations',
    'create_automations',
    'view_reports',
    'generate_reports',
    'send_reports',
    'view_settings',
    'edit_settings',
    'edit_branding',
    'manage_integrations',
    'manage_permissions',
    'view_all_companies'
  ],
  owner: [
    'view_dashboard',
    'view_campaigns',
    'edit_campaigns',
    'create_campaigns',
    'delete_campaigns',
    'view_clients',
    'edit_clients',
    'create_clients',
    'delete_clients',
    'view_observations',
    'create_observations',
    'edit_observations',
    'view_automations',
    'create_automations',
    'view_reports',
    'generate_reports',
    'send_reports',
    'view_settings',
    'edit_settings',
    'edit_branding',
    'manage_integrations',
    'manage_permissions',
    'view_all_companies',
    'manage_companies'
  ]
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId: string;
  // Optional custom permissions to override role defaults
  customPermissions?: {
    grant?: Permission[];
    revoke?: Permission[];
  };
}

// Check if a user has a specific permission
export const hasPermission = (user: User, permission: Permission): boolean => {
  if (!user) return false;
  
  // Start with the default permissions for the user's role
  let permissions = [...rolePermissions[user.role]];
  
  // Apply custom permissions if defined
  if (user.customPermissions) {
    // Add granted permissions
    if (user.customPermissions.grant) {
      permissions = [...permissions, ...user.customPermissions.grant];
    }
    
    // Remove revoked permissions
    if (user.customPermissions.revoke) {
      permissions = permissions.filter(p => !user.customPermissions!.revoke!.includes(p));
    }
  }
  
  return permissions.includes(permission);
};

// Get all permissions for a user
export const getUserPermissions = (user: User): Permission[] => {
  if (!user) return [];
  
  // Start with the default permissions for the user's role
  let permissions = [...rolePermissions[user.role]];
  
  // Apply custom permissions if defined
  if (user.customPermissions) {
    // Add granted permissions
    if (user.customPermissions.grant) {
      permissions = [...permissions, ...user.customPermissions.grant];
    }
    
    // Remove revoked permissions
    if (user.customPermissions.revoke) {
      permissions = permissions.filter(p => !user.customPermissions!.revoke!.includes(p));
    }
  }
  
  // Remove duplicates
  return [...new Set(permissions)];
};

// Check if a user can access a route
export const canAccessRoute = (user: User, route: string): boolean => {
  // Define route permissions
  const routePermissionsMap: Record<string, Permission> = {
    '/agency-dashboard': 'view_dashboard',
    '/agency-dashboard/campanhas': 'view_campaigns',
    '/agency-dashboard/clients': 'view_clients',
    '/agency-dashboard/observacoes': 'view_observations',
    '/agency-dashboard/automacoes': 'view_automations',
    '/agency-dashboard/relatorios': 'view_reports',
    '/agency-dashboard/configuracoes': 'view_settings',
    '/agency-dashboard/branding': 'edit_branding',
    '/agency-dashboard/integracoes': 'manage_integrations',
    // Add more routes as needed
  };
  
  // Find the most specific route permission
  const matchingRoutes = Object.keys(routePermissionsMap)
    .filter(r => route.startsWith(r))
    .sort((a, b) => b.length - a.length); // Sort by length descending
  
  if (matchingRoutes.length === 0) {
    return true; // No specific permission required for this route
  }
  
  const requiredPermission = routePermissionsMap[matchingRoutes[0]];
  return hasPermission(user, requiredPermission);
};

// Create a permission guard component/hook
export const createPermissionGuard = (user: User) => {
  return {
    can: (permission: Permission) => hasPermission(user, permission),
    canAccess: (route: string) => canAccessRoute(user, route),
    getPermissions: () => getUserPermissions(user)
  };
};
