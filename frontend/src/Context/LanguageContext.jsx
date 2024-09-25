import { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English'); // default is English
  const [textSize, setTextSize] = useState(16); // default text size

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'English' ? 'Hindi' : 'English'));
  };

  const increaseTextSize = () => {
    setTextSize((prev) => prev + 2);
  };

  const decreaseTextSize = () => {
    setTextSize((prev) => (prev > 14 ? prev - 2 : prev)); // Ensure minimum size
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, textSize, increaseTextSize, decreaseTextSize }}>
      {children}
    </LanguageContext.Provider>
  );
};
