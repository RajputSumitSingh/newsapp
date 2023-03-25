import React, { useState,useEffect } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props)=> {
    // const count = 0;

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);



    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=10`; 
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }

    

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - Raftaar News`;
        updateNews();
        // eslint-disable-next-line
    }, [])
    
    const handleOnClickNext = async () => {
        setPage(page+1);
        updateNews();

    }

    const handleOnClickPrev = async () => {
        setPage(page-1);
        updateNews();

    }//this is the value of the following manner.


    

    //fetching more data using fetchMoreData function from the infinite scroll functions.
    const fetchMoreData = async () => {   
        setPage(page+1) ;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=10`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        // setPage(page+1) ;
        setTotalResults(parsedData.totalResults);
        setLoading(false);
      };

        return (
            <>
                <div className='container my-4'>
                    <br />
                    <h2 className='my-5' style={{ textAlign: "center", fontWeight: 900 }}>Raftaar News - Top Headlines - {props.category}</h2>
                    {loading && <Loading />}

                    <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Loading/>}
                > 

                        <div className="container">
                            <div className="row">
                                {articles.map((element) => {
                                    // console.log(totalResults);
                                    return <div className="col-md-3" key={element.url}>
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

News.defaultProps = {
    country: 'us',
    pageSize: 10,
    category: 'business',
}

News.propTypes = {
    country: PropTypes.string,
    // pageSize : PropTypes.number,
    category: PropTypes.string,
}

export default News