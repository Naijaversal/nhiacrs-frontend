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
        title: "Summary",
        icon: <BsDice4 size={15}/>,
        path: "/dashboard",
      },
      {
        title: "Add Item",
        icon: <BsCartPlus size={15}/>,
        path: "/add-product",
      },
     
      {
        title: "All Request",
        icon: <BsCartCheck size={15}/>,
        path: "/all-request",
      },
    ],
  },

 
  {
    title: "Reports",
    icon: <BsBook />,
    childrens: [
      {
        title: "Summary",
        icon: <BBsDice4 size={15}/>,
        path: "/report-dashboard",
      },
      {
        title: "Write Report",
        icon: <BsPencilSquare size={15}/>,
        path: "/contact-us",
      },
      {
        title: "Approve Reports",
        icon: <BsClipboardCheck size={15}/>,
        path: "/approve-request",
      },
    ],
    
  },
  {
    title: "Activities",
    icon: <BsCalendar4Event />,
    childrens: [
      {
        title: "Summary",
        icon: <BsDice4 size={15}/>,
        path: "/activity-dashboard",
      },
      {
        title: "Add Activity",
        icon: <BsCalendar2Plus size={15}/>,
        path: "/add-activity",
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
