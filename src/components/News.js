import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: null,
            page: 1,
            nextSize: 0,
            loading: true,
            notWorking: false
        };
    }

    async fetchNews(apiKey) {
        const { category, pageSize } = this.props;
        const { page } = this.state;
        let url = `http://localhost:5000/news?category=${category}&page=${page}&pageSize=${pageSize}`;

        this.setState({ loading: true });

        try {
            let data = await fetch(url);
            let parseData = await data.json();
            if (parseData.status === 'ok') {
                this.setState({
                    nextSize: Math.ceil(parseData.totalResults / pageSize),
                    articles: parseData.articles,
                    loading: false,
                    notWorking: false
                });
                return true;
            } else {
                throw new Error('API call failed');
            }
        } catch (error) {
            this.setState({ loading: false });
            return false;
        }
    }

    async componentDidMount() {
        // Only need to call fetchNews once, proxy handles API keys
        if (!(await this.fetchNews())) {
            this.setState({ notWorking: true, loading: false });
        }
    }

    handlePrevClick = async () => {
        if (this.state.page > 1) {
            await this.setState(
                { page: this.state.page - 1, loading: true },
                async () => {
                    await this.fetchNews(this.state.api);
                    window.scrollTo(0, 0); // Scroll to top
                }
            );
        }
    }

    handleNextClick = async () => {
        if (this.state.page < this.state.nextSize) {
            await this.setState(
                { page: this.state.page + 1, loading: true },
                async () => {
                    await this.fetchNews(this.state.api);
                    window.scrollTo(0, 0); // Scroll to top
                }
            );
        }
    }

    render() {
        const { loading, articles, notWorking, page, nextSize } = this.state;
        const { heading="Top Headlines"} = this.props
        return (
            <>
                {loading && <Loading />}
                <div className='container my-3'>
                    {articles && <h2 className='text-center' id='heading'>NewsBaba - {heading}</h2>}
                    <div className="row">
                        {articles && articles.map((element) => (
                            <div key={element.title} className="col-md-4">
                                <NewsItem
                                    title={element.title}
                                    description={element.description}
                                    imgurl={element.urlToImage}
                                    url={element.url}
                                />
                            </div>
                        ))}
                        {notWorking && (
                            <>
                                <Loading />
                                <h1 className='text-center'>"We are Sorry!"</h1>
                            </>
                        )}
                        {articles && (
                            <div className="container d-flex justify-content-around">
                                <button
                                    disabled={page <= 1}
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={this.handlePrevClick}
                                >
                                    &larr; Previous
                                </button>
                                <button
                                    disabled={page >= nextSize}
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={this.handleNextClick}
                                >
                                    Next &rarr;
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default News;
 