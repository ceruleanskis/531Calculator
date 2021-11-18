import React from 'react';
import {Link} from 'react-router-dom';


function Navbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
            <div className="container">
                <ul className="nav navbar-nav ml-auto navbar-toggler" data-toggle="collapse"
                    data-target=".navbar-collapse">
                    <li className="nav-item text-primary">
                        <Link to="/about"><span className="nav-link">About</span></Link>
                    </li>
                </ul>
                <div className="collapse navbar-collapse w-100">
                </div>
                <Link to="/">
                <span className="navbar-brand order-first order-md-0 mx-0">
                    <i className="fas fa-dumbbell"/> 531 Calculator <i className="fas fa-dumbbell"/></span>
                </Link>
                <div className="collapse navbar-collapse w-100 justify-content-end">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item text-primary">
                            <Link to="/about"><span className="nav-link">About</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar