import React from 'react';
import { AppLoading, Font } from 'expo';
class AppFontLoader extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentWillMount() {
    try {
      await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({ fontLoaded: true });
    } 
    catch (error) {
      console.log('error loading icon fonts', error);
    }
  }




  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return this.props.children;
  }
}




export { AppFontLoader };