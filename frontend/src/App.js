import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import RouteEditScreen from "./screens/RouteEditScreen";
import RouteMapByIdScreen from "./screens/RouteMapByIdScreen";
import RouteMapScreenWithDropdown from "./screens/RouteMapScreenWithDropdown";
import RouteRegisterScreen from "./screens/RouteRegisterScreen";
import RoutesListScreen from "./screens/RoutesListScreen";
import StopEditScreen from "./screens/StopEditScreen";
import StopRegisterScreen from "./screens/StopRegisterScreen";
import StopsListScreen from "./screens/StopsListScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/stops" element={<StopsListScreen />} exact />
            <Route path="/stop/create" element={<StopRegisterScreen />} exact />
            <Route path="/stop/:id/edit" element={<StopEditScreen />} exact />
            <Route path="/routes" element={<RoutesListScreen />} exact />
            <Route
              path="/routes/view"
              element={<RouteMapScreenWithDropdown />}
              exact
            />
            <Route
              path="/route/create"
              element={<RouteRegisterScreen />}
              exact
            />
            <Route path="/route/:id/edit" element={<RouteEditScreen />} exact />
            <Route
              path="/route/:id/view"
              element={<RouteMapByIdScreen />}
              exact
            />
            <Route path="/" element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
