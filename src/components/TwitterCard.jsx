import {Card, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import React from "react";

class TwitterCard extends React.Component {

  render() {
    return (
      <Card
        style={{ flex: 1, minWidth: '200px', position: 'relative', margin: '8px', zDepth: 1}}
      >
        <CardTitle
          title={this.props.title}
          subtitle={this.props.date}
          style={{padding: '8px'}}
          subtitleStyle={{fontSize: '12px'}}
          titleStyle={{fontSize: '14px', lineHeight: '20px'}}
        />
        <CardText
          style={{fontSize: '10px', padding: '8px'}}
        >
          {this.props.text}
          <div>
            {this.props.linkUrls.map((data, index) => {
              console.log(data);
              return (<a key={index} href={data}>{data}</a>);
            })}
          </div>
        </CardText>

        { this.props.imageUrl !== "" ?
          <CardMedia style={{padding: '8px', maxWidth: '400px', maxHeight: '400px'}}>
            <img src={this.props.imageUrl} alt=""/>
          </CardMedia> : <div></div>
        }
      </Card>
    )
  }
}



export default TwitterCard;
