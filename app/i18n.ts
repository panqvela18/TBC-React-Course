import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Header
      home: "HOME",
      about: "ABOUT",
      blog: "BLOG",
      contact: "CONTACT",
      profile: "PROFILE",
      logout: "LOG OUT",
      //TITLE
      blogTitle: "BLOG",
      productTitle: "PRODUCTS",
      contactTitle: "CONTACT",
      profileTitle: "PROFILE",
      // search

      getInTouch: "GET IN TOUCH",
      messageUs: "MESSAGE US",
      search: "Search",
      resetProduct: "Reset Products",
      sortByPrice: "Sorts By Price",
      // Footer
      allRight: "All rights reserved.",
      TermsAndConditions: "Terms and Conditions",
      PrivacyPolicy: "Privacy Policy",
      subscribe: "Subscribe",
      footerAbout: "About",
      footerContact: "Contact",
      learnMore: "Learn More",
      seeMore: "SEE MORE",
      // Contact form
      name: "Name",
      surname: "Surname",
      email: "Email",
      message: "Message",
      send: "SEND",
    },
  },
  ka: {
    translation: {
      // Header
      home: "მთავარი",
      about: "ჩვენ შესახებ",
      blog: "ბლოგი",
      contact: "კონტაქტი",
      profile: "პროფილი",
      logout: "გასვლა",
      // Title
      blogTitle: "ბლოგი",
      productTitle: "პროდუქტები",
      contactTitle: "კონტაქტი",
      profileTitle: "პროფილი",
      // search
      getInTouch: "დაგვიკავშირდი",
      messageUs: "მოგვწერე",
      search: "ძიება",
      resetProduct: "აღდგენა",
      sortByPrice: "დალაგება ფასის ზრდადობით",
      // Footer
      allRight: "ყველა უფლება დაცულია",
      TermsAndConditions: "წესები და პირობები",
      PrivacyPolicy: "Კონფიდენციალურობა",
      subscribe: "გამოწერა",
      footerAbout: "ჩვენ შესახებ",
      footerContact: "კონტაქტი",
      // card
      learnMore: "გაიგე მეტი",
      seeMore: "ნახე მეტი",
      // Contact form
      name: "სახელი",
      surname: "გვარი",
      email: "ელ-ფოსტა",
      message: "შეტყობინება",
      send: "გაგზავნა",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
