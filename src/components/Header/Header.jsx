import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';

const Header = () => {
    const {isAuth} = useSelector(({user})=> user)
    
    return (
        <header>
            <div className={styles.container}>
                <div>
                    <Link to='/' className='text-[#8DA5FC] font-bold text-[47px]'>Logo</Link>
                </div>
                <ul className='flex'>
                    <li className='mr-8'><NavLink to='/' className='hover:text-[#8DA5FC] transition-color duration-200'>Проекти</NavLink></li>
                    <li>{isAuth ? <NavLink to='/cabinet' className='hover:text-[#8DA5FC] transition-color duration-200'>Кабінет</NavLink>  :<NavLink to='/registration' className='hover:text-[#8DA5FC] transition-color duration-200'>Увійти</NavLink>}</li>                    
                </ul>
            </div>
      
        </header>
    );
};

export default Header;