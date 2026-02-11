import { useFrappeAuth } from "frappe-react-sdk";
import { useNavigate } from "react-router";

export function useAuthGuard() {
  const { currentUser, isLoading } = useFrappeAuth();
  const navigate = useNavigate();
  if (!isLoading && !currentUser) {
    navigate("/unauthorized");
  }
}
