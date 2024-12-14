import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useResetPasswordMutation } from "../../slices/userSlice";

export default function ResetPassword() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const params = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [resetPass, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Password update successfully");
      navigate("/login");
    }
  }, [userInfo, error, isSuccess]);

  async function handelResetPass(data) {
    console.log(data["password"]);
    if (data["password"] !== data["confirmPassword"]) {
      toast.error("confirm password did not match");
      return;
    } else {
      // deleteProductImage({ id: params?.id, body: { imgId } });

      try {
        const response = await resetPass({
          token: params?.token,
          data: { password: data["password"] },
        }).unwrap();
        console.log(response);
        reset();
      } catch (err) {
        // console.log(err);
        toast.error(err?.data.message);
      }
    }
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-10 bg-white rounded-2xl md:flex-row md:space-y-0 md:m-0">
          <div className="p-6 md:p-20 space-y-5">
            <h2 className="text-4xl font-mono mb-5 font-bold">
              Reset Password
            </h2>
            <form
              onSubmit={handleSubmit(handelResetPass)}
              className="space-y-5"
            >
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                className="w-full p-6 h-12 placeholder:font-thin border border-grey-200 rounded-md"
                {...register("password", {
                  required: "please enter password",
                })}
              />
              {errors?.password?.message && <p>{errors.password.message}</p>}

              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter confirm password"
                className="w-full p-6 h-12 placeholder:font-thin border border-grey-200 rounded-md"
                {...register("confirmPassword", {
                  required: "pleas enter confirm password",
                })}
              />
              {errors?.confirmPassword?.message && (
                <p>{errors.confirmPassword.message}</p>
              )}

              <div className="flex flex-col md:flex-row md:my-8 justify-between space-y-8 md:space-y-0">
                <button
                  disabled={isSubmitting && isLoading}
                  className={`w-full  flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 ${
                    isSubmitting && isLoading ? "bg-gray-500" : "bg-cyan-700"
                  }  shadow-cyan-100`}
                >
                  Reset password{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
