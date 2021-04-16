import React from 'react';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';


import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {

    state = {
        movies: [],
        searchQuery: ""
    }

    componentDidMount() {
        this.getMovies();
    }

    async getMovies() {
        const response = await axios.get("http://localhost:3002/movies");
        this.setState({ movies: response.data })
    }
   
    // SEARCH MOVIE
    searchMovie = (event) => {
        this.setState({ searchQuery: event.target.value })
    }  
       

    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        ).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
        });

        return (
            <Router>

                <div className="container">

                    <Switch>


                        <Route path="/" exact render={() => (
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <SearchBar searchMovieProp={this.searchMovie} />
                                    </div>
                                </div>


                                <MovieList
                                    movies={filteredMovies}
                                   

                                />
                            </React.Fragment>
                        )}>

                        </Route>

                       

                       

                    </Switch>
                </div>

            </Router>
        )

    }


}

export default App;