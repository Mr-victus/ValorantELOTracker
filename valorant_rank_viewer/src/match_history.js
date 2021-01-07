
import React from 'react'
import './App.css';

class MatchHistory extends React.Component {
   
    render() {
        const {
            currentrank = 'Silver 1',
            currentRP = '',
            currentELO = '',
            matches = []

        } = this.props
        return (
          <div className="App">
            <header className="App-header">

                <div>
                    <span>Current Rank : {currentrank} | </span>
                    <span>{currentRP} RP | </span>
                    <span>{currentELO} ELO</span>
                </div>
              
            </header>
          </div>
        );
      
    }
}
MatchHistory.defaultProps = {
    currentrank : 'Iron 1',
    currentRP : '',
    currentELO : '',
    matches : []
}
export default MatchHistory;