import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import News from "./Components/News";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
export default class App extends Component {
  constructor(){
    super();
    this.state={
      searchTerm:''
    }
  }
  handleSearch=(searchTerm)=>{
  this.setState({searchTerm});
  }
  pageSize=15
  render() {

    return (
      <Router>
        <Navbar onSearch={this.handleSearch} />
        <Routes>
          <Route exact path="/" element={<Home pageSize={this.pageSize}/>} /> {/* Default route */}
          <Route exact path="/general" element={<News searchTerm={this.state.searchTerm} key={'general'} pageSize={this.pageSize}  category="general" />} />
          <Route exact path="/sports" element={<News searchTerm={this.state.searchTerm} key={'sports'} pageSize={this.pageSize}  category="sports" />} />
          <Route exact path="/entertainment" element={<News searchTerm={this.state.searchTerm} key={'entertainment'} pageSize={this.pageSize}  category="entertainment" />} />
          <Route exact path="/business" element={<News searchTerm={this.state.searchTerm} key={'business'} pageSize={this.pageSize}  category="business" />} />
          <Route exact path="/health" element={<News searchTerm={this.state.searchTerm} key={'health'} pageSize={this.pageSize}  category="health" />} />
          <Route exact path="/technology" element={<News searchTerm={this.state.searchTerm} key={'technology'} pageSize={this.pageSize}  category="technology" />} />
          <Route exact path="/science" element={<News searchTerm={this.state.searchTerm} key={'science'} pageSize={this.pageSize}  category="science" />} />
        </Routes>

      </Router>
    );
  }
}
