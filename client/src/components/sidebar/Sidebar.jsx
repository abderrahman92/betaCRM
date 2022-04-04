import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import './sidebar.css'

import AuthService from "../../services/auth.service";

import logo from '../../assets/images/sofitech.png'

import sidebar_items from '../../assets/JsonData/sidebar_routes.json'
 
//sidabr desactivation parametres
const SidebarItedes = props => {

    const desactive = props.desactive ? '' : 'desactive';

    return (
        <div  className="sidebar__item">
            <div disabled  className={`sidebar__item-inner ${desactive}`}>
                <i className={props.icon}></i>
                <span >
                    {props.title}
                    {props.status}
                </span>           
            </div>  
        </div>  
    )
}


//sidabr activation parametres
const SidebarIteact = props => {

    const active = props.active ? 'active' : '';

    return (
        <div disabled className="sidebar__item">
            <div  disabled  className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span >
                    {props.title}
                    {props.status}
                </span>                
            </div>
        </div>
        
    )
}
const logOut = () => {
    AuthService.logout();
  };
const Sidebar = props => {
   
    const active = props.active ? 'active' : '';
    const [new_sidbar,setSidbar]=useState(sidebar_items);
    const [currentUser, setCurrentUser] = useState(undefined);
    const buttonclickedHandler = nouveau =>{
        
    }
     useEffect(()=>{
        const user = AuthService.getCurrentUser();
            if (user){
                const nouveaustate = [...new_sidbar]
                nouveaustate[6].status = "desactive"
                nouveaustate[7].status = "active"
                setSidbar(nouveaustate) 
                setCurrentUser(user) 
            }
     },[]) 

 
    const activeItem = new_sidbar.findIndex(item => item.route === props.location.pathname)
      //login desactiver
      const desaItem =new_sidbar.filter(task=>task.status==="desactive")
      const actItem =new_sidbar.filter(task=>task.status==="active")
    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img onClick={buttonclickedHandler} src={logo} alt="company logo" />
            </div>
            {
                actItem.map((item, index) => (
                    <Link  to={item.route} key={index}>
                       
                        <SidebarIteact
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                           
                        />
                    </Link>
                ))
            },
            {
                desaItem.map((item, index) => (
                        <SidebarItedes
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                           
                        />
                )) 
            },{currentUser ?(
                <div>
               
                <div  className="sidebar__item">
                    <div  className={`sidebar__item-inner${active}`}>
                    <i className='bx bxs-log-out'></i>
                        <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
                    </div>
                   
                </div>
                
                </div> 
                
                
              ): (
                <div  className="sidebar__item">
                    <div  disabled  className={`sidebar__item-inner `}>
                    <i class='bx bxs-user-x' ></i>
                        <span >
                        pas connecter
                        </span>
                    </div>
                    
                </div>
              )}
        </div>
    )
}

export default Sidebar
