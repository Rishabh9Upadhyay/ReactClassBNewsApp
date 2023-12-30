import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spineer from './Spineer'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props) {
    super(props);                      //super must be used
    console.log("I am constructor fron news components")
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url)
    this.props.setProgress(30);
    // console.log(data)               //it is promise in itself
    let parshedData = await data.json()
    console.log(parshedData)               //it is promise in itself
    this.props.setProgress(70);
    this.setState({
      articles: parshedData.articles,
      totalResults: parshedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    console.log("cdn")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd531709c99b4021b745352edca5e214&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url)
    // // console.log(data)               //it is promise in itself
    // let parshedData = await data.json()
    // console.log(parshedData)               //it is promise in itself
    // this.setState({articles: parshedData.articles,
    //   totalResults: parshedData.totalResults,
    //   loading: false
    //   })
    this.updateNews();
  }
  handleNextClick = async () => {
    // if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd531709c99b4021b745352edca5e214&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true})
    //   let data = await fetch(url)
    //   let parshedData = await data.json()
    //   this.setState({
    //     page: this.state.page+1,
    //     articles: parshedData.articles,
    //     loading: false
    //   })
    // }
    this.setState({ page: this.state.page + 1 })
    this.updateNews();
  }
  handlePriviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd531709c99b4021b745352edca5e214&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url)
    // let parshedData = await data.json()
    // this.setState({
    //   page: this.state.page-1,
    //   articles: parshedData.articles,
    //   loading: false
    // })
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }



  fetchMoreData = async () => {
    this.setState({page: this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true })
    let data = await fetch(url)
    // console.log(data)               //it is promise in itself
    let parshedData = await data.json()
    console.log(parshedData)               //it is promise in itself
    this.setState({
      articles: this.state.articles.concat(parshedData.articles),
      totalResults: parshedData.totalResults,
      loading: false,
    })
  };


  render() {
    console.log("render")
    return (
      <div className='container my-2'>
        <h2 className='text-center'>NewsMonkey- Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spineer />} 
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spineer />} 
        >

        <div className="container">
        
        
        <div className="row">
        {/* {!this.state.loading && this.state.articles.map((element) => {   */}
        {this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
          </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePriviousClick}> &larr; Privious</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next  &rarr;</button>
        </div> */}
      </div>
    )
  }
}

export default News


// col-md-4 means meadium devices me 4 column. In bootstrap there use to be 12 column.
// Now in the question we have to make a row of three items.
// when three item will be identified then a row will be papulate.