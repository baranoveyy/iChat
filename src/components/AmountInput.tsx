import React, { ReactNode, Component } from 'react';
import {
  TextInput,
  Text,
  View,
  TextInputProps,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
  TextInputKeyPressEventData
} from 'react-native';
import styled from 'styled-components';

import { color, DEFAULT_WIDTH, DEFAULT_HEIGHT, LENGTHS } from '../common/constants';
import { isAndroid } from '../common/utils/platformUtil';
import {
  leadingZerosRegex,
  decimalWithDotAndCommaRegex,
  commaOrDotRegex,
  decimalRegex
} from '../common/regex';
import { WrapperProps } from './Wrapper';

const INITIAL_SELECTION = { start: 0, end: 0 };

const AmountContainer = styled(View)`
  ${(props) => ({
    'width': props.width || DEFAULT_WIDTH,
    'height': props.height || DEFAULT_HEIGHT,
    'flex': props.icon ? 0.8 : 1,
    'border-color': props.error ? color.scarlet : color.grey2
  })};
  
  background-color: ${color.white3}
  flex-direction: row;
  align-items: center;

  padding: 2px;

  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
`;

const AmountInputsWrapper = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AmountIconWrapper = styled(View)`
  max-width: 35px;
  height: ${DEFAULT_HEIGHT};
  padding: 2px 5px 2px 0;

  justify-content: center;
  align-items: center;
`;

// TODO: (baran) refactoring
const findNewChar = (a, b) => {
  let i = 0;
  let j = 0;
  let result = '';

  while (j < b.length) {
    if (a[i] !== b[j] || i === a.length) {
      result += b[j];
    } else {
      i++;
    }
    j++;
  }

  return result;
};

export interface AmountInputProps extends TextInputProps, WrapperProps {
  style?: ViewStyle;
  className?: string;
  message?: string;
  icon?: ReactNode;
  isClicked?: boolean;
  textAlignRight?: boolean;
  initialValue?: string;
  setValue?;
  isHideErrorMessage?: boolean;
  onSelectionChange?(
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData> | string,
  ): void;
  onKeyPress?(event: NativeSyntheticEvent<TextInputKeyPressEventData>): void;
  onChangeText?(text: string): void;
  maxLength?: number;
  currency?: string;
}

interface AmountInputState {
  cursorRight: { start: number; end: number };
  textLeft: string;
  textRight: string;
}

class AmountInput extends Component<AmountInputProps, AmountInputState> {
  constructor(props) {
    super(props);
    this.state = {
      cursorRight: {
        start: 0,
        end: 0
      },
      textLeft: '',
      textRight: ''
    };
    this.leftInput = React.createRef();
    this.rightInput = React.createRef();
  }

  static defaultProps = {
    editable: true
  };

  prevTextLeft = '';
  prevTextRight = '';
  leftInput;
  rightInput;
  placeholderLeftInput = '0';
  placeholderRightInput = '00';
  selectionChangedTime = 0;

  componentDidMount() {
    if (this.props.setValue && this.props.initialValue) {
      this.props.setValue(this.props.initialValue);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.initialValue &&
      this.props.initialValue &&
      this.props.setValue &&
      !this.props.value
    ) {
      this.props.setValue(this.props.initialValue);
    }

    this.prevTextLeft = this.state.textLeft;
    this.prevTextRight = this.state.textRight;
  }

  setPropValue = () => {
    if (this.props.setValue) {
      const value =
        !this.state.textLeft && !this.state.textRight
          ? undefined
          : `${this.state.textLeft},${this.state.textRight}`;
      this.props.setValue(value);
    }
  };

  onChangeLeft = (text) => {
    const newChar = findNewChar(this.state.textLeft || '', text);

    if (newChar === '.' || newChar === ',') {
      this.setState(
        {
          textLeft: text.replace(commaOrDotRegex, ''),
          cursorRight: INITIAL_SELECTION
        },
        () => {
          this.rightInput.current.focus();
        }
      );
    } else {
      this.setState(
        {
          textLeft: text
            .replace(decimalWithDotAndCommaRegex, '')
            .replace(leadingZerosRegex, '')
        },
        () => {
          this.setPropValue();
        }
      );
    }
  };

  keyPressRight = (event) => {
    if (event.nativeEvent.key === 'Backspace') {
      if (this.state.textRight.length === 0) {
        this.leftInput.current.focus();
      }
    }
  };

  onChangeRight = (text) => {
    this.setState(
      {
        textRight: text.replace(decimalRegex, '')
      },
      () => {
        this.setPropValue();
      }
    );
  };

  onFocusRight = (event) => {
    if (isAndroid) {
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    } else {
      this.setState({ cursorRight: INITIAL_SELECTION });
    }
  };

  onBlur = (event) => {
    this.setState(
      {
        cursorRight: INITIAL_SELECTION
      },
      () => {
        if (this.props.onBlur) {
          this.props.onBlur(event);
        }

        if (this.state.textRight.length === 1) {
          this.setState(
            {
              textRight: `${this.state.textRight}0`
            },
            () => {
              this.setPropValue();
            }
          );
        }
      }
    );
  };

  onChangeText = (callback) => (text) => callback(text);

  renderAmountInput = () => (
    <AmountInputsWrapper>
      <TextInput
        style={{
          flex: 0.95,
          textAlign: 'right'
        }}
        value={this.state.textLeft}
        maxLength={LENGTHS.AMOUNT_LEFT_INPUT}
        placeholder={this.placeholderLeftInput}
        placeholderTextColor={color.warmGrey}
        keyboardType={'numeric'}
        selection={
          /*this.props.status !== TEXT_INPUT_STATUS.ACTIVE
            ? undefined
            : */{
                start: this.state.textLeft.length || 0,
                end: this.state.textLeft.length || 0
              }
        }
        onChangeText={this.onChangeText(this.onChangeLeft)}
        onFocus={this.props.onFocus}
        onBlur={this.onBlur}
        ref={this.leftInput}
        returnKeyType={this.props.returnKeyType}
      />
      <Text>,</Text>
      <TextInput
        style={{
          flex: 0.08,
          textAlign: 'left'
        }}
        value={this.state.textRight}
        maxLength={LENGTHS.AMOUNT_RIGHT_INPUT}
        placeholder={this.placeholderRightInput}
        placeholderTextColor={color.warmGrey}
        keyboardType={'numeric'}
        onKeyPress={this.keyPressRight}
        onChangeText={this.onChangeText(this.onChangeRight)}
        onFocus={this.onFocusRight}
        onBlur={this.onBlur}
        ref={this.rightInput}
        returnKeyType={this.props.returnKeyType}
      />
    </AmountInputsWrapper>
  );

  render() {
    const { placeholder, icon, width, height, error, currency } = this.props;

    if (placeholder && placeholder.includes(',')) {
      [
        this.placeholderLeftInput,
        this.placeholderRightInput
      ] = placeholder.split(',');
    }

    return (
      <AmountContainer {...{icon, width, height, error}}>
        {this.renderAmountInput()}
        {currency && <AmountIconWrapper><Text>{currency}</Text></AmountIconWrapper>}
      </AmountContainer>
    );
  }
}

export default AmountInput;
