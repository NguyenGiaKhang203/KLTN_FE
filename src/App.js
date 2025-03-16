
import { useDispatch } from "react-redux"
import SignUpPage from "./pages/SignUpPages/SignUpPage"
import Loading from "./components/LoadingComponent/LoadingComponent"; 
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  // const dispatch= useDispatch()
  // const [isLoading, setIsLoading] = useState(false)
  
  // useEffect (() => {
  //   setIsLoading(true)
  // }, [])

  return (
    <div style={{ height: '100vh', width:'100%'}}>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
