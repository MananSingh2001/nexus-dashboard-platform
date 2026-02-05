import { useState, useEffect } from 'react';

interface User {
  roles: string[];
}

export const useAuth = () => {
  const [user, setUser] = useState<User>({ roles: ['ADMIN'] });

  useEffect(() => {
    // In a real app, this would integrate with your auth provider
    // For now, returning a mock user with ADMIN role
    setUser({ roles: ['ADMIN'] });
  }, []);

  return { user };
};
