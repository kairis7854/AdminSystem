import React from 'react'
import './dashboard.scss'

export async function loader({ request, params }) {
  return null
}

export default function Dashboard() {

  return (
    <div className='dashboard'>
      歡迎使用後臺管理系統
    </div>

  )
}

export { Dashboard as Component } 