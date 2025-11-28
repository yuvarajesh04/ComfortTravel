import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "../../styles/register.css";
import { useAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";

export interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "admin" | "user";
}

const Register: React.FC = () => {
  const { registration, user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  React.useEffect(() => {
    if (user?.userType === 'admin')
      navigate('/admin/home')
    else if (user?.userType === "user")
      navigate('/user/home')
  }, [user])

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setLoading(true);
    try {
      alert()

      const response = await registration(data);

      alert(JSON.stringify(response))

      if (response?.success) {
        reset();
        setLoading(false);
        if (response?.user?.userType === 'admin')
          navigate('/admin/home')
        else if (response?.user?.userType === "user")
          navigate('/user/home')
      } else {
        setErrorMessage(response?.message || "Registration failed.");
        setLoading(false)
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
      setLoading(false)
    }
  };

  const password = watch("password");

  return (
    <div
      className="container register-component mt-5"
      style={{ maxWidth: "500px" }}
    >
      <h2
        className="text-center mb-2"
        style={{ color: "var(--primary-color)" }}
      >
        Comfort Travels
      </h2>
      <h6
        className="text-center fw-light"
        style={{ fontSize: "14px" }}
      >
        Welcome to our travel company
      </h6>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name", { required: "Name is required" })}
            placeholder="John Doe"
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
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
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
              }`}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        {/* User Type (Dropdown) */}
        <div className="mb-3">
          <label className="form-label">User Type</label>
          <select
            className={`form-select ${errors.userType ? "is-invalid" : ""}`}
            {...register("userType", { required: "User type is required" })}
          >
            <option value="">Select user type</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.userType && (
            <div className="invalid-feedback">{errors.userType.message}</div>
          )}
        </div>

        {errorMessage && <p className="text-danger" style={{ fontSize: '14px' }}>{errorMessage}</p>}

        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p
          className="text-center my-2 fw-light"
          style={{ fontSize: "14px" }}
        >
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
