export const isReactNative = () => {
  try {
    // eslint-disable-next-line global-require
    require('react-native');
    return true;
  } catch (e) {
    return false;
  }
};
