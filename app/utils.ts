
 
 export const debounce = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };


  // export function setTheme(pref: string) {
  //   if (pref === "os") {
  //     document.documentElement.classList.remove("light");
  //     document.documentElement.classList.remove("dark");
  //     localStorage.removeItem("theme");
  //   } else {
  //     document.documentElement.classList.remove("light");
  //     document.documentElement.classList.remove("dark");
  //     document.documentElement.classList.add(pref);
  //     localStorage.setItem("theme", pref);
  //   }
  // }

  // export const themeList = [
  //   {
  //     title: "os",
  //     icon: "test",
  //   },
  //   {
  //     title: "light",
  //     icon: "light"
  //   },
  //   {
  //     title: "dark",
  //     icon: "dark"
  //   },
  // ];