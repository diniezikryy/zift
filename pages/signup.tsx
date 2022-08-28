import { useRouter } from "next/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthHook } from "../context/AuthContext";

interface SignupType {
  email: string;
  password: string;
  password_confirm: string;
}

const SignupPage = () => {
  const methods = useForm<SignupType>({ mode: "onBlur" });

  const { signUp } = useAuthHook();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: SignupType) => {
    try {
      await signUp(data.email, data.password);
      router.push("/");
      toast.success("You have successfully signed up and logged in!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-12 border-2 border-gray-400 sign-up-form w-96 bg-grey-light-primary">
      <h2 className="px-12 mt-8 text-2xl font-semibold text-center text-blue-900 text-purple-primary">
        Sign Up
      </h2>
      <FormProvider {...methods}>
        <form
          action=""
          className="px-4 pb-12 mx-auto w-80"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Email
              </label>
            </div>

            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Password
              </label>
            </div>

            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Confirm Password
              </label>
            </div>

            <input
              type="password"
              {...register("password_confirm", {
                required: "Verify your password",
              })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password_confirm && (
              <p className="text-red-400">{errors.password_confirm.message}</p>
            )}
          </div>
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
            >
              <p className="font-normal capitalize text-purple-primary">
                submit
              </p>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignupPage;
