import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import RouteEditScreen from "./screens/RouteEditScreen";
import RouteMapScreen from "./screens/RouteMapScreen";
import RoutesListScreen from "./screens/RoutesListScreen";
import StopEditScreen from "./screens/StopEditScreen";
import StopsListScreen from "./screens/StopsListScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/stops" element={<StopsListScreen />} exact />
            <Route path="/stop/:id/edit" element={<StopEditScreen />} exact />
            <Route path="/routes" element={<RoutesListScreen />} exact />
            <Route path="/route/:id/edit" element={<RouteEditScreen />} exact />
            <Route path="/route/:id/view" element={<RouteMapScreen />} exact />
            <Route path="/" element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

// /route/${route._id}/edit
// /stop/${stop._id}/edit
export default App;
