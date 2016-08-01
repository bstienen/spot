var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.includes.facetTransformTime,
  bindings: {
    'model.isTimeOrDuration': {
      type: 'toggle',
      hook: 'transform-time-panel'
    },

    'model.timeTransform.format': {
      type: 'value',
      hook: 'base-value-time-format-input'
    },
    'model.timeTransform.zone': {
      type: 'value',
      hook: 'base-value-time-zone-input'
    },
    'model.timeTransform.isDatetime': {
      type: 'booleanAttribute',
      hook: 'base-value-time-type-datetime-input',
      name: 'checked'
    },
    'model.timeTransform.isDuration': {
      type: 'booleanAttribute',
      hook: 'base-value-time-type-duration-input',
      name: 'checked'
    },

    // Bindings for: transform-time
    'model.timeTransform.transformedFormat': {
      type: 'value',
      hook: 'transform-time-units-input'
    },
    'model.timeTransform.transformedZone': {
      type: 'value',
      hook: 'transform-time-zone-input'
    },
    'model.timeTransform.transformedReference': {
      type: 'value',
      hook: 'transform-time-reference-input'
    }
  },
  events: {
    'change [data-hook~=base-value-time-format-input]': function () {
      this.model.timeTransform.format = this.queryByHook('base-value-time-format-input').value;
    },
    'change [data-hook~=base-value-time-zone-input]': function () {
      this.model.timeTransform.zone = this.queryByHook('base-value-time-zone-input').value;
    },
    'click [data-hook~=base-value-time-type-datetime-input]': function () {
      this.model.timeTransform.type = 'datetime';
    },
    'click [data-hook~=base-value-time-type-duration-input]': function () {
      this.model.timeTransform.type = 'duration';
    },
    'change [data-hook~=transform-time-units-input]': function () {
      this.model.timeTransform.transformedFormat = this.queryByHook('transform-time-units-input').value;
    },
    'change [data-hook~=transform-time-zone-input]': function () {
      this.model.timeTransform.transformedZone = this.queryByHook('transform-time-zone-input').value;
    },
    'change [data-hook~=transform-time-reference-input]': function () {
      this.model.timeTransform.transformedReference = this.queryByHook('transform-time-reference-input').value;
    }
  }
});