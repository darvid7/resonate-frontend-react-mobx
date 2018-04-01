import {observable} from 'mobx';

class AppState {
  @observable
  twitterFeed = [];
}
export default AppState;