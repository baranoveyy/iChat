import React from 'react';
import { Footer, FooterTab } from 'native-base';
import { Keyboard } from 'react-native';
import styled from 'styled-components';
import { MemoryHistory } from 'history';

import {color} from '../../common/constants';
import { hasNotch } from '../../common/DeviceSpecific';
import withRouter from '../../routes/withRouter';

import ToolbarItem from './ToolbarItem';

import IconProducts from '../../assets/icons/iconsProductsBlack.png';
import IconProductsActive from '../../assets/icons/iconsProductsBlue.png';

interface ToolbarProps {
  history: MemoryHistory;
  selectedIndex: number;
  prevSelectedIndex: number;
  toolbarChangeSelectedIndex(index: number): void;
  toolbarChangePrevSelectedIndex(index: number): void;
  isAtHome?: boolean;
}

interface ToolbarState {
  isProcessMenuOpen: boolean;
  isMenuItemSelected: boolean;
  keyboardOpen: boolean;
}

const FooterContainer = styled(Footer)`
  background-color: ${color.menuBlue};
  border-top-width: 1;
  border-top-color: ${color.menuBorderline};

  padding-bottom: ${hasNotch ? '75px' : 0};
`;

const FooterTabContainer = styled(FooterTab)`
  background-color: transparent;
  height: 49px;
`;

class Toolbar extends React.Component<ToolbarProps, ToolbarState> {
  keyboardDidShowListener;
  keyboardDidHideListener;

  state: ToolbarState = {
    isProcessMenuOpen: false,
    isMenuItemSelected: false,
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

  componentDidUpdate(prevProps: ToolbarProps) {
    if (this.props.prevSelectedIndex && prevProps.prevSelectedIndex
      && this.props.selectedIndex === this.props.prevSelectedIndex &&
      this.state.isMenuItemSelected) {
      this.setState({ isMenuItemSelected: false });
    }
  }

  onRequestClose = () => {
    this.setState({ isProcessMenuOpen: false });
    this.props.toolbarChangePrevSelectedIndex(this.props.selectedIndex);
    this.props.toolbarChangeSelectedIndex(this.props.prevSelectedIndex);
  }

  handleMenuSelect = (path: string, index: number) => {
    this.props.history.push(path, {isMenuPush: true});
    this.props.toolbarChangePrevSelectedIndex(this.props.selectedIndex);
    this.props.toolbarChangeSelectedIndex(index);
  }

  renderToolbarItem = (label) => (
    <ToolbarItem
      label={label}
      icon={IconProducts}
      activeIcon={IconProductsActive}
      active={false}
    />
  )

  render() {
    return !this.state.keyboardOpen && (
      <FooterContainer>
        <FooterTabContainer>
          {this.renderToolbarItem('Home')}
          {this.renderToolbarItem('Profile')}
          {this.renderToolbarItem('Messages')}
          {this.renderToolbarItem('asdasd')}
        </FooterTabContainer>
      </FooterContainer>
    );
  }
}

export default withRouter(Toolbar);
