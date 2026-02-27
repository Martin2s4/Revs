export type UserRole = 
  | 'super_admin' 
  | 'revenue_manager' 
  | 'revenue_collector' 
  | 'licensing_officer' 
  | 'auditor' 
  | 'citizen';

export interface User {
  username: string;
  name: string;
  role: UserRole;
}
