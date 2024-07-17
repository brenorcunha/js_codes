import { useRouteError, isRouteErrorResponse } from "react-router-dom";
// Using the 'useRouteError' HOOK from 'React Router' and then,create a proper fallback:

export default function ProductBoundary() {
    const error = useRouteError()
    if(isRouteErrorResponse(error)){
        switch (error.status) {
            case 404:
                return <h2>Oops, product not found...</h2>
                
            case 401:
                return <h2>You're not allowed to view this page!</h2>

            case 400:
                return <h2>Sorry, something went wrong with the request...</h2>
            case 500:
                return <h2>500 - Internal server error.</h2>
        }
    }
    return <h2>Something went wrong...</h2>
}