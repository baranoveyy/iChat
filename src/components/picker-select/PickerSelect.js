import React from 'react';
import {View, Picker, StyleSheet} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import isEqual from 'lodash.isequal';

import {isAndroid} from '../../common/utils/platformUtil';

const PLACEHOLDER_INDEX = 0;

class PickerSelect extends RNPickerSelect {
  static getDerivedStateFromProps(nextProps, prevState) {
    // update selectedItem if value prop is defined and differs from currently selected item
    const newItems = RNPickerSelect.handlePlaceholder({
      placeholder: nextProps.placeholder
    }).concat(nextProps.items);

    // update items if items prop changes
    const itemsChanged = !isEqual(prevState.items, newItems);

    const {selectedItem, idx} = RNPickerSelect.getSelectedItem({
      items: newItems,
      key: nextProps.itemKey,
      value: nextProps.value
    });

    const selectedItemChanged =
      !isEqual(nextProps.value, undefined) &&
      !isEqual(prevState.selectedItem, selectedItem);

    if (itemsChanged || selectedItemChanged) {
      return {
        items: itemsChanged ? newItems : prevState.items
      };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    if (!this.props.value && prevProps.value) {
      this.onValueChange(this.props.value, PLACEHOLDER_INDEX);
    }
  }

  onValueChange(value, index) {
    if (isAndroid) {
      this.props.onValueChange(value, index);
    }

    this.setState({
      selectedItem: this.state.items[index]
    });
  }

  togglePicker(animate = false) {
    if (!isAndroid && this.state.showPicker) {
      const {selectedItem, idx} = RNPickerSelect.getSelectedItem({
        items: this.state.items,
        key: this.props.itemKey,
        value: this.state.selectedItem.value
      });

      this.props.onValueChange(selectedItem.value, idx);
      this.setState({
        selectedItem
      });
    }

    super.togglePicker(animate);
  }

  renderAndroidHeadless() {
    const {disabled, style, pickerProps} = this.props;

    return (
      <View style={[{borderWidth: 0}, style.headlessAndroidContainer]}>
        {this.renderTextInputOrChildren()}
        <Picker
          style={defaultStyles.headlessAndroidPicker}
          testID="RNPickerSelectAndroidHeadless"
          enabled={!disabled}
          onValueChange={this.onValueChange}
          selectedValue={this.state.selectedItem.value}
          {...pickerProps}>
          {this.renderPickerItems()}
        </Picker>
      </View>
    );
  }
}

const defaultStyles = StyleSheet.create({
  headlessAndroidPicker: {
    position: 'absolute',
    top: 0,
    width: 1000,
    height: 44,
    color: 'transparent'
  }
});

export default PickerSelect;
