import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "../../styles/login.css";
import { useAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  React.useEffect(() => {
    if (user?.userType === 'admin')
      navigate('/admin/home')
    else if (user?.userType === "user")
      navigate('/user/home')
  }, [user])

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = React.useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {

    setLoading(true)

    try {
      const response = await login(data.email, data.password);

      if (response?.success) {
        reset();

        setLoading(false);

        if (response?.user?.userType === 'admin')
          navigate('/admin/home')

        else if (response?.user?.userType === "user")
          navigate('/user/home')
      }
    } catch (error) {

      setLoading(false)

      console.error('login error', error)
    }
  };

  return (
    <div
      className="container login-component mt-5"
      style={{ maxWidth: "500px" }}
    >
      <h2
        className="text-center mb-2"
        style={{ color: "var(--primary-color)" }}
      >
        Comfort Travels
      </h2>
      <h6 className="text-center fw-light" style={{ fontSize: "14px" }}>
        Welcome back! Please login to your account
      </h6>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-3 position-relative">
          <label className="form-label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {/* Eye toggle */}
          <span
            className="position-absolute end-0 top-50 translate-middle-y me-3"
            style={{ cursor: "pointer" }}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              style={{ fontSize: "1.1rem", color: "gray" }}
            ></i>
          </span>
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          disabled={loading}
        >
          {loading ? 'Please wait!' : 'Login'}
        </button>

        <p
          className="text-center my-2 fw-light"
          style={{ fontSize: "14px" }}
        >
          Don't have an account? <a href="/">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
