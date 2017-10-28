import React from 'react';
import './SearchBar.css';

const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count',
}



class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {term: '',location: '',sortBy: 'best_match'};
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    }
  }

  handleSortByChange(sortByOption) {
    this.setState({sortBy:sortByOption})
  }

  handleTermChange(event) {
    this.setState({term: event.target.value})
  }

  handleLocationChange(event){
    this.setState({location: event.target.value})
  }

  handleSearch(event){
    this.props.searchYelp(this.state.term,this.state.location,this.state.sortBy);
    event.preventDefault();
  }

  //Returns a list with Best Match, Highest Rated and Most Reviewed
  renderSortByOptions() {
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];
      //Checks the selected option and changes its class to .active so it triggers the css
      //OnClick changes changes the state of SortBy so it renders with a new .active class
      return <li onClick={this.handleSortByChange.bind(this,sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>
  });

  }


  render() {
    return (
      <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>
          {this.renderSortByOptions()}
        </ul>
      </div>
      <div className="SearchBar-fields">
      <input onChange={this.handleTermChange} placeholder="Search Businesses" />
      <input onChange={this.handleLocationChange} placeholder="Where?" />
      </div>
      <div onClick={this.handleSearch} className="SearchBar-submit">
      <a>Lets Go</a>
      </div>
      </div>
    )
  }
}


export default SearchBar;
