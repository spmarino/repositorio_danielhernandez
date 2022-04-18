import { useContext, useState } from "react";
import { contexto } from "./CartContext";

const Carrito = () => {
  const { clear, cart, removeItem, total, parcial } = useContext(contexto);


  return (
    <>
      <h2>Carrito</h2>
{cart.length != 0? <div>
        {cart.map((item) => (
          <div key={item.id}>
            <h2>{item.productos.nombre}</h2>
            <img src="https://picsum.photos/200/150" alt="" />
            <p>Unidades seleccionadas: {item.contador}</p>
            <p>${item.productos.precio}</p>
            <p>Total: ${parcial}</p>
            <button onClick={() => removeItem(item.productos)}>
              Remover producto
            </button>
          </div>
        ))}
      
      <button onClick={clear}>Vaciar Carrito</button>
      <p>Total Compra: ${total}</p>
      </div> : <p>"No hay productos seleccionados"</p>}

     

    </>
  );
};

export default Carrito;
