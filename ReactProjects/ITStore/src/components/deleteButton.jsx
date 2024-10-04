import { useNavigate } from "react-router-dom"
import { StockContext } from "../contexts/StockContext"
import PropTypes from "prop-types"
import { useContext } from "react"

DeleteButton.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired
}

export default function DeleteButton({ productId, productName }) {
  const { deleteItem } = useContext(StockContext)
  const navigate = useNavigate()

  const handleDelete = () => {
    if (confirm(`Are U sure U want to delete ${productName}?`)) {
      deleteItem(productId)
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