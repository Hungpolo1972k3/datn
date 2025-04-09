import React, { createContext, useContext, useState } from "react";
import Notice from "../components/Notice";

const NoticeContext = createContext();
export const useNotice = () => useContext(NoticeContext);

export const NoticeProvider = ({ children }) => {
  const [notice, setNotice] = useState(null);

  const showNotice = (label, content) => {
    setNotice({ label, content });
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <NoticeContext.Provider value={{ showNotice }}>
      {children}
      {notice && <Notice label={notice.label} content={notice.content} />}
    </NoticeContext.Provider>
  );
};
