import React, { Component } from 'react';
import News from './News';
import { Link } from 'react-router-dom';
import './Animation.css'
import Footer from './Footer';
export default class Home extends Component {
  static Prop={

  }
 constructor(){
  super();
  this.state={
    articles:[],
    entertainmentArticles:[],
    page:1,
    pageSize:3,
    entertainSize:10

  }
  this.fetchNews=async()=>{
    const url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}&page=${this.state.page}&pageSize=${this.state.pageSize}&category=general`;
    const news=await fetch(url);
    const data=await news.json();
    this.setState({articles:data.articles});
    console.log(data);
    

  }
  this.fetchEntertainmentNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}&page=${this.state.page}&pageSize=${this.state.entertainSize}&category=entertainment`;
    const news = await fetch(url);
    const data = await news.json();
    this.setState({ entertainmentArticles: data.articles });
  };
  
 }  
 componentDidMount(){
  this.fetchNews();
  this.fetchEntertainmentNews()
 }
  render() {
    return (
      <div className="text-center position-relative" style={{ marginTop: '90px' }}>
        <h1 style={{ fontFamily: 'fantasy' }}>NewsWeb</h1>
        <hr />
        <div className="container mainContainer d-flex justify-content-between">
          <div className="d-flex trending position-relative flex-column col-md-8 text-start">
            <h2 className="mb-4">Trending</h2>
            {this.state.articles.map((item, index) => (
    <Link 
      key={item.title} // Moved key here
      className="trend-links" 
      style={{ textDecoration: 'none', color: 'black' }} 
      to={item.url}
    >
      <div className="d-flex flex-column gap-3 shadow text-left mb-4">
        <img
          src={item.urlToImage}
          alt="Article"
          style={{ width: '100%', height: 'auto' }}
        />
        <h3 className="p-2">{item.title}</h3>
        <p className="p-2">{item.description}</p>
      </div>
    </Link>
  ))}
  <div className="position-absolute  bottom-0 translate-middle-x start-50">
  <Link className='text-black' to={'general'}>More</Link>   
            </div>
          </div>

          {/* Sidebar Section */}
          <div className=" sidebar  shadow d-flex flex-column " style={{ position: 'sticky', width:'300px',top: '20px',height:'700px'  }}>
            <h3 className='w-full p-3  text-white bg-primary'>Sidebar</h3>
            <div className="d-flex p-x-2 listdiv   h-70 align-items-center">
            <ul className='text-start marquee d-flex flex-column  gap-2' style={{listStyleType:'decimal'}}>
            {this.state.entertainmentArticles.map((items,index)=>(
            <li><Link  className='text-black' to={items}> {items.title?items.title.slice(0,45)+'...':''}</Link></li>
            ))}  
         </ul>
            </div>



          </div>
        </div>        <Footer/>

      </div>
    );
  }
}
