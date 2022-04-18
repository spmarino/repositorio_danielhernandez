import { Link } from "react-router-dom";

const Item = ({ producto }) => {
  return (
    <>
      <article>
        <h2>{producto.nombre}</h2>
        <img src={producto.imagen} />
        <p> Precio:${producto.precio}</p>
        <button>
          <Link to={`/elemento/${producto.id}`}>Ver detalle</Link>
        </button>
        {console.log(producto)}
      </article>
    </>
  );
};

export default Item;
