import { Button, FloatingLabel } from "flowbite-react";
import { GrUpdate } from "react-icons/gr";
import { CreateCardSchema } from "../../Validations/CreateCardSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const CreateCard = () => {
  const initialFormData = {
    // _id: "",
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    image: {
      url: "",
      alt: "",
    },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(CreateCardSchema),
  });

  const onSubmit = async (form: typeof initialFormData) => {
    axios.defaults.headers.common["x-auth-token"] =
      localStorage.getItem("token");
    try {
      const token = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        form,
      );
      console.log(token);
      toast.success("Creat Card Successful");
      localStorage.setItem("token", token.data);
    } catch (error) {
      console.log(error);
      toast.error("Creat Card Failed");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto mb-24 mt-12 flex w-3/5 flex-col justify-center gap-4 rounded-lg p-4 align-middle shadow-lg"
      >
        <h1 className="text-center text-3xl dark:text-white">Create Card</h1>
        <div className="flex justify-between max-md:flex-col">
          <div className="w-5/12 max-md:w-full">
            <FloatingLabel
              type="text"
              variant="standard"
              label="Title*"
              {...register("title")}
              color={errors.title ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500 ">
              {errors.title?.message}
            </span>

            <FloatingLabel
              type="text"
              variant="standard"
              label="Subtitle*"
              {...register("subtitle")}
              color={errors.subtitle ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500 ">
              {errors.subtitle?.message}
            </span>

            <FloatingLabel
              type="text"
              variant="standard"
              label="Description*"
              {...register("description")}
              color={errors.description ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500 ">
              {errors.description?.message}
            </span>
            <FloatingLabel
              type="text"
              variant="standard"
              label="Phone*"
              {...register("phone")}
              color={errors.phone ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500">
              {errors.phone?.message}
            </span>
            <FloatingLabel
              type="text"
              variant="standard"
              label="Email*"
              {...register("email")}
              color={errors.email ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500">
              {errors.email?.message}
            </span>

            <FloatingLabel
              type="text"
              variant="standard"
              label="Web"
              {...register("web")}
              color={errors.web ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500">{errors.web?.message}</span>

            <FloatingLabel
              type="text"
              variant="standard"
              label="image url"
              {...register("image.url")}
              color={errors.image?.url ? "error" : "success"}
              className="dark:text-white"
            />

            <span className="text-sm text-red-500">
              {errors.image?.url?.message}
            </span>
          </div>
          <div className="w-5/12 max-md:w-full">
            <FloatingLabel
              type="text"
              variant="standard"
              label="image alt"
              {...register("image.alt")}
              color={errors.image?.alt ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500">
              {errors.image?.alt?.message}
            </span>

            <FloatingLabel
              type="text"
              variant="standard"
              label="Countrey*"
              {...register("address.country")}
              color={errors.address?.country ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500">
              {errors.address?.country?.message}
            </span>

            <FloatingLabel
              type="text"
              variant="standard"
              label="State"
              {...register("address.state")}
              color={errors.address?.state ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500">
              {errors.address?.state?.message}
            </span>

            <FloatingLabel
              type="text"
              variant="standard"
              label="City*"
              {...register("address.city")}
              color={errors.address?.city ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500">
              {errors.address?.city?.message}
            </span>
            <FloatingLabel
              type="text"
              variant="standard"
              label="Street*"
              {...register("address.street")}
              color={errors.address?.street ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500">
              {errors.address?.street?.message}
            </span>

            <FloatingLabel
              type="number"
              variant="standard"
              label="House Number*"
              {...register("address.houseNumber")}
              color={errors.address?.houseNumber ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500">
              {errors.address?.houseNumber?.message}
            </span>
            <FloatingLabel
              type="number"
              variant="standard"
              label="Zip*"
              {...register("address.zip")}
              color={errors.address?.zip ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500">
              {errors.address?.zip?.message}
            </span>
          </div>
        </div>
        <div className="flex justify-between max-md:flex-col max-md:gap-4">
          <Button className="w-5/12 max-md:w-full">
            <span className="text-xl max-md:text-lg">Cancel</span>
          </Button>
          <Button className="w-5/12 max-md:w-full ">
            <GrUpdate size={30} className="max-md:text-lg" />
          </Button>
        </div>
        <Button type="submit" disabled={!isValid}>
          Create
        </Button>
      </form>
    </>
  );
};

export default CreateCard;
