import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageurl, newsUrl, author, date, source} = this.props;
    return ( 
      <div className='my-2'>
        <div className="card">
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        <span className="visually-hidden">{source}</span>
      </span>
        <img src={imageurl?imageurl:"https://images.moneycontrol.com/static-mcnews/2023/08/Sensex_market_Nifty-770x433.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}... <span className="badge rounded-pill bg-success">{source}</span></h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {!author?"UnKnown":author} on {new Date(date).toGMTString()}</small></p>
          <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
        </div>
     </div>
      </div>
    )
  }
}

export default NewsItem
