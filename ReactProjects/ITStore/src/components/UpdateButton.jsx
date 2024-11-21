import { useNavigate } from "react-router-dom"
import {StockContext} from "../contexts/StockContext"
import PropTypes from "prop-types"
import { useContext } from "react"

UpdateButton.propTypes = {
  itemId: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired
}
//Ao clicar no botão 'UpdateButton' redireciona para a página '/${itemId}/update', nesta estando carregados os dados do produto, que devm ser obtidos pelo localStorage, depois permitir edição dos mesmos e enviar os dados corrigidos para a função 'updateItem', que já está importada.
export default function UpdateButton({ itemId, item }) {
  const { updateItem } = useContext(StockContext)
  const navigate = useNavigate()

  const handleClick = () => {
    updateItem(itemId, item)
    navigate(`/products/${itemId}/update`)
  }

  return (
    <button
    className="button is-primary is-small"
    onClick={handleClick}
  >
    Update
  </button>
  )
}