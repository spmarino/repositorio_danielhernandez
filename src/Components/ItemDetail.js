import ItemCount from "./ItemCount";
import { useContext, useState } from "react";

import { contexto } from "./CartContext";

export const ItemDetail = ({ productos }) => {

  const { addItem, cart } = useContext(contexto);

  const onAdd = (contador) => {
    addItem(productos, contador)
  };

  return (
    <>
      <article>
        <h2>{productos.nombre}</h2>
        <p>{productos.indice}</p>
        <p>${productos.precio}</p>
      </article>
      <ItemCount initial={1} onAdd={onAdd} stock={5} />
      
        
    </>
  );
};

export default ItemDetail;
