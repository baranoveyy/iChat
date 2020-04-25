import { connect } from 'react-redux';

import TranslatedText, { TranslatedTextProps } from './TranslatedText';

import { RootState } from '../../store/reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  language: state.common.language
});

export type TranslatedTextContainerProps = Partial<TranslatedTextProps>;

export default connect(mapStateToProps)(TranslatedText);
