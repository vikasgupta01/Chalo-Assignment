import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import RoutesListScreen from "./screens/RoutesListScreen";
import StopsListScreen from "./screens/StopsListScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            {/* <Route path="/stops" element={<StopsListScreen />} exact /> */}
            {/* <Route path="/routes" element={<RoutesListScreen />} exact /> */}
            <Route path="/" element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
