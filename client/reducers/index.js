import { combineReducers } from 'redux'

import home from './home'
import play from './play'
import final from './final'
import uploads from './uploads'
import results from './results'

export default combineReducers({
  home: home,
  play: play,
  final: final,
  uploads: uploads,
  results: results,
})
