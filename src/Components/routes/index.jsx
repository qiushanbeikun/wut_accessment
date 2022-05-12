import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Contact from "../Contact";
import Home from "../Home";

export default function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/contact/:id" element={<Contact/>}/>
        <Route path="/add" element={<Contact/>}/>
      </Routes>
    </Router>
  )
}