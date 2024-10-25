import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TCard } from "../../Types/TCard";

const CardDetails = () => {
  const [card, setCard] = useState<TCard>();
  const { id } = useParams<{ id: string }>();

  const getData = async () => {
    const res = await axios.get(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id,
    );
    setCard(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="m-auto mb-5 mt-5 flex h-[85vh] w-4/5 flex-col rounded-xl border border-blue-950 bg-orange-400 p-8 text-center align-middle">
      <h1 className="h-[15vh] overflow-hidden text-3xl">
        {card && card.title!}
      </h1>
      <h1 className="m-auto h-[20vh] overflow-hidden truncate text-2xl">
        {card && card.subtitle}
      </h1>
      <img
        src={card && card.image?.url}
        alt={card && card.image?.alt}
        className="m-auto mb-5 h-3/5 rounded-lg border border-violet-300 object-contain shadow-xl shadow-slate-600 dark:shadow-slate-500"
        // onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
        //   e.currentTarget.src = noPic;
        //   e.currentTarget.onerror = null;
        // }}
        // onLoad={(e: SyntheticEvent<HTMLImageElement, Event>) => {
        //   e.currentTarget.onerror = null;
        // }}
      />
      <p className="">Email: {card && card.email!}</p>
      <p>Phone: {card && card.phone!}</p>
      <h1>Website: {card && card.web!}</h1>
      <p>Adress: {card && card.address.country!}</p>
    </div>
  );
};

export default CardDetails;
