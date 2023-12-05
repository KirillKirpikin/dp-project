import { Suspense, useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AppRoutes from "./components/Routes/AppRoutes";
import { useDispatch } from "react-redux";
import { checkUser } from "./store/user/userSlice";

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkUser());
    setIsLoading(false)
    
  },[dispatch])
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-grow">
        {isLoading ? <div>Loading...</div> :<Suspense fallback={<div>Loading...</div>}><AppRoutes/></Suspense> }        
      </main>
      <Footer/>
    </div>
  );
}

export default App;
