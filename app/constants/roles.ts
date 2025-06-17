export const USER_ROLES = {
    ADMIN: 'admin',
    PROJECT_MANAGER: 'project_manager', 
    DEVELOPER: 'developer',
    MERCHANT: 'merchant'
  } as const;
  
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
  
export const isValidRole = (role: string): role is UserRole => {
    return Object.values(USER_ROLES).includes(role as UserRole);
};