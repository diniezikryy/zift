import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAuthHook } from "../context/AuthContext";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const { user, logOut } = useAuthHook();
  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Login",
      link: "/login",
    },
    {
      id: 3,
      name: "Sign Up",
      link: "/signup",
    },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
      toast.success("You have been successfully logged out!");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header className="container sticky top-0 z-50 flex flex-wrap items-center justify-between max-w-full p-6 mx-auto bg-white shadow-md">
        <div className="flex items-center text-blue-900 transition duration-150 cursor-pointer hover:text-blue-800 ">
          <Link href="/">
            <span className="font-sans text-lg font-semibold">Zift</span>
          </Link>
        </div>

        <nav className={`md:flex md:items-center font-title w-full md:w-auto`}>
          <ul className="inline-block text-lg">
            <>
              {!user.uid ? (
                menuItems.map((item) => (
                  <li
                    key={item.id}
                    className="items-center block my-3 mr-4 md:my-0 md:inline-block "
                  >
                    <Link href={item?.link}>
                      <a
                        href=""
                        className="text-blue-800 transition hover:text-blue-900"
                      >
                        {item?.name}
                      </a>
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li className="items-center block my-3 mr-4 md:my-0 md:inline-block ">
                    <Link href="/dashboard">
                      <a
                        href=""
                        className="text-blue-800 transition hover:text-blue-900"
                      >
                        Dashboard
                      </a>
                    </Link>
                  </li>
                  <li className="items-center block my-3 mr-4 md:my-0 md:inline-block ">
                    <a
                      onClick={handleLogout}
                      className="text-blue-800 transition cursor-pointer hover:text-blue-900"
                    >
                      Logout
                    </a>
                  </li>
                </>
              )}
            </>
          </ul>
        </nav>
      </header>
      {children}
    </>
  );
};

export default Navbar;
