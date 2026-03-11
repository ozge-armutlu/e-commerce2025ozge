
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../store/thunks/clientThunks";


export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedRole = watch("role_id");
  const password = watch("password");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const roles = useSelector((state) => state.client.roles);

  const history = useHistory();

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    let payload;

    if (selectedRole === "2") {
      payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: Number(data.role_id),
        store: {
          name: data.store_name,
          phone: data.store_phone,
          tax_no: data.tax_no,
          bank_account: data.bank_account,
        },
      };
    } else {
      payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: Number(data.role_id),
      };
    }

    try {
      await axiosInstance.post("/signup", payload);

      toast.warning(
        "You need to click link in email to activate your account!",
        { autoClose: 3000 }
      );

      setTimeout(() => {
        history.goBack();
      }, 3000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-8 md:max-w-md md:mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* NAME */}
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Min 3 characters" },
            })}
            className="w-full border rounded-lg px-4 py-3"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* ROLE */}
        <div>
          <select
            {...register("role_id", { required: "Role is required" })}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role_id && (
            <p className="text-red-500 text-sm">
              {errors.role_id.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
            className="w-full border rounded-lg px-4 py-3"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Min 8 characters" },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                message:
                  "Upper, lower, number & special char required",
              },
            })}
            className="w-full border px-4 py-3 rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* CONFIRM */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (v) =>
                v === password || "Passwords do not match",
            })}
            className="w-full border px-4 py-3 rounded-lg"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* STORE FIELDS */}
        {selectedRole === "2" && (
          <>
            <input
              placeholder="Store Name"
              {...register("store_name", { required: true })}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              placeholder="Store Phone"
              {...register("store_phone", { required: true })}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              placeholder="Tax No"
              {...register("tax_no", { required: true })}
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              placeholder="IBAN"
              {...register("bank_account", { required: true })}
              className="w-full border px-4 py-3 rounded-lg"
            />
          </>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`py-3 rounded-lg text-white ${
            isSubmitting
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </section>
  );
}


