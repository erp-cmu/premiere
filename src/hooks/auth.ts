import { useFrappeAuth } from "frappe-react-sdk";

function useAuth() {
  const {
    login,
    isLoading,
    isValidating,
    logout,
    error,
    currentUser,
    updateCurrentUser,
  } = useFrappeAuth();

  return {
    login,
    isLoading,
    logout,
    error,
    currentUser,
    updateCurrentUser,
    isValidating,
  };
}

export default useAuth;
