import { useState } from 'react'
import './nav.scss'
import shop from '../../assets/shop.png'

export default function Nav() {
  const [productShow, setProductShow] = useState(true)


  return (
    <div className='nav'>
      <div className="navTop">
        <img className="navTop__logo" src={shop} alt="" />
        <div className="navTop__info">
          <h2 className="navTop__title">後臺管理系統</h2>
          <span className="navTop__subtitle">整合管理</span>
        </div>
      </div>
      <div className="navContent">
        <ul className="navContent__list">
          <li className="navContent__item">
            <img className="navContent__itemIcon" src={shop} alt="" />
            <span>控制台</span>
          </li>

          <li className="navContent__itemGroup">
            <div className="navContent__item" onClick={() => { setProductShow(!productShow) }}>
              <img className="navContent__itemIcon" src={shop} alt="" />
              <span>商品管理</span>
            </div>
            <ul
              className='navContent__subList'
              style={{ height: productShow ? `${2 * 41}px` : '0px' }}
            >
              <li className="navContent__subItem">智慧型手機</li>
              <li className="navContent__subItem">筆記型電腦</li>
            </ul>
          </li>

          <li className="navContent__item">
            <img className="navContent__itemIcon" src={shop} alt="" />
            <span>用戶管理</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
