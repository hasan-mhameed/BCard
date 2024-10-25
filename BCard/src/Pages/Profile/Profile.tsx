import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.UserSlice);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-2">
      <h1 className="mt-5 text-center text-3xl dark:text-white">
        Profile Page
      </h1>
      <p className="text-lg dark:text-white">
        Welcome {user.user?.name.first + " " + user.user?.name.last}
      </p>
    </div>
  );
};

export default Profile;
