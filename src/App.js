import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import ContactsPage from "./components/ContactsPage/ContactsPage"

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/contacts" element={<ContactsPage/>} />
          </Routes>
      </Router>
  );
}


export default App;
