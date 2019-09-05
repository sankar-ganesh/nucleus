import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import layout from '../../templates/components/nucleus-modal/dialog';

/**
  Dialog Usage:
  @class Dialog
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  classNames: ['nucleus-modal'],
  attributeBindings: ['tabindex', 'aria-labelledby'],
  ariaRole: 'dialog',
  "aria-labelledby": readOnly('titleId'),

  /**
  * tabindex
  *
  * @field tabindex
  * @type string
  * @private
  */
  tabindex: '-1',

  /**
  * keyboard
  *
  * @field keyboard
  * @type boolean
  * @public
  */
  keyboard: true,

  /**
  * size
  *
  * @field size
  * @type null
  * @public
  */
  size: null,

  /**
  * sizeClass
  *
  * @field sizeClass
  * @type function
  * @private
  */
  sizeClass: computed('size', function () {
    let size = get(this, 'size');
    return isBlank(size) ? null : `nucleus-modal__dialog--${size}`;
  }).readOnly(),

  /**
   * The id of the `.modal-title` element
   *
   * @field titleId
   * @type string
   * @default null
   * @private
   */
  titleId: null,

  /**
   * Gets or sets the id of the title element for aria accessibility tags
   *
   * @method getSetTitleID
   * @private
   */
  getOrSetTitleId() {
    const modalNode = this.get('element');
    let nodeId = null;

    if (modalNode) {
      const titleNode = modalNode.querySelector('.nucleus-modal__title');
      if (titleNode) {
        nodeId = titleNode.id
        if (!nodeId) {
          nodeId = `${this.get('id')}-title`;
          titleNode.id = nodeId;
        }
      }
    }
    set(this, 'titleId', nodeId);
  },

  /**
  * keyDown
  *
  * @method keyDown
  * @private
  * @param {any} e
  */
  keyDown(e) {
    let code = e.keyCode || e.which;

    if (code === 27 && get(this, 'keyboard')) {
      this.onClose();
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.getOrSetTitleId();
  },

});