import React, {Component} from 'react'
import youtube from '../api/Youtube'; 

const WrapperComponent = OriginalComponent => {
    class NewComponent extends Component {

        getVideo = async (videoId) => {
            try {
                  const response = await youtube.get('list', {
                    params: {
                      part: 'snippet',
                      id: videoId,
                      key: 'AIzaSyB4R8zkjTG79Wc_s2pnJlqzZrwb-IbHIVI',
                    }
                })
                  
                return response
                    
              } catch (err) {
                  console.log(err)
              }
              
            }
        
        refacturePlaylist = async (playlist, changedEpisodes) => {
            let newPlaylist = playlist;
            if (changedEpisodes === null) return newPlaylist;
            if (changedEpisodes.insertedEpisodes.length > 0) {
                for (let item of changedEpisodes.insertedEpisodes) {
                    const video = await this.getVideo(item.videoId)
                    if (item.index === 0) {
                        newPlaylist.shift()
                        newPlaylist.unshift(video)
                    } else if (item.index === newPlaylist.length-1) {
                        newPlaylist.pop()
                        newPlaylist.push(video)
                    } else {
                        let partOne = newPlaylist.slice(0, item.index);
                        partOne.push(video);
                        let partTwo = newPlaylist.slice(item.index, newPlaylist.length);
                        newPlaylist = partOne.concat(partTwo);
                    }
                }
            }
            if (changedEpisodes.switchedEpisodes.length > 0) {
                for (let item of changedEpisodes.switchedEpisodes) {
                    [newPlaylist[item.index1], newPlaylist[item.index2]] = [newPlaylist[item.index2], newPlaylist[item.index1]];
                }
            }
            if (changedEpisodes.removedEpisodes.length > 0) {
                for (let item of changedEpisodes.removedEpisodes) {
                    if (item.index === 0) {
                        newPlaylist.shift()
                    } else if (item.index === newPlaylist.length-1) {
                        newPlaylist.pop()
                    } else {
                        let partOne = newPlaylist.slice(0, item.index);
                        let partTwo = newPlaylist.slice(item.index, newPlaylist.length);
                        partTwo.shift();
                        newPlaylist = partOne.concat(partTwo);
                    }
                }
            }
            return newPlaylist
        }
        render() {
            return <OriginalComponent />
        }
    }
    return NewComponent
}

export default WrapperComponent
