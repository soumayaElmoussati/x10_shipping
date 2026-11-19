
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye, EyeOff, LockKeyhole, Mail, ArrowRight,
  ShieldCheck, Globe2
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@x10shipping.com");
  const [password, setPassword] = useState("password123");

  const handleLogin = (e) => {
    e.preventDefault();
    // Démonstration frontend uniquement.
    localStorage.setItem("x10_admin", "true");
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="login-brand">
          <img src="/logo_x10_shipping.jpeg" alt="X10 Shipping" />
        </div>

        <div className="login-visual-content">
          <span className="eyebrow">
            <span className="live-dot" />
            LOGISTICS MANAGEMENT PLATFORM
          </span>

          <h1>
            Moving the world.
            <br />
            <span>Connecting destinations.</span>
          </h1>

          <p>
            One intelligent platform to manage shipments,
            coordinate carriers and control every delivery
            across the UAE and GCC.
          </p>

          <div className="login-features">
            <div>
              <ShieldCheck />
              <span>Secure operations</span>
            </div>
            <div>
              <Globe2 />
              <span>UAE & GCC coverage</span>
            </div>
          </div>
        </div>

        <div className="login-footer">
          © 2026 X10 Shipping. All rights reserved.
        </div>
      </div>

      <div className="login-form-side">
        <div className="login-mobile-logo">
          <img src="/logo_x10_shipping.jpeg" alt="X10 Shipping" />
        </div>

        <div className="login-form-wrapper">
          <div className="login-heading">
            <span className="login-icon">
              <LockKeyhole size={22} />
            </span>
            <span className="eyebrow">ADMINISTRATION PORTAL</span>
            <h2>Welcome back</h2>
            <p>
              Sign in to access your X10 Shipping workspace.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-field">
              <label>Email address</label>
              <div className="input-wrapper">
                <Mail size={19} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <div className="password-label">
                <label>Password</label>
                <a href="#forgot">Forgot password?</a>
              </div>

              <div className="input-wrapper">
                <LockKeyhole size={19} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword
                    ? <EyeOff size={19} />
                    : <Eye size={19} />}
                </button>
              </div>
            </div>

            <label className="remember-me">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>

            <button type="submit" className="login-submit">
              Sign in to dashboard
              <ArrowRight size={19} />
            </button>
          </form>

          <div className="login-security">
            <ShieldCheck size={17} />
            Protected administrative access
          </div>
        </div>

        <div className="login-bottom">
          <span>English (US)</span>
          <span>Privacy Policy</span>
          <span>Help Center</span>
        </div>
      </div>
    </div>
  );
}
