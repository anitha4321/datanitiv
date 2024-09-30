import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {  FaGripHorizontal, FaCalendarAlt, FaCog, FaBookOpen } from 'react-icons/fa';  // Added new icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { SidebarContext } from '../context/SidebarContext';


const sidebarItems = [
    { name: "Home", href: "/", icon: FaGripHorizontal },     // Grid-like icon for Home
    { name: "Discover", href: "/discover", icon: FaCalendarAlt },  // Calendar icon for Discover
    { name: "Settings", href: "/settings", icon: FaCog },      // Gear icon for Settings
    { name: "Library", href: "/library", icon: FaBookOpen }    // Book icon for Library
];

const Sidebar = () => {
  const location = useLocation();
  const { isCollapsed, toggleSidebarCollapse } = useContext(SidebarContext);

  return (
    <div className={`flex ${isCollapsed ? "w-16" : "w-40"} h-screen bg-gray-100 transition-all overflow-hidden`}>  {/* Set h-screen here */}
      <aside className="flex flex-col h-full">  {/* Make sure it takes full height */}
        <ul className="flex flex-col space-y-2 mt-6">
          {sidebarItems.map(({ name, href, icon: Icon }) => (
            <li key={name} className="flex">
              <Link
                to={href}
                className={`flex items-center p-3 text-gray-700 ml-2 hover:bg-gray-200 rounded-md transition-colors w-full ${
                  location.pathname === href ? "bg-red-500 text-white" : ""
                } ${isCollapsed ? "justify-center" : ""}`}  // Center icons when collapsed
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">{name}</span>}  {/* Hide text when collapsed */}
              </Link>
            </li>
          ))}
        </ul>

        {/* Collapse button placed at the bottom */}
        <button className="p-2 focus:outline-none mt-auto" onClick={toggleSidebarCollapse}>
          {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;
