import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ItemList from "./ItemList";

let productosIniciales = [
  { indice: 1, nombre: "producto1", precio: 100, categoria: 1 },
  { indice: 2, nombre: "producto2", precio: 200, categoria: 2 },
  { indice: 3, nombre: "producto3", precio: 300, categoria: 3 },
];

const ItemListContainer = (greeting) => {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const promesa = new Promise((res, rej) => {
      setTimeout(() => {
        res(productosIniciales);
      }, 1000);
    });

    promesa
      .then((respuestaApi) => {
        setProductos(id?respuestaApi.filter((producto)=> producto.categoria == +id ): respuestaApi);
      })

      .catch((errorApi) => {
        toast.error("Error al cargar los productos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="mainStyle">
      <p>{loading ? "Cargando..." : "Ya tenes los productos"}</p>
      <ItemList productos={productos} />
    </div>
  );
};

export default ItemListContainer;
