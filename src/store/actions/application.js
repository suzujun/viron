import { constants as mutations } from '../mutations';

export default {
  /**
   * 起動状態にします。
   * @return {Promise}
   */
  launch: context => {
    return Promise
      .resolve()
      .then(() => {
        context.commit(mutations.APPLICATION_LAUNCH, true);
      });
  },

  /**
   * 画面遷移状態にします。
   * @return {Promise}
   */
  startNavigation: context => {
    return Promise
      .resolve()
      .then(() => {
        context.commit(mutations.APPLICATION_NAVIGATION, true);
      });
  },

  /**
   * 画面遷移完了状態にします。
   * @return {Promise}
   */
  endNavigation: context => {
    return Promise
      .resolve()
      .then(() => {
        context.commit(mutations.APPLICATION_NAVIGATION, false);
      });
  }
};