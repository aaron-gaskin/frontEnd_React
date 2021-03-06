/*  Name: Aaron Gaaskin
    Date: 5/21/19
    Purpose: Using the 'iTunes Search API', show the albums of a desired artist
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';


//Search component
//Searches through albums in the iTunes store for matching artists the user searches for
//Search bar url: https://stackoverflow.com/questions/51134564/how-to-show-information-from-api-when-using-search-box-in-reactjs
class Search extends React.Component {
    token = null;   //value to verify the use of the latest result
    state = {
        query: '',
        hits: [],
    };

    //if the input in the search bar changes, update the outputted data
    onChange = data => {
        const { value } = data.target;
        this.setState({
            query: value,
        });
        this.newSearch(value);
    };
    
    //search through the iTunes API, grab all hits, then convert to JSON
    newSearch = query => {
        const url = `https://itunes.apple.com/search?entity=album&term=${query}`;
        const token = {};
        this.token = token;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if(this.token === token) {
                    this.setState({ hits: data.results });
                }
            });
    };

    //initial search through API
    componentDidMount() {
        this.newSearch('Marshmello');
    }

    //output data in html format
    render () {
        return (
            <div className='App'>
                {/* Search bar code */}
                <input
                    type='text'
                    className='search_bar'
                    placeholder='Search...'
                    onChange={this.onChange}
                    ng-model='query'
                />
                {/* Take the search results and display them */}
                <div className='results'>
                    {this.state.hits.map(hit => (
                        <div key={hit.trackID}>  {/* Change to div, assign classnames for CSS styling */}
                            <a className='data' href={hit.collectionViewUrl} target='_blank' rel='noopener noreferrer'>
                                <img src={hit.artworkUrl100.replace('100x100','200x200')} alt={hit.collectionName}/>
                                <div className='data_text'>
                                    <span className='artist_name'>{hit.artistName}</span>
                                    <span className='album_name'>{hit.collectionName}</span>
                                    <span className='year'>{hit.releaseDate.substring(0,4)}</span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                {/* <div className='App Component'>
                    <App value={this.state.hits}/>
                </div> */}
            </div>
        )
    }
}

export default Search

ReactDOM.render(<Search />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
