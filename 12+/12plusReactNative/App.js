import React, {Component} from 'react';
import { View, StatusBar } from 'react-native'
import { Container, Header, Body, Title } from 'native-base';
import { AppFontLoader } from './src/utils/FontLoader';

export default class App extends Component {
  render() {
    return (
      <AppFontLoader>
        <Container>
        <StatusBar hidden={true}/>
          <Header>
            <Body>
              <Title>
                12+
              </Title>
            </Body>
          </Header>
        </Container>
      </AppFontLoader>
    );
  }
}