export interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  return {
    user: {
      id: '1',
      email: email
    }
  };
};

export const loginWithGoogle = () => {
  window.location.href = 'http://localhost:3001/api/auth/google';
};

export const logout = async (): Promise<void> => {
  return;
};

export const checkSession = async (): Promise<LoginResponse> => {
  return {
    user: {
      id: '1',
      email: 'test@example.com'
    }
  };
}; 