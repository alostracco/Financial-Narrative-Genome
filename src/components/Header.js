import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Company Sentiment Analysis</h1>
        <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/analysis">Analysis</Link>
            <Link to="/insights">Insights</Link>
        </nav>
    </header>
);

export default Header;
