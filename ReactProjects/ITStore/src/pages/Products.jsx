import { useParams } from "react-router-dom";
import { StockContext } from "../contexts/StockContext";
import DeleteButton from "../components/DeleteButton";
import { useContext } from "react";
import UpdateButton from "../components/UpdateButton";
import SeeButton from "../components/SeeButton";

//Similar a 'ItensTable.jsx': 
export default function items() {
  const { items } = useContext(StockContext);
  
  const { id } = useParams();
  //const item = items.find((item) => item.id == parseInt (id));
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>R$ {item.price}</td>
              <td>{item.quantity} unit.</td>
              <td>{item.type}</td>
              <td>
                {
                /* <Link to={`${item.id}`} className="button is-primary is-small">
                  See
                </Link>
                <br />
                <Link to={`${item.id}/update`} className="button is-small">
                  Update
                </Link> */}
                <SeeButton itemId={item.id}/>
                <UpdateButton itemId={item.id} item={item}/>
                <DeleteButton
                  itemId={item.id}
                  itemName={item.name}
                ></DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
