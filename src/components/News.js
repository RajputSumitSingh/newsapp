import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    articles = [];
    count = 0;

    static defaultProps = {
        country: 'us',
        pageSize: 10,
        category: 'business',
    }

    static propTypes = {
        country: PropTypes.string,
        // pageSize : PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {

        super(props);
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Raftaar News`;
        console.log();
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews() {

        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=10`;
        this.props.setProgress(30);
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(80);
        // console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,

        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }
    handleOnClickNext = async () => {
        // console.log("previous click");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 10)) {

        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=10`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({ loading: false });
            console.log(parsedData);
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
            });
        }

    }

    handleOnClickPrev = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=10`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ loading: false });
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1
        });

    }//this is the value of the following manner.


    

    //fetching more data using fetchMoreData function from the infinite scroll functions.
    fetchMoreData = async () => {
        // this.setState({page : this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=10`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ loading: true });
        console.log(parsedData);

        this.setState({

            articles: this.state.articles.concat(parsedData.articles),
            // articles: parsedData.articles,
            page: this.state.page + 1,
            totalResults: parsedData.totalResults,
            loading: false,
        });

    }
    render() {

        return (
            <>
                <div className='container my-4'>
                    <h2 className='m-5' style={{ textAlign: "center", fontWeight: 900 }}>Raftaar News - Top Headlines - {this.props.category}</h2>
                    {this.state.loading && <Loading />}

                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Loading />}
                    >

                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((element) => {
                                    console.log(this.state.totalResults);
                                    return <div className="col-md col-sm-5 col-lg mx-3" key={element.url}>
                                        <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
                                    </div>
                                })}


                            </div>
                        </div>

                    </InfiniteScroll>


                </div>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleOnClickPrev}>&#8592; prev</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 10)} type="button" className="btn btn-dark" onClick={this.handleOnClickNext}>next &#8594;</button>
                </div> */}
            </>
        )
    }

}

export default News