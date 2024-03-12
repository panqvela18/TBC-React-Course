import "./App.css";
import { blogData } from "./Data/BlogData";
import Blog from "./components/Blog";
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
      <div className="flex items-center justify-center py-16">
        <h1
          style={{
            fontSize: "clamp(1rem, 0.5385rem + 2.0513vw, 3rem)",
          }}
          className="inline-block border-b-2 pb-2 text-blue-500 font-bold"
        >
          BLOGS
        </h1>
      </div>
      <section className="grid grid-cols-3 grid-rows-2 gap-4 px-[4%] pb-20">
        {blogData.map((blog) => {
          return (
            <Blog
              key={blog.id}
              id={blog.id}
              img={blog.img}
              title={blog.title}
              description={blog.description}
            />
          );
        })}
      </section>
      <Footer />
    </>
  );
}

export default App;
