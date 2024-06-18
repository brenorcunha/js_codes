import products from "../database.json"
// Here we don't need the 'useparams' because react router provides this data already.
export function loadProduct({params}) {
    // O parâmetro '+' é para garantir que dado será comparado como inteiro:    x
    const product = products.find(p => p.id === +params.productId)
    if(!product){
        throw new Response("Oops... The product wasn't found", {status: 404})
    }
    return product
}
//Then, add the loader for the :procutId URL's in 'router.jsx'.