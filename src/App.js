import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ImgWithTextSection from "./components/ImgWithTextSection";
import image1 from "./images/illustration-1.svg";
import image2 from "./images/illustration-2.svg";

function App() {
  return (
    <>
      <Header />
      <ImgWithTextSection
        img={image1}
        title="All your files in one secure location, accessible anywhere."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum."
        flex="flex-row"
      />
      <ImgWithTextSection
        img={image2}
        title="Stay productive, wherever you are        "
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum."
        flex="flex-row-reverse"
      />
      <Footer />
    </>
  );
}

export default App;
