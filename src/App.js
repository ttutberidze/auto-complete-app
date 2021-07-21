import React from 'react';
import classes from './app.module.css';
import Autocomplete from "./autocomplete";
import {getData} from "./api/mock.";
import AutocompleteHooks from "./autocomplete-hooks";
import {filter} from "./api/youtube-api";

class App extends React.Component {

  filterMock = (text) => {
    return getData(text).then(res => res.map(item => ({value: item.id, label: item.title})));
  }

  filterApi = (text) => {
    return filter(text);
  }

  getAutoCompleteValue = (value) => {
    console.log(value)
  }

  render() {
    return (
      <div className={classes.app}>
        <div className={classes.box}>
          <h3>Class Based Components</h3>
          <Autocomplete
            filter={this.filterMock}
            onChange={this.getAutoCompleteValue}/>
        </div>
        <div className={classes.box}>
          <h3>React Hooks</h3>
          <AutocompleteHooks
            filter={this.filterMock}
            onChange={this.getAutoCompleteValue}/>
        </div>
        <div className={classes.box}>
          <h3>Real API calls using Youtube API</h3>
          <AutocompleteHooks
            filter={this.filterApi}
            onChange={this.getAutoCompleteValue}/>
        </div>
      </div>
    );
  }
}

export default App;
