import React from "react";
import TwitterCard from './TwitterCard';
import {observer} from 'mobx-react';

@observer
class TwitterCardCollection extends React.Component {

  parseForTwitterLinks(text) {
    let httpPattern = 'https://t\\S*';
    let matches = text.match(httpPattern);
    let truncateIndex = text.indexOf(matches[0]);
    text = text.slice(0, truncateIndex);
    return [text, matches];
  };

  render() {
    console.log("RENDERING");
    return (
        <div style={{
          display:"flex",
          justifyContent:"center",
          width:"100%",
          flexWrap:"wrap",
        }}>
        {this.props.feed.map((data, index) => {
          console.log('data');
          console.log(data);
          let text = data['text'];
          let result = this.parseForTwitterLinks(text);
          text = result[0];
          let urls = result[1];
          let userDetails = data['user'];
          let imageUrl = "";
          let entities = data['entities'];
          if (entities !== undefined) {
            let media = entities['media'];
            if (media !== undefined) {
              for (let i = 0; i < media.length; i++) {
                let mediaObject = media[i];
                let mediaUrl = mediaObject['media_url'];
                if (mediaUrl !== undefined && mediaUrl.endsWith('.jpg') || mediaUrl.endsWith('.png')) {
                  imageUrl = mediaUrl;
                  break;
                }
              }
            }
          }
          return(
              <TwitterCard
                  key={index}
                  title={userDetails['name'] + " (@" + userDetails['screen_name'] + ")"}
                  date={data['created_at']}
                  text={text}
                  imageUrl={imageUrl}
                  linkUrls={urls}
            />
          );
        })
        }
        </div>
    )
  }
}

export default TwitterCardCollection;
