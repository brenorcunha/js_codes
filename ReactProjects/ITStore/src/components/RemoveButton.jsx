import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

RemoveButton.propTypes = {
  itemId: PropTypes.number.isRequired
}

export default function RemoveButton({ itemId }) {
  const navigate = useNavigate()

  const handleDelete = () => {
    if (confirm(`Are U sure U want to remove this item from cart?`)) {
      removeFromCart({itemId})
      navigate("/cart")
    }
  }

  return (
    <button
    className="button is-danger is-small"
    onClick={handleDelete}
  >
    -
  </button>
  )
}