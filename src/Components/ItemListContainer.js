import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "./Firebase";
import ItemList from "./ItemList";
import { getDocs, collection, query, where } from "firebase/firestore";

const ItemListContainer = (greeting) => {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      const productosCollection = collection(db, "productos");
      const documentos = getDocs(productosCollection);

      documentos
        .then((respuesta) =>
          setProductos(
            respuesta.docs.map((doc) => {
              const producto = {
                id: doc.id,
                ...doc.data(),
              };
              return producto;
            })
          )
        )
        .catch((errorApi) => toast.error("Error al cargar el detalle"))
        .finally(() => setLoading(false));
    } else {
      const productosCollection = collection(db, "productos");
      const miFiltro = query(productosCollection, where("categoria", "==", id));
      const documentos = getDocs(miFiltro);

      documentos
        .then((respuesta) =>
          setProductos(
            respuesta.docs.map((doc) => {
              const producto = {
                id: doc.id,
                ...doc.data(),
              };
              return producto;
            })
          )
        )
        .catch((errorApi) => toast.error("Error al cargar el detalle"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="mainStyle">
      <p>{loading ? "Cargando..." : "Ya tenes los productos"}</p>
      <ItemList productos={productos} />
    </div>
  );
};

export default ItemListContainer;

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import ItemList from "./ItemList";

// let productosIniciales = [
//   {
//     indice: 1,
//     nombre: "producto1",
//     precio: 100,
//     stock: 5,
//     categoria: "indumentaria",
//   },
//   {
//     indice: 2,
//     nombre: "producto2",
//     precio: 200,
//     stock: 5,
//     categoria: "elementos",
//   },
//   {
//     indice: 3,
//     nombre: "producto3",
//     precio: 300,
//     stock: 5,
//     categoria: "objetos",
//   },
// ];

// const ItemListContainer = (greeting) => {
//   const [loading, setLoading] = useState(true);
//   const [productos, setProductos] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     const promesa = new Promise((res, rej) => {
//       setTimeout(() => {
//         res(productosIniciales);
//       }, 1000);
//     });

//     promesa
//       .then((respuestaApi) => {
//         setProductos(
//           id
//             ? respuestaApi.filter((producto) => producto.categoria == +id)
//             : respuestaApi
//         );
//       })

//       .catch((errorApi) => {
//         toast.error("Error al cargar los productos");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   return (
//     <div className="mainStyle">
//       <p>{loading ? "Cargando..." : "Ya tenes los productos"}</p>
//       <ItemList productos={productos} />
//     </div>
//   );
// };

// export default ItemListContainer;
