import React  from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav () {
    return (
        <ul className='nav'>
            <li>
                <NavLink to='/' activeClassName='active' exact>Home</NavLink>
            </li>
            <li>
                <NavLink to='/battle' activeClassName='active'>Battle</NavLink>
            </li>
            <li>
                <NavLink to='/popular' activeClassName='active'>Popular</NavLink>
            </li>
        </ul>
    )
}