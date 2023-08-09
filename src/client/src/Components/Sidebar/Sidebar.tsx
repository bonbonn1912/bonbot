import SideBarSelect from "./SidebarSelect";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";


interface SidebarProps {
  showSidebar: boolean;
  mainPageHandler: (name: string) => void,
}

export const Sidebar = ({ showSidebar, mainPageHandler }: SidebarProps) => {
  const { auth, setAuth } = useContext(AuthContext);
  const clickHandler = (page: string) =>{
    mainPageHandler(page)
  }

  const [sideBarSelectElements, setSideBarSelectElements] = useState([
    { isSelected: false, name: "Admin" },
    { isSelected: false, name: "Commands" },
    { isSelected: false, name: "Moderation" },
    { isSelected: false, name: "Documentation" },
 
  ]);

  const updateSelectedStatus = (name: string) => {
    const updatedElements = sideBarSelectElements.map(element => {
      if (element.name === name) {
        return { ...element, isSelected: true };
      }
      return { ...element, isSelected: false };
    });
    clickHandler(name)
    setSideBarSelectElements(updatedElements);
  };

  return (
    <div
      className={`${
        showSidebar ? "block" : "hidden"
      } w-64 bg-gray-900 text-white`}
      style={{ minWidth: "250px" }}
    >
           <div className="w-64 mt-16">
        {sideBarSelectElements.map((data, index) => {
          if (data.name === "Admin" && auth.isAdmin) {
         
            return (  <SideBarSelect
              key={index}
              index={index}
              title={data.name}
              selectHandler={updateSelectedStatus}
              isSelected={data.isSelected}
            /> )
          
          }else if(data.name !== "Admin"){
            return (
              <SideBarSelect
                key={index}
                index={index}
                title={data.name}
                selectHandler={updateSelectedStatus}
                isSelected={data.isSelected}
              />
            );
          }
        })}
      </div>

      {/* Sidebar Content */}
      {/* Hier können Sie verschiedene Commands für Ihren Twitch Chat Bot hinzufügen */}
    </div>
  );
};
