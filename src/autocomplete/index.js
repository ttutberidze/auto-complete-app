import React from 'react';
import {debounce} from "../utils";
import Loading from "../loading";
import classes from './index.module.css';
import Highlight from "../highlight";

class Autocomplete extends React.Component {

  state = {
    // The data that match the user's input
    filteredData: [],
    // Whether or not the suggestion list is shown
    showDropdown: false,
    // What the user has entered
    userInput: "",
    // Whether or not data is being fetched
    loading: false,
    // Error message if something is wrong with filter method
    errorMessage: ''
  }

  // Debounce filter method to optimize input change method
  debouncedFilter = debounce(async (userInput) => {
    // If input value is empty we clear suggestions list, loading state and error message and finish function
    if (!userInput) {
      this.setState({filteredData: [], loading: false, errorMessage: ''});
      return;
    }

    try {
      // Execute filter method from parent component with input value
      const filteredData = await this.props.filter(userInput);
      // Update state according to filter function response
      this.setState({filteredData, loading: false, errorMessage: ''});
    } catch (err) {
      // If something was wrong with filter function
      this.setState({errorMessage: err.message, loading: false, filteredData: []})
    }
  }, 500);


  // input change handler function
  userInputChangeHandler = (e) => {
    // Get current input value
    const userInput = e.target.value;
    // Call debounced filter method
    this.debouncedFilter(userInput);
    // Update state with new input value, loading state and show dropdown value
    this.setState({userInput, showDropdown: !!userInput, loading: true})
  }

  // Function will be executed once item from the dropdown will be chosen
  dropdownItemClickHandler = (item) => {
    const {onChange} = this.props;
    // Update input value with chosen item and hide dropdown
    this.setState({
      userInput: item.label,
      showDropdown: false
    })
    // Execute function, passed from parent component with current input value
    onChange && onChange(item);
  }

  renderContent = () => {
    const {filteredData, loading, userInput, errorMessage} = this.state;
    // Show loading component
    if (loading) {
      return <div className={classes.empty} id="loading" data-testid="loading"><Loading/></div>
    }
    // Show error component
    if(errorMessage) {
      return <div className={classes.empty} id="error" data-testid="error">{errorMessage}</div>
    }
    // Show empty state of dropdown
    if (filteredData.length === 0) {
      return <div className={classes.empty} data-testid="no-data">No Data</div>
    } else {
      // Show suggestions according to user input
      return (
        <ul data-testid="dropdown-list">
          {filteredData.map((item) => <li key={item.value} onClick={() => this.dropdownItemClickHandler(item)}>
            <Highlight text={userInput}>{item.label}</Highlight>
          </li>)}
        </ul>
      )
    }
  }

  render() {
    const {userInput, showDropdown} = this.state;

    return (
      <div className={classes.autocomplete}>
        <input
          data-testid="input"
          type={'text'}
          value={userInput}
          onChange={this.userInputChangeHandler}
          onFocus={() => this.setState({showDropdown: !!userInput})}
          placeholder={'Start typing to see suggestions'}/>
        {showDropdown && (
          <div className={classes.dropdown} data-testid="dropdown">
            {this.renderContent()}
          </div>
        )}
      </div>
    )
  }
}

export default Autocomplete;
