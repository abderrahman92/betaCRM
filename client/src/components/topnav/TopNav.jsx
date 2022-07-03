import React, { useEffect, useState } from 'react'

import AuthService from "../../services/auth.service";

import './topnav.css'

import { Link } from 'react-router-dom'

import Dropdown from '../dropdown/Dropdown'

import ThemeMenu from '../thememenu/ThemeMenu'



import user_menu from '../../assets/JsonData/user_menus.json'

import AuthAction from '../../services/Action'

import Moment from 'react-moment';




import 'moment/locale/fr';


const curr_user = {
    username: 'Tuat Tran',

}
const user = AuthService.getCurrentUser();

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
       <i class='bx bxs-notepad' ></i>
        <span>{item.nom_societe} RDV:  <Moment fromNow>{item.date_rdv}</Moment></span>
    </div>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)

const renderUserMenu =(item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const Topnav = props => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const[Action,SetAction]=useState([]);

   
   
     useEffect(()=>{
        const user = AuthService.getCurrentUser();
            if (user){
                 //ACTION 
                 AuthAction.findAll().then((response) => {
                    SetAction(response.data)
                })
            .catch((e) => {
                console.log(e);
            });

                setCurrentUser(user)
                
            }
    
       
     },[])
     console.log(Action)
     const Action_util =Action.filter(task=>task.id_utili===currentUser.id)
     console.log(Action_util)
     console.log(Action)
     let date = new Date()
     const mysn =1000 * 3600 * 24
     const fltr_date =Action.filter(task=>((   (new Date (task.date_rdv)-date)/mysn)<7)  &&((new Date (task.date_rdv)-date)/mysn)>0)

     const Action_util1 =fltr_date.filter(task=>task.id_utili===currentUser.id)
     console.log(fltr_date )
     return (
        <div>
            {user?(
        
                <div className='topnav'>
                    <div className="input-group mb-3">
                    <div className="topnav">
                      <div className="topnav__search">
                         
                      </div>
                    </div> 
                  </div>
                    <div className="topnav__right">
                        <div className="topnav__right-item">
                            {/* dropdown here */}
                            {currentUser ?(
                        
                        <Link>
                        <div  className="sidebar__item">
                            <div  className={`sidebar__item-inner`}>
                            <i className='bx bxs-user-check' ></i>
                                <span >
                                {currentUser.username}
                                </span>
                            </div>
                            
                        </div>
                        </Link>
                            ):(
                                <Dropdown
                                customToggle={() => renderUserToggle(curr_user)}
                                contentData={user_menu}
                                renderItems={(item, index) => renderUserMenu(item, index)}
                            />
                            )}
                        </div>
                        <div className="topnav__right-item">
                            <Dropdown
                                icon='bx bx-bell'
                                badge={Action_util1.length}
                                contentData={Action_util1}
                                renderItems={(item, index) => renderNotificationItem(item, index)}
                                renderFooter={() => <Link to='/'>View All</Link>}
                            />
                            {/* dropdown here */}
                        </div>
                        <div className="topnav__right-item">
                            <ThemeMenu/>
                        </div>
                    </div>
                </div>
                ):(
                    <div>               
                    </div>
                )}
        </div>    
       
    )
}

export default Topnav
