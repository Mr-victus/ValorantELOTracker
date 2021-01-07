import logo from './logo.svg';
import React from 'react'
import './App.css';
import axios from 'axios'
import MatchHistory from './match_history'
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "BCVictus",
      password:"Ppd-7482",
      region : "ap",
      matches : null,
      urls:[{region:"NA",url:"https://pd.na.a.pvp.net/"},{region:"EU",url:"https://pd.eu.a.pvp.net/"},{region:"AP",url:"https://pd.ap.a.pvp.net/"},{region:"KO",url:"https://pd.ko.a.pvp.net/"}],
      urlSet:"https://pd.ap.a.pvp.net/",
      rankInfo : {
          0: "Unrated",
          1: "Unknown 1",
          2: "Unknown 2",
          3: "Iron 1",
          4: "Iron 2",
          5: "Iron 3",
          6: "Bronze 1",
          7: "Bronze 2",
          8: "Bronze 3",
          9: "Silver 1",
          10: "Silver 2",
          11: "Silver 3",
          12: "Gold 1",
          13: "Gold 2",
          14: "Gold 3",
          15: "Platinum 1",
          16: "Platinum 2",
          17: "Platinum 3",
          18: "Diamond 1",
          19: "Diamond 2",
          20: "Diamond 3",
          21: "Immortal 1",
          22: "Immortal 2",
          23: "Immortal 3",
          24: "Radiant"
      }
    };
  }
  login(){
    const BASE_URL = "https://auth.riotgames.com/api/v1/authorization";
    const axiosInstance = axios.create({ baseURL: BASE_URL });

    const createSession = async () => {
      console.log("create session");
      const authParams = {
        client_id: 'play-valorant-web-prod',
        nonce: '1',
        redirect_uri: 'https://beta.playvalorant.com/opt_in',
        response_type: 'token id_token',
    }
    axios.get('http://127.0.0.1:8000/login/?userName='+this.state.userName+'&password='+this.state.password+'&region='+this.state.region).then((response)=>{
      console.log(response.data.data.Matches)
      this.setState({
        matches: response.data.data.Matches
      })

    }).catch((error)=>{
      console.log(error)
    }) 
    };
    createSession()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">

          {this.state.matches === null ? <div>
          <label>
            UserID:
            <input type="text" name="name" value={this.state.userName} onChange={(event)=>{
              this.setState({userName:event.target.value})
            }} />
          </label>
          <br/>
          <label>
            password:
            <input type="password" name="password" value={this.state.password} onChange={(event)=>{
              this.setState({password:event.target.value})
            }} />
          </label>
          <br/>
          <label>
            Choose Region:
            <select value={this.state.region} onChange={(event)=>{

                this.setState({region:event.target.value})
            }}>
            <option value="na">North America</option>
            <option value="eu">Europe</option>
            <option value="ap">Asia Pacific	</option>
            <option value="ko">Korea</option>
          </select>
          </label>
         <input value="Submit" type={"button"} onClick={(event)=>{
           this.login()
         }}/>
       </div> : <MatchHistory currentrank={this.state.rankInfo[this.state.matches[0].TierAfterUpdate]}
             currentRP={this.state.matches[0].TierProgressAfterUpdate}
             currentELO={(this.state.matches[0].TierAfterUpdate * 100) - 300 + this.state.matches[0].TierProgressAfterUpdate }
             matches={this.state.matches}/>}
        </header>
      </div>
    );
  }
}

export default App;
