import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import '../../styles/register.css';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data:any) => {
    console.log("Form Data:", data);
  };

  const password = watch("password");

  return (
    <div className="container register-component mt-5" style={{ maxWidth: "500px" }}>
          <h2 className="text-center mb-2" style={{ color: "var(--primary-color)" }}>Comfort Travels</h2>
          <h6 className="text-center fw-light" style={{fontSize: '14px'}}>Welcome to our travel company</h6>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name", { required: "Name is required" })}
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
            type="text"
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value: any) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <button type="submit" className="btn w-100" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
          Register
              </button>
              
              <p className="text-center my-2 fw-light" style={{fontSize: '14px'}}>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
