import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/modules/userStore.jsx';
import './banner.scss'

export default function Banner() {
    const [time, setTime] = useState(dayjs().format('YYYY年MM月DD日 HH:mm:ss'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useSelector((state) => state.user);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(dayjs().format('YYYY年MM月DD日 HH:mm:ss'));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const onLogout = () => {
        if (window.confirm('確定要登出嗎？')) {
            dispatch(logoutUser()).then(() => {
                navigate('');
            });
        }
    };

    return (
        <div className='banner'>
            <div className='bannerUser' >
                <span>歡迎，{userId}</span>
                <span onClick={onLogout} className='bannerUser__logout'>登出</span>
            </div>
            <div className='bannerTime'>
                <span>{time}</span>
            </div>
        </div>
    )
}
