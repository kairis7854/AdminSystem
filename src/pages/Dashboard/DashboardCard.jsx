import React from 'react';
import './dashboardCard.scss'

const DashboardCard = ({ title, value, trend, iconSrc }) => {

    return (
        <div className="dashboardCard">
            <div className="dashboardCard__Top">
                <img className="dashboardCard__img" src={null} alt={title} />
                <div
                    className="dashboardCard__badge"
                    style={{
                        color: trend > 0 ? 'green' : 'red',
                        background: trend > 0 ?'#f0fdf4' : '#fef2f2'
                    }}
                >
                    {trend > 0 ? '↑' : '↓'}&nbsp;{trend}%
                </div>
            </div>

            <div className="dashboardCard__main">
                <p className="dashboardCard__title">{title}</p>
                <h2 className="dashboardCard__value">{value}</h2>
            </div>
        </div>
    );
};

export default DashboardCard;