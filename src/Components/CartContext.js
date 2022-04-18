import { createContext, useState } from "react";
export const contexto = createContext();

export const MiProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [parcial, setParcial] = useState(0);

  const addItem = (productos, contador) => {

    let productoCarrito = { productos, contador };
    let carritoAuxiliar = [];

    setParcial(productos.precio * contador);

    setTotal(total + productos.precio * contador);



    if (isInCart(productos.id)) {
      productoCarrito = cart.find((item) => item.productos.id === productos.id);
      productoCarrito.contador = productoCarrito.contador + contador;
      carritoAuxiliar = [...productoCarrito];
    } else {
      carritoAuxiliar = [productoCarrito, ...cart];
    }
    setCart(carritoAuxiliar);
  };

  const removeItem = (productos) => {
    if (isInCart(productos)) {
      let carritoAuxiliar = [...cart];
      carritoAuxiliar = carritoAuxiliar.filter(
        (item) => item.productos !== productos
      );
      setCart(carritoAuxiliar);
    }
  };

  const clear = () => {
    setCart([]);
  };

  const isInCart = (id) => {
    return cart && cart.some((item) => item.productos.id === id);
  };

  return (
    <contexto.Provider
      value={{ addItem, removeItem, clear, cart, total, parcial }}
    >
      {children}
    </contexto.Provider>
  );
};

export default MiProvider;
