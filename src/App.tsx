import './App.css'
import { Route, Routes } from "react-router-dom";
import DisplayInfo from "./components/DisplayInfo.tsx";
import Categories from "./components/Categories.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<DisplayInfo/>}/>
            <Route path="categories" element={<Categories/>}/>
        </Routes>
    </>
  )
}

export default App
