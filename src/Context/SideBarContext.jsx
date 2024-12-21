import { createContext, useState } from "react";

export const SideBarContext = createContext();


export default function SideBarContextProvider ({children}) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen); 
    };
  

    return <SideBarContext.Provider value={{isOpen , setIsOpen , toggleSidebar}}> {children} </SideBarContext.Provider>
}
