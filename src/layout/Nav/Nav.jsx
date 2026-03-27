import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Package, Users, Smartphone, Monitor, ChevronDown } from 'lucide-react';
import './nav.scss'


export default function Nav() {
  const [productShow, setProductShow] = useState(false)
  const navigate = useNavigate()

  return (
    <div className='nav'>
      <div className="navTop">後臺管理系統</div>
      <div className="navContent">
        <ul className="navContent__list">
          <li className="navContent__item" onClick={()=>{navigate('/dashboard')}}>
            <Home className="navContent__itemIcon" />
            <span>首頁</span>
          </li>

          <li className="navContent__itemGroup">
            <div className="navContent__item" onClick={() => { setProductShow(!productShow) }}>
              <Package className="navContent__itemIcon" />
              <span>商品</span>
              <ChevronDown
                size={16}
                style={{
                  marginLeft: 'auto',
                  transition: 'transform 0.3s',
                  transform: productShow ? 'scaleY(-1)' : 'scaleY(1)'
                }}
              />
            </div>
            <ul
              className='navContent__subList'
              style={{ height: productShow ? `${2 * 41}px` : '0px' }}
            >
              <li className="navContent__subItem" onClick={(()=>{navigate('product/mobile')})}>
                <Smartphone size={16} style={{ marginRight: '8px' }} />
                手機
              </li>
              <li className="navContent__subItem"  onClick={(()=>{navigate('product/computer')})}>
                <Monitor size={16} style={{ marginRight: '8px' }} />
                電腦</li>
            </ul>
          </li>

          <li className="navContent__item">
            <Users className="navContent__itemIcon" />
            <span>用戶管理</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
