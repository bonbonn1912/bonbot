
interface SidebarProps {
    showSidebar: boolean,
}

export const Sidebar = ({ showSidebar} : SidebarProps) => {
   return(<div
    className={`${
      showSidebar ? 'block' : 'hidden'
    } w-64 bg-gray-800 text-white p-4`} style={{ minWidth: '250px' }}
  >
    {/* Sidebar Content */}
    {/* Hier können Sie verschiedene Commands für Ihren Twitch Chat Bot hinzufügen */}
  </div>)       
}