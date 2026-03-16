import React from 'react'
import DashboardCard from './DashboardCard.jsx';
import dashboardCard_menu from '../../config/dashboardCard_menu.js';
import './dashboard.scss'

export async function loader({ request, params }) {
  return null
}

export default function Dashboard() {

  return (
    <div className='dashboard'>
      <div className='dashboardCard__layout'>
        {dashboardCard_menu.map((item, index) => {
          return (
            <DashboardCard
              key={item.title}
              title={item.title}
              value={item.value}
              trend={item.trend}
              iconSrc={item.iconSrc}
            />)
        })}
      </div>
      <div className='dashboardMain__layout'>
        請選擇管理項目
      </div>
    </div>

  )
}

export { Dashboard as Component } 