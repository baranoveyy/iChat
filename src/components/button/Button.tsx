import React, { Component } from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

import TranslatedTextContainer from '../translated-text/TranslatedTextContainer';

import { BUTTON_TYPES, BUTTON_DELAY_TIME } from '../../common/constants';
import { color } from '../../common/constants';

const StyledLinearGradient = styled(LinearGradient)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;

  height: 44px;

  justify-content: center;
  border-radius: 22px;

  shadow-opacity: 0.25;
  shadow-radius: 15px;
  shadow-offset: 5px 5px;
  shadow-color: ${color.oceanBlue};
`;

const StyledButton = styled<{
  buttonType?: string;
  justifyButtonText?: string;
  width?: number;
}>(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;

  height: 44px;

  ${(props) =>
    props.buttonType === BUTTON_TYPES.FORM
      ? `
        border: 1px solid ${color.grey2};
        padding: 10px;
        justify-content: space-between;
        border-radius: 5px;
      `
      : `
        justify-content: ${props.justifyButtonText || 'center'};
        border-radius: 22px;

        shadow-opacity: 0.25;
        shadow-radius: 15px;
        shadow-offset: 5px 5px;

        ${
          props.buttonType !== BUTTON_TYPES.SUCCESS
            ? `
          shadow-color: ${color.oceanBlue};
        `
            : `
          shadow-color: ${color.white3};
        `
        }
      `}

  ${(props) => {
    const buttonStyle = {
      backgroundColor: '',
      border: '',
      width: props.width || '100%',
      minWidth: '',
      padding: '',
      borderBottomWidth: '',
      borderColor: ''
    };

    switch (props.buttonType) {
      case BUTTON_TYPES.SECONDARY:
        buttonStyle['background-color'] = color.darkGrey;

        break;

      case BUTTON_TYPES.ACTION:
        buttonStyle['background-color'] = 'transparent';
        buttonStyle.borderBottomWidth = '1px';
        buttonStyle.borderColor = color.grey3;
        break;

      case BUTTON_TYPES.OUTLINE:
        buttonStyle['background-color'] = 'transparent';
        buttonStyle.border = `1px solid ${
          props.disabled ? color.warmGrey : color.oceanBlue
        }`;

        break;

      case BUTTON_TYPES.LINEAR_GRADIENT:
        buttonStyle['background-color'] = 'transparent';
        break;

      case BUTTON_TYPES.TEXT:
        buttonStyle['background-color'] = 'transparent';
        buttonStyle.width = 'auto';
        buttonStyle.padding = '0 15px';
        break;

      case BUTTON_TYPES.FORM:
        buttonStyle['background-color'] = color.white3;
        // buttonStyle['min-width'] = props.width || '260px';
        break;

      case BUTTON_TYPES.SOCIAL:
        buttonStyle['background-color'] = 'transparent';
        buttonStyle.borderBottomWidth = '1px';
        buttonStyle.borderColor = color.grey3;
        break;

      default:
      case BUTTON_TYPES.PRIMARY:
        buttonStyle['background-color'] = color.oceanBlue;
        break;
      case BUTTON_TYPES.TERTIARY:
        buttonStyle['background-color'] = color.white3;

        break;
      case BUTTON_TYPES.SUCCESS:
        buttonStyle['background-color'] = color.white;

        break;
    }

    return buttonStyle;
  }};
`;

interface StyledIconProps {
  iconWidth?: string;
  iconHeight?: string;
  iconPosition?: string;
  secondIconPosition?: string;
  iconTransform?: boolean;
}

const StyledIcon = styled<StyledIconProps>(Image)`
  width: ${(props) => `${props.iconWidth}px`};
  height: ${(props) => `${props.iconHeight}px`};
  ${(props) =>
    props.secondIconPosition
      ? `margin-right: ${props.secondIconPosition}px`
      : 'margin-right:0px'};
  ${(props) =>
    props.iconPosition === 'left' ? 'margin-right: 5px' : 'margin-left: 5px'};
  ${(props) => (props.iconTransform ? 'transform: rotate(180deg)' : '')};
`;

const StyledTag = styled<{
  backgroundColor?: string;
  textColor?: string;
}>(TranslatedTextContainer)`
  ${(props) =>
    props.backgroundColor
      ? `background-color: ${props.backgroundColor}`
      : `background-color:${color.white}`}
  width: 40px;
  height: 19px;
  margin-right: 20px;
  border-radius: 5px;
  padding-left: 5px;
  ${(props) =>
    props.textColor ? `color: ${props.textColor}` : `color:${color.white}`};
`;

const StyledText = styled<{
  buttonType?: string;
  editable?: boolean;
  disabled?: boolean;
  styledTextFlexValue?: boolean;
  isActive?: boolean;
  disableWordWrap?: boolean;
  textColor?: string;
}>(TranslatedTextContainer)`
  ${(props) => (props.styledTextFlexValue ? `flex: 1` : ``)};
  ${(props) =>
    props.buttonType === BUTTON_TYPES.FORM
      ? 'font-size: 13px'
      : props.buttonType === BUTTON_TYPES.TEXT
      ? 'font-size: 13px'
      : 'font-size: 15px'}

  color: ${(props) => {
    let textColor;

    switch (props.buttonType) {
      case BUTTON_TYPES.OUTLINE:
        textColor = props.disabled ? color.warmGrey : color.oceanBlue;
        break;
      case BUTTON_TYPES.TEXT:
        if (props.isActive) {
          textColor = color.oceanBlue;
        } else {
          if (props.isActive === false) {
            textColor = color.black;
          } else {
            textColor = color.oceanBlue;
          }
        }
        break;
      case BUTTON_TYPES.SOCIAL:
        textColor = color.oceanBlue;
        break;
      case BUTTON_TYPES.ACTION:
        textColor = color.darkGrey;
        break;
      case BUTTON_TYPES.FORM:
        textColor = props.editable === false ? color.warmGrey : color.darkGrey;
        break;
      case BUTTON_TYPES.TERTIARY:
        textColor = color.menuGrey;
        break;

      default:
      case BUTTON_TYPES.PRIMARY:
      case BUTTON_TYPES.SECONDARY:
      case BUTTON_TYPES.SUCCESS:
        textColor = color.white3;
        break;
    }

    if (props.textColor) {
      textColor = props.textColor;
    }

    return textColor;
  }};
`;

export interface ButtonProps {
  onPress?(event): void;
  testID?: string;
  label: string;
  buttonType?: string;
  iconSource?: ImageSourcePropType;
  iconTransform?: boolean;
  iconPosition?: string;
  iconWidth?: string;
  iconHeight?: string;
  secondIconSource?: ImageSourcePropType;
  secondIconTransform?: boolean;
  secondIconPosition?: string;
  secondIconWidth?: string;
  secondIconHeight?: string;
  editable?: boolean;
  justifyButtonText?: string;
  isDisabled?: boolean;
  removeDelayOnPress?: boolean;
  isActive?: boolean;
  styledTextFlexValue?: boolean;
  backgroundColor?: string;
  textColor?: string;
  secondLabel?: string;
  disableWordWrap?: boolean;
  isSmall?: boolean;
  delayTime?: number;
  width?: string;
}

export interface ButtonState {
  isButtonDisabled: boolean;
}

class Button extends Component<ButtonProps, ButtonState> {
  state = {
    isButtonDisabled: false
  };

  delayedOnPress = (event) => {
    this.setState({ isButtonDisabled: true });

    if (this.props.onPress) {
      this.props.onPress(event);
    }

    setTimeout(
      () => this.setState({ isButtonDisabled: false }),
      this.props.delayTime ? this.props.delayTime : BUTTON_DELAY_TIME
    );
  };

  render() {
    const {
      justifyButtonText,
      editable,
      isDisabled,
      buttonType,
      label,
      iconSource,
      iconTransform,
      iconPosition,
      iconHeight,
      iconWidth,
      secondIconSource,
      secondIconTransform,
      secondIconPosition,
      secondIconHeight,
      secondIconWidth,
      onPress,
      removeDelayOnPress,
      isActive,
      styledTextFlexValue,
      backgroundColor,
      textColor,
      secondLabel,
      disableWordWrap
    } = this.props;

    const button = (
      <StyledButton
        {...this.props}
        activeOpacity={0.7}
        justifyButtonText={justifyButtonText}
        disabled={
          this.state.isButtonDisabled || isDisabled || editable === false
        }
        onPress={removeDelayOnPress ? onPress : this.delayedOnPress}>
        {secondIconSource && (
          <StyledIcon
            source={secondIconSource}
            iconTransform={secondIconTransform}
            secondIconPosition={secondIconPosition}
            iconHeight={secondIconHeight}
            iconWidth={secondIconWidth}
          />
        )}
        <StyledText
          buttonType={buttonType}
          label={label}
          editable={!editable}
          disabled={isDisabled}
          isActive={isActive}
          styledTextFlexValue={styledTextFlexValue}
          disableWordWrap={disableWordWrap}
          textColor={textColor}
        />
        {backgroundColor && textColor && (
          <StyledTag
            label={secondLabel}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
        )}
        {iconSource && (
          <StyledIcon
            source={iconSource}
            iconTransform={iconTransform}
            iconPosition={iconPosition}
            iconHeight={iconHeight}
            iconWidth={iconWidth}
          />
        )}
      </StyledButton>
    );

    return buttonType === BUTTON_TYPES.LINEAR_GRADIENT ? (
      <StyledLinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1.0, y: 1.0 }}
        colors={[color.pink, color.orange]}>
        {button}
      </StyledLinearGradient>
    ) : (
      button
    );
  }
}

export default Button;
