import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

SeeButton.propTypes = {
  itemId: PropTypes.number.isRequired
}
export default function SeeButton({ itemId }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${itemId}`)
  }

  return (
    <button
    className="button is-primary is-small"
    onClick={handleClick}
  >
    See it
  </button>
  )
}