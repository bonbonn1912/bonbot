import { RiAdminLine, RiSlashCommands } from "react-icons/ri"
import { HiOutlineDocumentText} from "react-icons/hi"
import { MdOutlineAddModerator, MdOutlineDisabledByDefault } from "react-icons/md"

interface SideBarSelectProps {
    isSelected: boolean
    selectHandler: (name: string)=> void,
    title: string,
    index: number,
}


const SideBarSelect = ({isSelected, selectHandler, index, title}: SideBarSelectProps) => {

    const handleClick = () =>{
        selectHandler(title)
    }
    const renderIcon= (name: string) =>{
        switch(name){
            case 'Commands': return <RiSlashCommands/>;
            case 'Moderation': return <MdOutlineAddModerator/>;
            case 'Admin': return <RiAdminLine/>;
            case 'Documentation': return <HiOutlineDocumentText/>;
            default: return <MdOutlineDisabledByDefault/>
        }
    }

    return (
      <div onClick={handleClick}  className={`w-full h-12 min-h-10 ${isSelected ? "bg-gray-800" : "bg-gray-900"} hover:bg-gray-800`}>
        <div className="flex ml-6 items-center h-full">
            <div>
                {renderIcon(title)}
            </div>
            <div className="flex ml-3">
            {title}
            </div>
         
        </div>
      </div>
    );
  };

export default SideBarSelect