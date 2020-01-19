import React, { Component } from 'react';
import { View, Text, FlatList,
     Image, TouchableWithoutFeedback } from 'react-native';
import { WebView } from 'react-native-webview';

class Video extends Component {

  state={listLoaded:false}
  
  componentDidMount(){
      return fetch(
        `https://www.googleapis.com/youtube/v3/search?&part=snippet&q=pluralsight&type=video&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
      )
      .then((res)=>res.json())
      .then((resJson)=>{
        this.setState({
                listLoaded:true,
                videoList:Array.from(resJson.items)
            })
      })
      .catch((error)=>{
          console.error(error)
      })
  }

  render() {
    return (
      <View>
        {this.state.listLoaded &&(
            <View>
                <FlatList
                data={this.state.videoList}
                renderItem={({item})=>
                <TubeItem
                    id={item.id.videoId}
                    title={item.snippet.title}
                    imageSrc={item.snippet.thumbnails.high.url} />
                } />
            </View>
        )}
        {!this.state.listLoaded && (
            <View>
                <Text>LOADING</Text>
            </View>
        )}
      </View>
    );
  }
}




export default Video;

export class TubeItem extends React.Component{
    onPress=()=>{
        // let tubeUrl = `https://www.youtube.com/embed/${this.props.id}`
        <WebView 
            style={{marginTop: 20}}
            javaScriptEnabled={true}
            source={{uri:`https://www.youtube.com/embed/${this.props.id}`}}
        />
    }
    render(){
        return(
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View>
                    <Image
                        style={{width:'100%', height:200}}
                        source={{uri:this.props.imageSrc}} />
                    <Text>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
