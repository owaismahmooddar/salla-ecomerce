import { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateItemQuantity,
} from "@/redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface CartProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ open, setOpen }) => {
  const [quantityArray, setQuantityArray]: any = useState([]);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (products.length) {
      const tempArray: number[] = [];
      products.map((item: { quantity: number }) =>
        tempArray.push(item.quantity)
      );
      setQuantityArray([...tempArray]);
    }
  }, [products]);

  const quantityHandler = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const tempArray = [...quantityArray];

    tempArray[i] = e.target.value === "" ? 0 : parseInt(e.target.value);
    setQuantityArray([...tempArray]);
    const id = products[i].id;
    dispatch(
      updateItemQuantity({
        id,
        quantity: e.target.value === "" ? 0 : parseInt(e.target.value),
      })
    );
  };
  const quantitySubstractHandler = (i: number) => {
    const tempArray = [...quantityArray];
    const prevValue = tempArray[i];
    prevValue <= 0 ? (tempArray[i] = 1) : (tempArray[i] = prevValue - 1);
    const id = products[i].id;
    setQuantityArray([...tempArray]);
    dispatch(updateItemQuantity({ id, quantity: prevValue - 1 }));
  };
  const quantityAddHandler = (i: number) => {
    const tempArray = [...quantityArray];
    const prevValue = tempArray[i];
    tempArray[i] = prevValue + 1;
    const id = products[i].id;
    setQuantityArray([...tempArray]);
    dispatch(updateItemQuantity({ id, quantity: prevValue + 1 }));
  };

  const deleteItem = (i: number) => {
    const tempArray = [...products];
    const id = tempArray[i].id;
    // tempArray.splice(i, 1);
    // setProducts([...tempArray]);
    dispatch(removeItemFromCart(id));
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className={`-my-6 divide-y divide-gray-200 ${
                          !products.length
                            ? "flex items-center justify-center mt-12"
                            : ""
                        }`}
                      >
                        {products.length ? (
                          products.map((product: any, i: number) => (
                            <li key={product.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={product.title}
                                  src={product.imageUrl}
                                  className="h-full w-full object-fill object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3 className="w-48">{product.title}</h3>
                                    <p className="ml-4">$ {product.price}</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <form className="mt-4">
                                    <label
                                      htmlFor="quantity-input"
                                      className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                      Choose quantity:
                                    </label>
                                    <div className="relative flex items-center max-w-[8rem]">
                                      <button
                                        type="button"
                                        id="decrement-button"
                                        data-input-counter-decrement="quantity-input"
                                        onClick={() =>
                                          quantitySubstractHandler(i)
                                        }
                                        className="bg-cyan-800 hover:bg-cyan-950 border border-cyan-950 rounded-s-lg p-3 h-11 focus:ring-cyan-950  focus:ring-2 focus:outline-none"
                                      >
                                        <svg
                                          className="w-3 h-3 text-white "
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 18 2"
                                        >
                                          <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 1h16"
                                          />
                                        </svg>
                                      </button>
                                      <input
                                        type="text"
                                        id="quantity-input"
                                        value={quantityArray[i]}
                                        onChange={(e) => quantityHandler(e, i)}
                                        data-input-counter
                                        aria-describedby="helper-text-explanation"
                                        className="bg-cyan-800 border-x-0 border-cyan-900 h-11 text-center text-white text-sm focus:ring-cyan-800 focus:border-cyan-950 block w-full py-2.5 "
                                        placeholder="999"
                                        required
                                      />
                                      <button
                                        type="button"
                                        id="increment-button"
                                        onClick={() => quantityAddHandler(i)}
                                        data-input-counter-increment="quantity-input"
                                        className="bg-cyan-800 hover:bg-cyan-950 border border-cyan-950 rounded-e-lg p-3 h-11 focus:ring-cyan-950  focus:ring-2 focus:outline-none"
                                      >
                                        <svg
                                          className="w-3 h-3 text-white"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 18 18"
                                        >
                                          <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 1v16M1 9h16"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </form>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() => deleteItem(i)}
                                      className="font-medium text-cyan-800 hover:text-cyan-950"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <h3 className="text-lg font-bold text-cyan-700">
                            No items in the Cart
                          </h3>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>
                      ${" "}
                      {products
                        ?.reduce(
                          (partialSum, item) =>
                            partialSum + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-cyan-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-950"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-cyan-800 hover:text-cyan-950"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Cart;
