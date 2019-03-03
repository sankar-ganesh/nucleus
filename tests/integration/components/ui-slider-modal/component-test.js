import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-slider-modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders modal properly', async function(assert) {
    await render(hbs`
      {{#ui-slider-modal as |modal|}}
        {{modal.close}}

        {{#modal.header}}Header{{/modal.header}}
        {{#modal.body}}
          Body
        {{/modal.body}}

        {{#modal.footer}}
          Footer
        {{/modal.footer}}
      {{/ui-slider-modal}}
    `);

    assert.equal(this.element.querySelector('.ui-slider-modal-header').textContent.trim(), 'Header');
    assert.equal(this.element.querySelector('.ui-slider-modal-body').textContent.trim(), 'Body');
    assert.equal(this.element.querySelector('.ui-slider-modal-footer').textContent.trim(), 'Footer');
  });
});
