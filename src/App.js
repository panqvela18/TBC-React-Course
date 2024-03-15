import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <Layout />
      <Footer />
    </div>
  );
}

export default App;
