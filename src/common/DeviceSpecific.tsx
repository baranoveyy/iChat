import DeviceInfo from 'react-native-device-info';

export const hasNotch = DeviceInfo.hasNotch();

export const androidApiLevel = DeviceInfo.getApiLevel();

export const deviceVersion = DeviceInfo.getSystemVersion();
