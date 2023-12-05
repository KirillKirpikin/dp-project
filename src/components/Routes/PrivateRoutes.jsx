import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({children}) => {
    const {isAuth, status} = useSelector(({user})=>user);
    if(status === 'loading') {
      return <h2>Loading...</h2>
    }
    if (!isAuth) {
      return <Navigate to='/login'/>;
    }
    return children;   
  };
  
  export default PrivateRoute;