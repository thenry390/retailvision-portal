import { Alert, Button, Form, Input } from "antd";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import BrandMark from "../components/BrandMark";
import { useAuth } from "../features/auth/AuthContext";

interface LoginValues { email: string; password: string; }

export default function LoginPage() {
  const { user, login, loginAsDemo } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const destination = (location.state as { from?: string } | null)?.from ?? "/portal";

  if (user) return <Navigate to="/portal" replace />;

  async function submit(values: LoginValues) {
    setError("");
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate(destination, { replace: true });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  function useDemo(role: "executive" | "program" | "store" | "admin") {
    loginAsDemo(role);
    navigate("/portal", { replace: true });
  }

  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <Link to="/" className="back-link"><ArrowLeft size={16}/> Back to product site</Link>
        <BrandMark />
        <div className="login-brand-copy">
          <span className="eyebrow">SECURE OPERATIONS WORKSPACE</span>
          <h1>Turn every store program into a controlled execution plan.</h1>
          <p>Use a role-based demo account to explore RetailVision from different operational perspectives.</p>
        </div>
        <div className="login-trust-row"><ShieldCheck size={20}/><span>Prototype authentication · role-aware navigation · local session persistence</span></div>
      </section>

      <section className="login-form-panel">
        <div className="login-form-card">
          <span className="eyebrow">SPRINT 1 · AUTHENTICATION</span>
          <h2>Sign in to RetailVision</h2>
          <p className="form-intro">Use any valid email and a password of six or more characters, or select a demo role.</p>
          {error && <Alert type="error" showIcon message={error} />}
          <Form<LoginValues> layout="vertical" onFinish={submit} initialValues={{ email: "program@retailvision.demo", password: "demo123" }}>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Enter a valid email." }]}>
              <Input size="large" autoComplete="email" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, min: 6, message: "Use at least six characters." }]}>
              <Input.Password size="large" prefix={<LockKeyhole size={16}/>} autoComplete="current-password" />
            </Form.Item>
            <Button htmlType="submit" type="primary" size="large" block loading={loading}>SIGN IN</Button>
          </Form>
          <div className="demo-divider"><span>DEMO ROLES</span></div>
          <div className="demo-role-grid">
            <button onClick={() => useDemo("executive")}><strong>Executive</strong><span>Portfolio visibility</span></button>
            <button onClick={() => useDemo("program")}><strong>Program Manager</strong><span>Execution control</span></button>
            <button onClick={() => useDemo("store")}><strong>Store Manager</strong><span>Location workflow</span></button>
            <button onClick={() => useDemo("admin")}><strong>Administrator</strong><span>Full navigation</span></button>
          </div>
        </div>
      </section>
    </main>
  );
}
