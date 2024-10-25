import { Footer as FbFooter } from "flowbite-react";
import { BsExclamationCircleFill } from "react-icons/bs";

const Footer = () => {
  return (
    <FbFooter
      container
      className="bottom-0 h-16 whitespace-nowrap bg-green-400 dark:bg-slate-800"
    >
      <div className="flex w-full justify-center align-middle">
        <BsExclamationCircleFill href="#" size={32} color="white" />
        <span className="ml-3 mt-1 text-white">About</span>
      </div>
    </FbFooter>
  );
};

export default Footer;
