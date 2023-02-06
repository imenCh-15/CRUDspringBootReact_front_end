import { Grid } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./layouts/Navbar";
import AddEmployee from "./views/AddEmployee";
import EditEmployee from "./views/EditEmployee";
import Home from "./views/Home";

function App() {
  return (
    <div>
      <Router>
        <Grid container spacing={2}>
          <Navbar />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/add" exact element={<AddEmployee />}></Route>
            <Route path="/update/:id" exact element={<EditEmployee />}></Route>
          </Routes>
        </Grid>
      </Router>
    </div>
  );
}

export default App;
