import React, { Component } from 'react';
import { Footer, FooterTab, Button } from 'native-base';
import { Keyboard } from 'react-native';
import styled from 'styled-components';
import { MemoryHistory } from 'history';

import {color} from '../../common/constants';

import ToolbarItem from './ToolbarItem';
import withRouter from '../../routes/withRouter';
import paths from '../../routes/paths';

const FooterContainer = styled(Footer)`
  background-color: ${color.menuBlue};
  border-top-width: 1px;
  border-top-color: ${color.menuBorderline};

  padding-bottom: 0;
`;

const FooterTabContainer = styled(FooterTab)`
  background-color: transparent;
  height: 49px;

  & > ${Button} {
    background-color: ${color.black};
    border-right-width: 2px;
    border-right-style: solid;
    border-right-color: ${color.black};
  }
`;

interface ToolbarState {
  keyboardOpen: boolean;
}

class Toolbar extends Component<{ history: MemoryHistory}, ToolbarState> {
  keyboardDidShowListener;
  keyboardDidHideListener;

  state: ToolbarState = {
    keyboardOpen: false
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide(this));
  }

  componentWillUnmount() {
    if (this.keyboardDidShowListener) {
      this.keyboardDidShowListener.remove();
    }

    if (this.keyboardDidHideListener) {
      this.keyboardDidHideListener.remove();
    }
  }

  keyboardDidShow = (self) => () => {
    self.setState({ keyboardOpen: true });
  }

  keyboardDidHide = (self) => () => {
    self.setState({
        keyboardOpen: false
      }
    );
  }

  goToPath = (path) => () => {
    this.props.history.push(path, {isMenuPush: true});
  }

  renderToolbarItem = (label, onPress) => (
    <ToolbarItem
      label={label}
      active={false}
      onPress={onPress}
    />
  )

  render() {
    return !this.state.keyboardOpen && (
      <FooterContainer>
        <FooterTabContainer>
          {this.renderToolbarItem('Home', this.goToPath(paths.HOME))}
          {this.renderToolbarItem('Users', this.goToPath(paths.USERS))}
          {this.renderToolbarItem('Chats', this.goToPath(paths.CHATS))}
          {this.renderToolbarItem('Profile', this.goToPath(paths.PROFILE))}
        </FooterTabContainer>
      </FooterContainer>
    );
  }
}

export default withRouter(Toolbar);
