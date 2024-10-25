import { Button, FloatingLabel } from "flowbite-react";
import { GrUpdate } from "react-icons/gr";
import { CreateCardSchema } from "../../Validations/CreateCardSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TCard } from "../../Types/TCard";

const EditCard = () => {
  const [cards, setCards] = useState<TCard>();
  const { id } = useParams<{ id: string }>();

  const nav = useNavigate();

  const initialFormData = {
    // _id: "",
    title: cards?.title,
    subtitle: cards?.subtitle,
    description: cards?.description,
    phone: cards?.phone,
    email: cards?.email,
    web: cards?.web,
    image: {
      url: cards?.image.url,
      alt: cards?.image.alt,
    },
    address: {
      state: cards?.address.state,
      country: cards?.address.country,
      city: cards?.address.city,
      street: cards?.address.street,
      houseNumber: cards?.address.houseNumber,
      zip: cards?.address.zip,
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(CreateCardSchema),
  });

  useEffect(() => {
    if (cards) {
      reset(initialFormData);
    }
  }, [cards, reset]);

  const getCardData = async () => {
    try {
      axios.defaults.headers.common["x-auth-token"] =
        localStorage.getItem("token");
      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id,
      );
      console.log(res);

      setCards(res.data);
      toast.success("success");
    } catch (error) {
      toast.error("faild");
    }
  };

  const onSubmit = async (form: typeof initialFormData) => {
    try {
      axios.defaults.headers.common["x-auth-token"] =
        localStorage.getItem("token") || "";
      const res = await axios.put(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" +
          cards?._id,
        form,
      );
      console.log(res);
      toast.success("Edit Card Successful");
      //   localStorage.setItem("token", token.data);
      nav("/my-cards");
    } catch (error) {
      console.log(error);
      toast.error("Edit Card Failed");
    }
  };

  useEffect(() => {
    getCardData();
  }, [id]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto mb-24 mt-12 flex w-3/5 flex-col justify-center gap-4 rounded-lg p-4 align-middle shadow-lg"
      >
        <h1 className="text-center text-3xl dark:text-white">Edit Card</h1>
        <div className="flex justify-between max-md:flex-col">
          <div className="w-5/12 max-md:w-full">
            <FloatingLabel
              type="text"
              variant="standard"
              label="title*"
              defaultValue={cards?.title}
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
              defaultValue={cards?.subtitle}
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
              defaultValue={cards?.description}
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
              defaultValue={cards?.phone}
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
              defaultValue={cards?.email}
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
              defaultValue={cards?.web}
              {...register("web")}
              color={errors.web ? "error" : "success"}
              className="dark:text-white"
            />
            <span className="text-sm text-red-500">{errors.web?.message}</span>

            <FloatingLabel
              type="text"
              variant="standard"
              label="image url"
              defaultValue={cards?.image.url}
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
              defaultValue={cards?.image.alt}
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
              defaultValue={cards?.address.country}
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
              defaultValue={cards?.address.state}
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
              defaultValue={cards?.address.city}
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
              defaultValue={cards?.address.street}
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
              defaultValue={cards?.address.houseNumber}
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
              defaultValue={cards?.address.zip}
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
          Edit Card
        </Button>
      </form>
    </>
  );
};

export default EditCard;
