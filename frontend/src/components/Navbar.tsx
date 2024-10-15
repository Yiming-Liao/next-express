import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-36 bg-slate-100 p-6  flex flex-col justify-between items-center">
      <div className="w-full flex justify-between items-center">
        <Link
          href={"/"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          Home
        </Link>
        <Link
          href={"/register"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          register
        </Link>
        <Link
          href={"/login"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          login
        </Link>
        <Link
          href={"/dashboard"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          dashboard
        </Link>
        <Link
          href={"/change-password"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          change-password
        </Link>
        <Link
          href={"/forgot-password"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          forgot-password
        </Link>
        <Link
          href={"/logout"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          logout
        </Link>
      </div>

      <div className="w-full flex justify-between items-center border-2 opacity-50">
        <Link
          href={"/email-not-verified"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          email-not-verified
        </Link>
        <Link
          href={"/verify-email"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          verify-email
        </Link>
        <Link
          href={"/reset-password"}
          className="px-3 py-2 rounded-md shadow-md bg-slate-600 text-white"
        >
          reset-password
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
