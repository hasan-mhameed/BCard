import axios from "axios";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { TCard } from "../../Types/TCard";
import { useNavigate } from "react-router-dom";
import { TRootState } from "../../Store/BigPie";
import { useSelector } from "react-redux";
import { FaHeart, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaPencil } from "react-icons/fa6";
import { PiPlus } from "react-icons/pi";
import { FaPhone } from "react-icons/fa6";

// type Cards = {
//   title: string;
//   description: string;
//   image: {
//     url: string;
//     alt: string;
//   };
// };
const MyCards = () => {
  const [cards, setCards] = useState<TCard[]>();
  const nav = useNavigate();

  const searchWord = useSelector(
    (state: TRootState) => state.SearchSlice.search,
  );

  const searchCards = () => {
    return cards?.filter((item: TCard) => item.title.includes(searchWord));
  };

  const isLikedCard = (card: TCard) => {
    if (user && user.user) {
      return card.likes.includes(user.user._id);
    } else return false;
  };

  const navToCard = (id: string) => {
    nav("/card/" + id);
  };

  const getData = async () => {
    axios.defaults.headers.common["x-auth-token"] =
      localStorage.getItem("token");
    try {
      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
      );
      setCards(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const likeUnlikeCard = async (card: TCard) => {
    const res = await axios.patch(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id,
    );
    if (res.status === 200) {
      toast.success("card liked/unliked");

      const index = cards!.indexOf(card);
      const ifLiked = cards![index].likes.includes(user.user!._id);
      const newCards = [...cards!];
      if (ifLiked) {
        newCards[index].likes.splice(index);
      } else {
        newCards[index].likes.push(user.user!._id);
      }

      setCards(newCards);
    }
  };

  const deleteCard = async (card: TCard) => {
    try {
      const res = await axios.delete(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" +
          card._id,
      );

      const index = cards!.indexOf(card);
      const newCards = [...cards!];
      newCards.splice(index, 1);

      setCards(newCards);

      if (res) {
        toast.success("card deleted");
      }
    } catch (err) {
      toast.error("card delete failed");
    }
  };

  const navToCreate = () => {
    nav("/create-card");
  };
  const navEditCard = (id: string) => {
    nav("/edit-card/" + id);
  };

  useEffect(() => {
    getData();
  }, []);

  const user = useSelector((state: TRootState) => state.UserSlice);

  return (
    <div className=" dark:bg-slate-600">
      <h1 className="p-5 text-5xl dark:text-white">My Cards Page</h1>
      <p className="p-5 text-xl dark:text-white">
        This Cards was Made By The User
      </p>
      <main className="flex flex-wrap justify-center gap-2 px-3 pb-5 ">
        {searchCards()?.map((item: TCard) => {
          return (
            <Card
              key={item._id}
              // imgSrc={item.image.url}
              // imgAlt={item.image.alt}
              className="w-1/4 dark:bg-white max-md:w-3/4"
            >
              <div
                onClick={() => navToCard(item._id)}
                className="flex h-[90%] cursor-pointer flex-col"
              >
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  className="m-auto h-[150px] w-5/6 object-fill"
                />
                <h1>{item.title}</h1>
                <h3>{item.subtitle}</h3>
                <p>{item.description}</p>
              </div>
              <hr />

              {user && user.user && (
                <div className="flex justify-between">
                  <FaHeart
                    size={20}
                    className="cursor-pointer"
                    color={isLikedCard(item) ? "red" : "black"}
                    onClick={() => likeUnlikeCard(item)}
                  />
                  <FaPencil
                    size={20}
                    className="cursor-pointer"
                    onClick={() => navEditCard(item._id)}
                  />
                  <FaTrash
                    size={20}
                    onClick={() => deleteCard(item)}
                    className="cursor-pointer"
                  />
                  <FaPhone className="cursor-pointer " />
                </div>
              )}
            </Card>
          );
        })}
      </main>
      <div className="fixed right-10 top-20 flex cursor-pointer rounded-full bg-cyan-300 p-3">
        <PiPlus size={20} onClick={navToCreate} />
      </div>
    </div>
  );
};

export default MyCards;
