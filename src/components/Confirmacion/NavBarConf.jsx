import { Link } from "react-router-dom";
import Logo1 from "../../images/logo1.png";

const NavBarConf = () => {
  return (
    <header className="py-8 px-8 w-full font-semibold shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <div className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <Link to={"/"}>
                <img src={Logo1} className="h-20" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBarConf;
