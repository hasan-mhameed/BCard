import axios from "axios";
import { Card, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { TCard } from "../../Types/TCard";
import { useNavigate } from "react-router-dom";
import { TRootState } from "../../Store/BigPie";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaPhone } from "react-icons/fa6";

const Home = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const nav = useNavigate();

  const [currPage, setCurrentPage] = useState(1);

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
    try {
      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
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

  useEffect(() => {
    getData();
  }, []);

  const user = useSelector((state: TRootState) => state.UserSlice);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filterByPage = () => {
    const start = (currPage - 1) * 9;
    const end = start + 9;
    return searchCards()?.slice(start, end);
  };

  return (
    <div className=" dark:bg-slate-600">
      <h1 className="p-5 text-5xl dark:text-white">Card Page</h1>
      <p className="p-5 text-xl dark:text-white">
        Here You Can Find Business Cards From All Categories{" "}
      </p>
      <main className="flex flex-wrap justify-center gap-2 px-3 ">
        {filterByPage()?.map((item: TCard) => {
          return (
            <Card
              key={item._id}
              className="flex w-1/4 flex-col dark:bg-white max-md:w-3/4"
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
              <div className="flex h-5">
                {user && user.user && (
                  <FaHeart
                    size={20}
                    className="m-auto cursor-pointer"
                    color={isLikedCard(item) ? "red" : "black"}
                    onClick={() => likeUnlikeCard(item)}
                  />
                )}
                <FaPhone className="m-auto cursor-pointer" />
              </div>
            </Card>
          );
        })}

        <Pagination
          currentPage={currPage}
          totalPages={Math.ceil(cards?.length / 9)}
          onPageChange={onPageChange}
          className="mb-[15px] flex overflow-x-auto sm:justify-center"
        />
      </main>
    </div>
  );
};

export default Home;
