import React, { Component } from 'react';
import Links from './Links';
import { Link } from 'react-router-dom';
import './Navbar.css'
export default class Navbar extends Component {
  constructor(){
    super();
    this.state={
      searchTime:null
    }
  }
  handleSearch=(e)=>{
  const item=e.target.value;
    if(this.state.searchTime){
      clearTimeout(this.state.searchTime)
    }
    const newTimeOut=setTimeout(()=>{
             this.props.onSearch(item);

    },500);
    this.setState({searchTime:newTimeOut})
  
  }
  render() {
    return (
      <nav className="navbar fixed-top  navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NewsWeb</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {Links.map((items, index) => (
                <li key={items.category} className="nav-item">
                  <Link className="nav-link" to={`/${items.link}`}>
                    {items.category.charAt(0).toUpperCase() + items.category.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <input onChange={this.handleSearch} className='bg-transparent border border-success rounded p-2 outline-none' type="search" name="" id="" placeholder='Search' />
        </div>
      </nav>
    );
  }
}
