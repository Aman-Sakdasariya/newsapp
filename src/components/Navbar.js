import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    text

    render() {
        return (
            <div className='navCont'>
                <nav className="navbar navbar-expand-lg bg-primary navbar-primary" style={{ backgroundColor: ' #e3f2fd' }}>
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/"><b>NewsBaba</b></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Home</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Categories
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to='/Sport'>Sport</Link></li>
                                        <li><Link className="dropdown-item" to='Health'>Health</Link></li>
                                        <li><Link className="dropdown-item" to='/Business' >Business</Link></li>
                                        <li><Link className="dropdown-item" to='/Entertainment' >Entertainment</Link></li>
                                        <li><Link className="dropdown-item" to='/Science' >Science</Link></li>
                                        <li><Link className="dropdown-item" to='/Technology' >Technology</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/About">About Us</Link>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search (Pending)" aria-label="Search" />
                                <Link>
                                    <button className="btn btn-outline-light" to='/Search' type="submit">Search</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </nav >
            </div >
        )
    }
}

export default Navbar
