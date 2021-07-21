import classes from "./index.module.css";
import React, {useState, useEffect} from 'react';
import {useDebounce} from "../hooks/useDebounce";
import Loading from "../loading";
import Highlight from "../highlight";

const AutocompleteHooks = ({filter, onChange}) => {
  // What the user has entered
  const [userInput, setUserInput] = useState('');
  // The data that match the user's input
  const [filteredData, setFilteredData] = useState([]);
  // Whether or not data is being fetched
  const [loading, setLoading] = useState(false);
  // Error message if something is wrong with filter method
  const [errorMessage, setErrorMessage] = useState('');
  // Whether or not the suggestion list is shown
  const [showDropdown, setShowDropdown] = useState(false);
  // Get debounced value from custom hook
  const debouncedUserInput = useDebounce(userInput, 500);

  useEffect(() => {
    // If debounced value from input is truthy
    if (debouncedUserInput) {
      // Execute filter function from parent component
      filter(debouncedUserInput)
        .then(filteredData => {
          setFilteredData(filteredData);
          setErrorMessage('')
        })
        .catch(err => {
          setFilteredData([]);
          setErrorMessage(err.message)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setFilteredData([]);
      setErrorMessage('');
      setLoading(false);
    }
  }, [debouncedUserInput, filter]);

  // input change handler function
  const userInputChangeHandler = (e) => {
    // Get current input value
    const userInput = e.target.value;
    // Update state with new input value, loading state and show dropdown value
    setUserInput(userInput);
    setShowDropdown(!!userInput);
    setLoading(true)
  }

  // Function will be executed once item from the dropdown will be chosen
  const dropdownItemClickHandler = (item) => {
    // Update input value with chosen item and hide dropdown

    setUserInput(item.label);
    setShowDropdown(false);
    // Execute function, passed from parent component with current input value
    onChange && onChange(item);
  }

  const renderContent = () => {
    // Show loading component
    if (loading) {
      return <div className={classes.empty} id="loading" data-testid="loading"><Loading/></div>
    }
    // Show error component
    if (errorMessage) {
      return <div className={classes.empty} id="error" data-testid="error">{errorMessage}</div>
    }
    // Show empty state of dropdown
    if (filteredData.length === 0) {
      return <div className={classes.empty} data-testid="no-data">No Data</div>
    } else {
      // Show suggestions according to user input
      return (
        <ul data-testid="dropdown-list">
          {filteredData.map((item) => <li key={item.value} onClick={() => dropdownItemClickHandler(item)}>
            <Highlight text={userInput}>{item.label}</Highlight>
          </li>)}
        </ul>
      )
    }
  }

  return (
    <div className={classes.autocomplete}>
      <input
        data-testid="input"
        type={'text'}
        value={userInput}
        onChange={userInputChangeHandler}
        onFocus={() => setShowDropdown(!!userInput)}
        placeholder={'Start typing to see suggestions'}/>
      {showDropdown && (
        <div className={classes.dropdown} data-testid="dropdown">
          {renderContent()}
        </div>
      )}
    </div>
  )
}

export default AutocompleteHooks;
