import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import image1 from "./images/illustration-1.svg";
import image2 from "./images/illustration-2.svg";

function App() {
  return (
    <>
      <Header />
      <section className="px-[4%] mt-20 flex items-center justify-between">
        <div className="w-[45%] flex flex-col">
          <p
            className="text-blue-500 font-bold mb-4"
            style={{ fontSize: "clamp(1rem, 0.5385rem + 2.0513vw, 3rem)" }}
          >
            All your files in one secure location, accessible anywhere.
          </p>
          <p className="text-[#07043B] text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <img className="w-[45%]" src={image1} alt="image1" />
      </section>
      <section className="px-[4%] my-20 flex items-center justify-between">
        <img className="w-[45%]" src={image2} alt="image1" />

        <div className="w-[45%] flex flex-col">
          <p
            style={{ fontSize: "clamp(1rem, 0.5385rem + 2.0513vw, 3rem)" }}
            className="text-blue-500 text-5xl font-bold mb-4"
          >
            Stay productive, wherever you are
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
