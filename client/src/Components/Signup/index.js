import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import "./index.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Google login failed:", err);

      if (err.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled.");
      } else if (err.code === "auth/popup-blocked") {
        setError("Your browser blocked the popup. Please allow popups.");
      } else {
        setError("Unable to sign in with Google. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="signUpContainer">
      <div className="signup-background-glow" />

      <div className="signup-card">
        <div className="signup-brand">
          <div className="signup-brand-icon">↗</div>
          <span>
            STOCK<span className="brand-accent">PREDICTOR</span>
          </span>
        </div>

        <div className="signup-header">
          <div className="signup-eyebrow">AI-POWERED STOCK ANALYTICS</div>

          <h1>Welcome to StockPredictor</h1>

          <p>
            Explore stock predictions, analyze market trends, and track your
            investments in one place.
          </p>
        </div>

        <div className="signup-google-section">
          <button
            type="button"
            className="google-signin-button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <svg width="21" height="21" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.76 7.18l7.73 6C44.42 38.03 46.98 31.88 46.98 24.55z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.92-2.13 15.89-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>

            <span>
              {loading ? "Connecting to Google..." : "Continue with Google"}
            </span>
          </button>

          {error && (
            <div className="signup-error" role="alert">
              {error}
            </div>
          )}

          <p className="signup-security">
            Secure authentication powered by Google
          </p>
        </div>

        <div className="signup-footer">
          <span>◈</span>
          Smarter insights. Better decisions.
        </div>
      </div>
    </div>
  );
}
