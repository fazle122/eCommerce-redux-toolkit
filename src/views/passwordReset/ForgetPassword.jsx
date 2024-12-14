import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../../slices/userSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { userInfo } = useSelector((state) => state.auth);
  const [forgetPass, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Email sent, Please check your email");
      navigate("/");
    }
  }, [userInfo, error, isSuccess]);

  async function handelForgetPass(data) {
    try {
      const response = await forgetPass({ email: data["email"] }).unwrap();
      console.log(response);
      reset();
    } catch (err) {
      // console.log(err);
      toast.error(err?.data.message);
    }
  }

  // if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-10 bg-white rounded-2xl md:flex-row md:space-y-0 md:m-0">
          <div className="p-6 md:p-20 space-y-5">
            <h2 className="text-4xl font-mono mb-5 font-bold">
              Forget Password
            </h2>
            <form
              onSubmit={handleSubmit(handelForgetPass)}
              className="space-y-5"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full p-6 h-12 placeholder:font-thin border border-grey-200 rounded-md"
                {...register("email", {
                  required: "please enter email address",
                })}
              />
              {errors?.email?.message && <p>{errors.email.message}</p>}

              <div className="flex flex-col md:flex-row md:my-8 justify-between space-y-8 md:space-y-0">
                <button
                  disabled={isSubmitting && isLoading}
                  className={`w-full flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 ${
                    isSubmitting && isLoading ? "bg-gray-500" : "bg-cyan-700"
                  }  shadow-cyan-100`}
                >
                  Send Email{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
