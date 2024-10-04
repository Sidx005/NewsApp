import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// Link
export class NewsItem extends Component {
  
  render() {
    // console.log(this.props.name);
    
    const { title, description, imgUrl, newsUrl,source,author,date } = this.props;
    return (
      <div className="col mb-4">
        <div className="card h-100" >
          <img
            src={imgUrl ? imgUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJRvJ43kOLuugTnviR234lmwg57Pz991lYA&s'}
            className="card-img-top"
            alt="..."
            style={{ height: "10rem", objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{title ? title : 'No Title'}
            <span className="badge position-absolute top-0 translate-middle start-100 z-1 bg-danger">{source}</span>

            </h5>
            <p className="card-text">{description ? description.slice(0, 45) + '...' : 'No description'}</p>
            <p className="card-text"><small className='text-muted'>By {!author?'unknown':author} on {date}</small> </p>
            <Link
              target='_blank'
              to={newsUrl ? newsUrl : '#'}
              className="btn w-50 btn-sm btn-primary mt-auto"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
