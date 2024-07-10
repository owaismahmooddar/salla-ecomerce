import { logout } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { RxAvatar } from "react-icons/rx";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterProducts } from "@/redux/slices/productSlice";
import { useState } from "react";
import Cart from "@/components/Cart";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const navigation = [
    {
      name: "Home",
      href: "/",
      current: router.pathname === "/" ? true : false,
    },
  ];

  const handleClick = () => {
    if (token) {
      dispatch(logout());
    }
    router.push("/login");
  };

  const cartHandler = () => {
    setOpenCart(true);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    dispatch(filterProducts(e.target.value));
  };

  return (
    <>
      <Cart open={openCart} setOpen={setOpenCart} />
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-cyan-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    alt="Salla logo"
                    src="https://cdn.salla.network/images/logo/logo-square.png"
                    className="h-8 w-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-cyan-800 text-white"
                            : "text-cyan-700 hover:bg-cyan-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                {router.pathname === "/" && (
                  <div className="relative mt-2 rounded-md shadow-sm hidden md:block">
                    <input
                      id="search"
                      name="search"
                      type="text"
                      placeholder="Search Product"
                      value={searchQuery}
                      onChange={searchHandler}
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-cyan-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4 text-cyan-900"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    onClick={cartHandler}
                    className="relative inline-flex items-center rounded-full bg-cyan-900 px-4 py-1 text-sm text-cyan-50 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>

                    <ShoppingBagIcon aria-hidden="true" className="h-6 w-6" />
                    {items.length ? (
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        {items.length}
                      </div>
                    ) : (
                      ""
                    )}
                  </button>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {token ? (
                          <img
                            alt=""
                            src={user.imageUrl}
                            className="h-8 w-8 rounded-full"
                          />
                        ) : (
                          <RxAvatar className="h-8 w-8 rounded-full" />
                        )}
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <MenuItem>
                        <button
                          onClick={handleClick}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full"
                        >
                          {token ? "Sign out" : "Sign in"}
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-cyan-800 p-2 text-cyan-300 hover:bg-cyan-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-cyan-950">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-cyan-800 text-white"
                      : "text-cyan-700 hover:bg-cyan-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
              {router.pathname === "/" && (
                <div className="relative mt-2 rounded-md shadow-sm  md:hidden">
                  <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search Product"
                    value={searchQuery}
                    onChange={searchHandler}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-cyan-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="size-4 text-cyan-900"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-cyan-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  {token ? (
                    <img
                      alt=""
                      src={user.imageUrl}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-10 w-10 rounded-full" />
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-cyan-700">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-cyan-800">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={cartHandler}
                  className="relative inline-flex items-center ml-auto flex-shrink-0 rounded-full bg-cyan-900 px-4 py-1 text-sm text-cyan-50 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <ShoppingBagIcon aria-hidden="true" className="h-6 w-6" />
                  {items.length ? (
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                      {items.length}
                    </div>
                  ) : (
                    ""
                  )}
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <DisclosureButton
                  as="button"
                  onClick={handleClick}
                  className="block rounded-md px-3 py-2 text-base font-medium text-cyan-800 hover:bg-cyan-950 hover:text-white"
                >
                  {token ? "Sign out" : "Sign in"}
                </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </>
  );
}
