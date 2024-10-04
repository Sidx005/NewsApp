import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types'
export class News extends Component {
    static defaultProp={
        country:"us",
        category:'business'
       
    }
    static actualProp={
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0, // Initialize totalResults in state
            nameJ:'Sid'
        };
        document.title=`NewsWeb-${this.props.category}`
    }
    async updateNews(){
        this.setState({loading:true});
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        let data=await fetch(url);
        let parseData=await data.json();
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false });
    console.log(parseData);
    
    
    }
    async componentDidMount() {
this.updateNews(this.state.page)
        
    }

    handlePrev = async () => {
        // if (this.state.page > 1) { // Prevent going to a negative page number
        //     this.setState({ loading: true });
        //     let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        //     let data = await fetch(url);
        //     let parseData = await data.json();
        //     console.log(parseData);
            
        //     this.setState({ page: this.state.page - 1, articles: parseData.articles, loading: false });
        // }
    this.setState({page:this.state.page-1})
    this.updateNews()

    }

    handleNext = async () => {
        // const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);
        // if (this.state.page < totalPages) { // Prevent going beyond total pages
        //     this.setState({ loading: true });
        //     let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        //     let data = await fetch(url);
        //     let parseData = await data.json();
        //     console.log(parseData);
            
        //     this.setState({ page: this.state.page + 1, articles: parseData.articles, loading: false });
        // }
        this.setState({page:this.state.page+1})
        this.updateNews()

    }

    render() {
        const filteredNews=this.state.articles.filter(fill=>fill.title.toLowerCase().includes(this.props.searchTerm.toLowerCase()))
        console.log('render');
        // console.log(this.setState.prototype);
        

        return (
            <div className='container my-3 '> 
                <h1 className='text-center' style={{marginTop:'90px'}}>News</h1>
                {this.state.loading && <p className='text-center'>Loading ...</p>}
                <div className="row">
                    {!this.state.loading&&filteredNews.map((item, index) => (
                        <div className="col-md-4" key={item.url}> {/* Added key prop */}
                            <NewsItem name={this.state.nameJ}
                                title={item.title.slice(0, 45) + '...'} 
                                newsUrl={item.url} 
                                description={item.description} 
                                imgUrl={item.urlToImage}
                                source={item.source.name}
                                author={item.author}
                                date={new Date(item.publishedAt).toGMTString()}
                            />
                        </div>
                    ))}
                </div>
                <div className="container d-flex justify-content-between gap-2">
                    <button onClick={this.handlePrev} disabled={this.state.page <= 1} className='btn btn-primary btn-dark'>&larr; Previous</button>
                    <button onClick={this.handleNext} disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-primary'>Next &rarr;</button>
                </div>
            </div>
        );
    }
}

export default News;
