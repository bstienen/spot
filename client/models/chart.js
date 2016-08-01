/**
 * Chart
 *
 * Base class to hold configuration for charts. Extend and override properties for each chart.
 * Implementations for horizontalbarchart, barchart, linechart, piechart, polarareachart, and radarchart from ChartJS are implemented.
 * @class Chart
 */
var BaseModel = require('./base');

module.exports = BaseModel.extend({
  props: {
    /**
     * True if the chart accepts a primary facet
     * @abstract
     * @memberof! Chart
     * @type {boolean}
     */
    hasPrimary: ['boolean', true, true],

    /**
     * True if the chart accepts a secondary facet
     * @abstract
     * @memberof! Chart
     * @type {boolean}
     */
    hasSecondary: ['boolean', true, false],

    /**
     * True if the chart accepts a tertiary facet
     * @abstract
     * @memberof! Chart
     * @type {boolean}
     */
    hasTertiary: ['boolean', true, false]
  },
  session: {
    /**
     * Filter instance
     * @memberof! Chart
     * @type {Filter}
     */
    filter: ['any', true, false]
  }
});