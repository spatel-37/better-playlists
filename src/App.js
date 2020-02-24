import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#000'
};
let fakeServerData = {
  user: {
    name: 'Sanjay',
    playlists: [
      {
        name: 'My favourites',
        songs: [
          { name: 'Juicy', duration: 1233 },
          { name: 'Drop it Like its Hot', duration: 34234 },
          { name: 'One More Chance', duration: 23423 }
        ]
      },
      {
        name: 'Gym Music',
        songs: [
          { name: 'Put your back into it', duration: 1233 },
          { name: 'Bille Jean', duration: 34234 },
          { name: 'Candy on the dancefloor', duration: 23423 }]
      },
      {
        name: 'Chill Out',
        songs: [
          { name: 'Halcyon on and on', duration: 1233 },
          { name: 'Barbers Adagio for strings', duration: 34234 },
          { name: 'Seven Colours', duration: 23423 }]
      },
      {
        name: 'House',
        songs: [
          { name: 'Work', duration: 1233 },
          { name: '24', duration: 34234 },
          { name: 'For an Angel', duration: 23423 }]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: "40%", display: 'inline-block' }}>
        <h2>{this.props.playlists && this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{ ...defaultStyle, width: "40%", display: 'inline-block' }}>
        <h2>{Math.round(totalDuration / 60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img />
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)}/>

      </div>

    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{ ...defaultStyle, display: 'inline-block', width: '20%' }}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => 
            <li>{song.name}</li>
          )}
        </ul>

      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { 
      serverData: {},
      filterString: ''
    }

  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <h1 style={{ ...defaultStyle, 'font-size': '54px' }}>
              {this.state.serverData.user.name}'s Playlists
          </h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlists} />
            <HoursCounter playlists={this.state.serverData.user.playlists} />
            <Filter onTextChange={text => this.setState({filterString: text})}/>
            {this.state.serverData.user.playlists.filter(playlist =>
              playlist.name.toLowerCase().includes(
                this.state.filterString.toLowerCase())
            ).map(playlist =>
              <Playlist playlist={playlist} />
            )}
          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
