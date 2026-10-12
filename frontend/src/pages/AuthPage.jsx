import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  login,
  register,
  requestRegisterOTP,
  verifyRegisterOTP,
} from "../api/auth";
import logo from "../assets/logo.png";
import {
  User,
  Mail,
  Lock,
  Building2,
  ArrowRight,
  CalendarDays,
  Shield,
  Zap,
  BadgeCheck,
} from "lucide-react";
import { authPageStyles as s } from "../utils/dummystyle";

const initialForm = {
  name: "",
  email: "",
  password: "",
  businessName: "",
  emailOtp: "",
};

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSentTo, setOtpSentTo] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [otpCooldown, setOtpCooldown] = useState(0);

  const isRegister = mode === "register";
  const fromLocation = location.state?.from;
  const redirectTo = fromLocation
    ? `${fromLocation.pathname}${fromLocation.search || ""}`
    : "/profile";

  // OTP resend cooldown timer
  useEffect(() => {
    if (otpCooldown <= 0) return;

    const interval = setInterval(() => {
      setOtpCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [otpCooldown]);

  const handleChange = async (event) => {
    const { name, value } = event.target;

    if (name === "emailOtp") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 6);
      setForm((prev) => ({ ...prev, emailOtp: digitsOnly }));

      if (otpVerified) setOtpVerified(false);

      if (digitsOnly.length === 6 && form.email) {
        try {
          await verifyRegisterOTP({
            email: form.email,
            emailOtp: digitsOnly,
          });
          setOtpVerified(true);
          setMessage("Email verified successfully!");
        } catch (error) {
          setOtpVerified(false);
          setMessage(error.response?.data?.message || "Invalid OTP!");
        }
      }
      return;
    }

    if (name === "email") {
      setOtpVerified(false);
      setOtpSentTo("");
      setForm((prev) => ({
        ...prev,
        email: value,
        emailOtp: "",
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendOtp = async () => {
    if (!form.email) {
      setMessage("Enter your email!");
      return;
    }

    setOtpLoading(true);
    setMessage("");

    try {
      await requestRegisterOTP(form.email);
      setOtpSentTo(form.email.trim().toLowerCase());
      setOtpVerified(false);
      setOtpCooldown(30);
      setMessage("Verification code sent to your email!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not send OTP!");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = isRegister
        ? form
        : { email: form.email, password: form.password };

      const { data } = await (isRegister ? register(payload) : login(payload));
      console.log(data.token)

      if (data.token) {
        Cookies.set("token", data.token);
      }

      navigate(redirectTo, { replace: true });
    } catch (error) {
      setMessage(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.pageBg}>
      <div className={s.gridContainer}>
        {/* Left: branding */}
        <section className={s.brandSection}>
          <div className={s.logoRow}>
            <img src={logo} className={s.logoImg} alt="BookMe logo" />
            <span className={s.brandName}>BookMe</span>
          </div>

          <h1 className={s.mainHeading}>
            A calm booking desk for{" "}
            <span className={s.gradientText}>Small Business</span>
          </h1>

          <p className={s.subtitle}>
            Create your business profile, add services, set availability, and
            share one clean booking link.
          </p>

          <div className={s.featureGrid}>
            <div className={s.featureCard}>
              <div className={s.featureIconWrapPurple}>
                <CalendarDays className={s.featureIconPurple} />
              </div>
              <div>
                <p className={s.featureTitle}>Easy setup</p>
                <p className={s.featureDesc}>Get started in minutes</p>
              </div>
            </div>
         

          {/* <div className={s.featureGrid}> */}
            <div className={s.featureCard}>
              <div className={s.featureIconWrapEmerald}>
                <Shield className={s.featureIconEmerald} />
              </div>
              <div>
                <p className={s.featureTitle}>Secure</p>
                <p className={s.featureDesc}>Safe for payments</p>
              </div>
            </div>
          {/* </div> */}

          {/* <div className={s.featureGrid}> */}
            <div className={s.featureCard}>
              <div className={s.featureIconWrapAmber}>
                <Zap className={s.featureIconAmber} />
              </div>
              <div>
                <p className={s.featureTitle}>Fast</p>
                <p className={s.featureDesc}>Instant booking link</p>
              </div>
            </div>
             </div>
          {/* </div> */}
        </section>

        {/* Right: auth form */}
        <section className={s.formCard}>
          <h2 className={s.formHeading}>
            {isRegister ? "Create account" : "Welcome back"}
          </h2>
          <p className={s.formSubtitle}>
            {isRegister
              ? "Set up your business in minutes"
              : "Log in to manage your bookings"}
          </p>

          <form onSubmit={handleSubmit} className={s.form}>
            {isRegister && (
              <>
                <div>
                  <label className={s.inputLabel}>Name</label>
                  <div className={s.inputWrapper}>
                    <User className={s.inputIcon} />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={s.inputField}
                    />
                  </div>
                </div>

                <div>
                  <label className={s.inputLabel}>Business name</label>
                  <div className={s.inputWrapper}>
                    <Building2 className={s.inputIcon} />
                    <input
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
                      placeholder="Your business name"
                      className={s.inputField}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className={s.inputLabel}>Email</label>
              <div className={s.inputWrapper}>
                <Mail className={s.inputIcon} />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={s.inputField}
                />
              </div>
            </div>

            {isRegister && (
              <div className={s.otpContainer}>
                <label className={s.otpLabel}>Email verification code</label>
                <div className={s.otpGrid}>
                  <input
                    name="emailOtp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={form.emailOtp}
                    onChange={handleChange}
                    className={s.otpField}
                    placeholder="Enter 6-digit code"
                    autoComplete="one-time-code"
                    pattern="[0-9]*"
                  />
                  {otpVerified ? (
                    <button
                      type="button"
                      disabled
                      className={s.otpVerifiedButton}
                    >
                      <BadgeCheck className={s.otpVerifiedIcon} />
                      Verified
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={otpLoading || !form.email || otpCooldown > 0}
                      className={s.otpButton}
                    >
                      {otpLoading
                        ? "Sending..."
                        : otpCooldown > 0
                          ? `Resend code (${otpCooldown}s)`
                          : otpSentTo === form.email.trim().toLowerCase()
                            ? "Resend code"
                            : "Send code"}
                    </button>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className={s.inputLabel}>Password</label>
              <div className={s.inputWrapper}>
                <Lock className={s.inputIcon} />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={s.inputField}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className={s.submitBtn}>
              {loading
                ? "Please wait..."
                : isRegister
                  ? "Create account"
                  : "Log in"}
              <ArrowRight className={s.submitIcon} />
            </button>

            {message && <p className={s.message}>{message}</p>}
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(isRegister ? "login" : "register");
              setMessage("");
            }}
            className={s.toggleMode}
          >
            {isRegister
              ? "Already have an account? Log in"
              : "Need an account? Register"}
          </button>
        </section>
      </div>
      <div className={s.footerLinks}>
        <Link to="/privacy" className={s.footerLink}>Privacy Policy</Link>
        <Link to="/terms" className={s.footerLink}>Terms of Services</Link>

      </div>
    </div>
  );
};

export default AuthPage;
