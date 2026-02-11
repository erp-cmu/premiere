import useAuth from "@/hooks/auth";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const { login, isLoading, isValidating, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ username: email, password });
      navigate("/");
      // For some reanson, the state in Layout doesn't update immediately after login
      // so we force a reload to reflect the logged-in state.
      // However, the logout function works fine without a reload.
      // I think this is a bug in frappe-react-sdk.
      window.location.reload();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  if (isLoading || isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center mb-6">Log In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="alert alert-error shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m8-8a8 8 0 110 16 8 8 0 010-16zm0 0h.01"
                  />
                </svg>
                <span>{error.message}</span>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || isValidating}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading || isValidating}
              />
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
