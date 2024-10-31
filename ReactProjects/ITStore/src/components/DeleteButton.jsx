import { useNavigate } from "react-router-dom"
import {StockContext} from "../contexts/StockContext"
import PropTypes from "prop-types"
import { useContext } from "react"

DeleteButton.propTypes = {
  itemId: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired
}

export default function DeleteButton({ itemId, itemName }) {
  console.log('Product IDs: ', itemId)
  const { deleteItem } = useContext(StockContext)
  const navigate = useNavigate()

  const handleDelete = () => {
    if (confirm(`Are U sure U want to delete ${itemName}?`)) {
      deleteItem(itemId)
      navigate("/products")
    }
  }

  return (
    <button
    className="button is-danger is-small"
    onClick={handleDelete}
  >
    Delete
  </button>
  )
}