import React, {useEffect,useState} from 'react'

import AuthService from "../services/auth.service";

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import StatusCard from '../components/status-card/StatusCard'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

import statusCards from '../assets/JsonData/status-card-data.json'

const chartOptions = {
    series: [{
        name: 'nombre action ',
        data: [40,70,20,90,36,80,30,91,60]
    },
    {
        name: 'nombre adherent ajouté ',
        data: [20,40,50,10,46,20,80,71,30]
    }, {
        name: 'nombre contrat signé',
        data: [40, 30, 20, 60, 40, 16, 40, 20, 51]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}

const topCustomers = {
    head: [
        'user',
        "nombre d'action",
        'classement'
    ],
    body: [
        {
            "username": "celine iacobelli",
            "order": "4",
            "price": "1"
        },
        {
            "username": "jean-luck",
            "order": "2",
            "price": "2"
        },
        {
            "username": "naima hamdoun",
            "order": "2",
            "price": "3"
        },
        {
            "username": "rim meftah",
            "order": "2",
            "price": "4"
        },
        {
            "username": "anthony baker",
            "order": "1",
            "price": "5"
        }
    ]
}

const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
        <td>{item.price}</td>
    </tr>
)

const latestOrders = {
    header: [
        "order id",
        "user",
        "total price",
        "date",
        "status"
    ],
    body: [
        {
            id: "#OD1711",
            user: "john doe",
            date: "17 Jun 2021",
            price: "$900",
            status: "shipping"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "pending"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "refund"
        }
    ]
}

const orderStatus = {
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>{item.price}</td>
        <td>{item.date}</td>
        <td>
            <Badge type={orderStatus[item.status]} content={item.status}/>
        </td>
    </tr>
)
const logOut = () => {
    AuthService.logout();
  };
const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(()=>{
        const user = AuthService.getCurrentUser();
            if (user){
                setCurrentUser(user) 
            }
     },[]) 

    const themeReducer = useSelector(state => state.ThemeReducer.mode)

    return (
        
        <div>
            {currentUser ?(
                <div>
                    <h2 className="page-header">Dashboard</h2>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                {
                                    statusCards.map((item, index) => (
                                        <div className="col-6" key={index}>
                                            <StatusCard
                                                icon={item.icon}
                                                count={item.count}
                                                title={item.title}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card full-height">
                                {/* chart */}
                                <Chart
                                    options={themeReducer === 'theme-mode-dark' ? {
                                        ...chartOptions.options,
                                        theme: { mode: 'dark'}
                                    } : {
                                        ...chartOptions.options,
                                        theme: { mode: 'light'}
                                    }}
                                    series={chartOptions.series}
                                    type='line'
                                    height='100%'
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <div className="card__header">
                                    <h3>top customers</h3>
                                </div>
                                <div className="card__body">
                                    <Table
                                        headData={topCustomers.head}
                                        renderHead={(item, index) => renderCusomerHead(item, index)}
                                        bodyData={topCustomers.body}
                                        renderBody={(item, index) => renderCusomerBody(item, index)}
                                    />
                                </div>
                                <div className="card__footer">
                                    <Link to='/'>view all</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="card">
                                <div className="card__header">
                                    <h3>latest orders</h3>
                                </div>
                                <div className="card__body">
                                    <Table
                                        headData={latestOrders.header}
                                        renderHead={(item, index) => renderOrderHead(item, index)}
                                        bodyData={latestOrders.body}
                                        renderBody={(item, index) => renderOrderBody(item, index)}
                                    />
                                </div>
                                <div className="card__footer">
                                    <Link to='/'>view all</Link>
                                </div>
                            </div>
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

export default Dashboard
