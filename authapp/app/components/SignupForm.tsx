import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const signup = (data: FormData) => {
  console.log(data);
};

const SignupForm = () => {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;
  return (
    <div className="flex justify-center w-[720px] h-[850px]">
      <div className="flex flex-col gap-6 w-[408px] h-auto mt-8">
        {/* title */}
        <div className="flex flex-col gap-6">
          <h1 className="font-black text-[32px] text-[#25324B] text-center">
            Sign Up Today
          </h1>
          <button className="btn w-full px-4 py-3 rounded-md border border-semigray bg-white text-bluepurple">
            Sign Up with Google
          </button>
        </div>

        <div className="flex items-center justify-between text-semigray">
          <svg
            width="108"
            height="1"
            viewBox="0 0 108 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="-4.37114e-08"
              y1="0.5"
              x2="108"
              y2="0.499991"
              stroke="#D6DDEB"
            />
          </svg>
          <p>Or Sign Up with Email</p>
          <svg
            width="108"
            height="1"
            viewBox="0 0 108 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="-4.37114e-08"
              y1="0.5"
              x2="108"
              y2="0.499991"
              stroke="#D6DDEB"
            />
          </svg>
        </div>

        <form
          className="flex flex-col gap-[22px]"
          onSubmit={handleSubmit(signup)}
        >
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-base text-semigray font-poppins">
              Full Name
            </p>
            <input
              placeholder="Enter your full name"
              className="w-full h-12 border px-4 py-3 rounded-lg border-verylightpurple"
              type="text"
              {...register("fullname", {
                required: "name is required",
              })}
            />
            <p className="mx-4 text-xs text-red-500">
              {errors.password ? "*" + errors.password.message : ""}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold text-base text-semigray font-epilogue">
              Email Address
            </p>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="w-full h-12 border px-4 py-3 rounded-lg border-verylightpurple"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address",
                },
              })}
            />
            <p className="mx-4 text-xs text-red-500">
              {errors.email ? "*" + errors.email.message : ""}
            </p>

            <div className="flex flex-col gap-1">
              <p className="font-semibold text-base text-semigray font-poppins">
                Password
              </p>
              <input
                placeholder="Enter password"
                className="w-full h-12 border px-4 py-3 rounded-lg border-verylightpurple"
                type="password"
                {...register("password", {
                  required: "password is required",
                })}
              />
              <p className="mx-4 text-xs text-red-500">
                {errors.password ? "*" + errors.password.message : ""}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-semibold text-base text-semigray font-poppins">
                Confirm Password
              </p>
              <input
                placeholder="Enter password"
                className="w-full h-12 border px-4 py-3 rounded-lg border-verylightpurple"
                type="password"
                {...register("password", {
                  required: "password is required",
                })}
              />
              <p className="mx-4 text-xs text-red-500">
                {errors.password ? "*" + errors.password.message : ""}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
