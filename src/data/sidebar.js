import { CgProfile } from "react-icons/cg";
import {BsDice4,BsCalendar2Plus,BsCalendar4Event, BsCartCheck, BsCart, BsPencilSquare, BsCartPlus, BsCartDash, BsBook } from "react-icons/bs";
import {  FaRegCalendarCheck} from "react-icons/fa";
import {BsClipboardCheck} from "react-icons/bs"

const menu = [

  {
    title: "Inventory",
    icon: <BsCart />,
    childrens: [
      {
        title: "Inventory Dashboard",
        // icon: <BsDice4 size={15}/>,
        path: "/dashboard",
      },
      {
        title: "Add Item",
        icon: <BsCartPlus size={15}/>,
        path: "/add-product",
      }
    ],
  },

   
      {
        title: "Request Dashboard",
        icon: <BsCartCheck size={25}/>,
        path: "/make-request",
    
      },
 
  {
    title: "Reports",
    icon: <BsBook />,
    childrens: [
      {
        title: "Report Dashboard",
        // icon: <BsDice4 size={15}/>,
        path: "/report-dashboard",
      },
      {
        title: "Write Report",
        icon: <BsPencilSquare size={15}/>,
        path: "/contact-us",
      }
    ],
    
  },
  {
    title: "Activities",
    icon: <BsCalendar4Event />,
    childrens: [
      {
        title: "Task Dasboard",
        // icon: <BsDice4 size={15}/>,
        path: "/task-dashboard",
      },
      {
        title: "Add Task",
        icon: <BsCalendar2Plus size={15}/>,
        path: "/add-task",
      },
    ],
    
  },
  
  {
    title: "Account",
    icon: <CgProfile />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
      
    ],
  },
 
];

export default menu;
