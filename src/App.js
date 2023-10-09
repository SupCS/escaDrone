import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import ContactsPage from "./components/ContactsPage/ContactsPage"
import DroneList from "./components/DroneList/DroneList"
import Planning from "./components/Planning/Planning";
function App() {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/contacts" element={<ContactsPage/>} />
              <Route path="/dronelist" element={<DroneList />} />
              <Route path="/planning" element={<Planning/>} />
          </Routes>
      </Router>
  );
}


export default App;
