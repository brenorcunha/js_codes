import { useNavigate } from "react-router-dom"
import {StockContext} from "../contexts/StockContext"
import PropTypes from "prop-types"
import { useContext } from "react"

CartButton.propTypes = {
  item: PropTypes.object.isRequired,
}

export default function CartButton({ item }) {
  const { addToCart } = useContext(StockContext)
  const navigate = useNavigate()

  const handleCart = () => {
    if (confirm(`Are U sure U want to add to cart ${item.name}?`)) {
      addToCart(item)
      navigate("/Cart")
    }
  }

  return (
    <button
    className="button is-danger is-small"
    onClick={handleCart}
  >
    + Cart
  </button>
  )
}