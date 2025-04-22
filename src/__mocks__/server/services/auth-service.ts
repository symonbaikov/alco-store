export const checkSession = jest.fn().mockResolvedValue({
  isAuthenticated: false,
  user: null
}); 