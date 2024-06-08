import PropTypes from 'prop-types'

Input.propTypes = {
    passwordSize: PropTypes.number.isRequired,
    setPasswordSize: PropTypes.func.isRequired
}
export default function Input(props) {
    /*'+' is to convert the target.value to number, because we need to work with it as a number.*/
    return(
        <input type="number" id="passwordSize" min={2} value={props.passwordSize} onChange={(e) => props.setPasswordSize(+e.target.value)}/>
    )
}
// Run 'npm install prop-types' for the 'props' work·