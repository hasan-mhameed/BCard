import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../Validations/LoginSchema";
import { GrUpdate } from "react-icons/gr";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decode } from "../../Services/tokenService";
import { userActions } from "../../Store/UserSlice";
const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const initialFormData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(LoginSchema),
  });

  const onSubmit = async (form: typeof initialFormData) => {
    try {
      const token = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        form,
      );
      console.log(token);
      // toast.success("Sign In Successful");
      localStorage.setItem("token", token.data);
      const id = decode(token.data)._id;
      axios.defaults.headers.common["x-auth-token"] = token.data;
      const user = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id,
      );
      dispatch(userActions.login(user.data));
      toast.success("Sign In Successful");
      nav("/home");
    } catch (error) {
      console.log(error);
      toast.error("Sign In Failed");
    }
  };

  return (
    <div className="h-lvh">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto mt-24 flex w-3/5 flex-col gap-4 rounded-lg p-4 shadow-lg "
      >
        <h1 className="m-auto text-2xl font-bold text-gray-800 dark:text-white">
          Sign In
        </h1>
        <FloatingLabel
          type="email"
          label="Email"
          variant="standard"
          {...register("email")}
          color={errors.email ? "error" : "success"}
          className="dark:text-white"
        />
        <span className="text-sm text-red-500">{errors.email?.message}</span>

        <FloatingLabel
          type="password"
          label="Password"
          variant="standard"
          {...register("password")}
          color={errors.password ? "error" : "success"}
          className="dark:text-white"
        />
        <span className="text-sm text-red-500">{errors.password?.message}</span>
        <div className="flex justify-between">
          <Button className="w-5/12 ">
            <span className="text-2xl">Cancel</span>
          </Button>
          <Button className="w-5/12 ">
            <GrUpdate size={30} />
          </Button>
        </div>

        <Button type="submit" disabled={!isValid}>
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default Login;
