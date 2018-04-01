import React from "react";
import ReactDOM from 'react-dom';
import AppState from './AppState';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TwitterCardCollection from './components/TwitterCardCollection';
import axios from 'axios';

let state = new AppState();
state.twitterFeed = [];

const badThingsHappened = {
  "user": {
    "name": "something bad",
    "screen_name": "not_twitter"
  },
  "text": "Error: No data was returned, will poll again soon!",
  "entities": {
    "media": [
      {
        "media_url": "https://st2.depositphotos.com/2172759/9922/v/950/depositphotos_99228696-stock-illustration-cute-cartoon-sad-face-isolated.jpg"
      }
    ]
  }
};

let getData = function() {
  axios.get('https://resonate-backend.herokuapp.com/twitter').then(response => {
  // axios.get('http://localhost:3000/twitter/').then(response => {

  let data = response["data"];
    console.log('axios call');
    console.log(data);

    if (data.length === 0) {
      // No data was returned.
      data.push(badThingsHappened); // Push default error card.
    }
    // Mobx will re-render when mutating @ovservable.
    // Check if arrays have same data to prevent this, ideally this should be done server side with server based events.
    console.log('data len: ' + data.length);
    console.log('twitterFeed len: ' + state.twitterFeed.length);
    if (data.length === state.twitterFeed.length) {
      let same = true;
      console.log('comparing');
      for(let i = 0; i < data.length; i++) {
        console.log('index: ' + i);
        let comparisonData = JSON.stringify(data[i], Object.keys(data[i]).sort());
        let comparisonState = JSON.stringify(state.twitterFeed[i], Object.keys(state.twitterFeed[i]).sort());
        if (comparisonData !== comparisonState) {
          console.log("NOT SAME");
          same = false;
          break;
        }
      }
      if (same) {
        console.log("Arrays have the same info.");
        return;
      }
    }

    // Clear the array without change reference so mobx can still do it's magic.
    state.twitterFeed.length = 0;
    for(let i = 0; i < data.length; i++) {
      state.twitterFeed.push(data[i]);
    }
    // Note: Can't do state.twitterFeed = data; won't trigger mobx renders.
  })
};
getData();

// Poll every 15 seconds.
setInterval(getData, 15000);

const App = () => (
    <div
      style={{
        background: '#E1F5FE',

      }}
    >
      <AppBar
        style={{
          width: "100%",
          backgroundColor: '#03A9F4',
        }}
        titleStyle={{
          textAlign: 'center'
        }}
        title={'Twitter Feed'}
        showMenuIconButton={false}
        zDepth={2}
      />
      <div
        style={{
          padding: '16px',
        }}>
        <TwitterCardCollection feed={state.twitterFeed}/>
      </div>
    </div>
);

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);