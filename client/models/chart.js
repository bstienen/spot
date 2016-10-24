/**
 * Chart
 *
 * Base class to hold configuration for charts. Extend and override properties for each chart.
 * Implementations for horizontalbarchart, barchart, linechart, piechart, polarareachart, and radarchart from ChartJS are implemented.
 * @class Chart
 */
var BaseModel = require('./base');

function titleForChart (chart) {
  var title = '';

  var aggregates = chart.filter.aggregates;
  if (aggregates.length === 0) {
    title = 'count';
  } else {
    aggregates.forEach(function (aggregate) {
      title += aggregate.operation + ' of ' + aggregate.label;
    });
  }

  title += ' by';

  var partitions = chart.filter.partitions;
  partitions.forEach(function (partition) {
    title += ' ' + partition.label;
  });
  return title;
}

function labelForPartition (chart, rank) {
  var partition = chart.filter.partitions.get(rank, 'rank');
  if (!partition) {
    return '';
  }

  // no title for categorial partitions
  if (partition.isCategorial) {
    return '';
  }

  // use: "label [units]" or "label"
  if (partition.units.length > 0) {
    return partition.label + ' [' + partition.units + ']';
  } else {
    return partition.label;
  }
}

module.exports = BaseModel.extend({
  props: {
    /**
     * Minimum number of partitions this plot requires
     * @memberof! Chart
     * @type {number}
     */
    minPartitions: ['number', true, 1],

    /**
     * Maximum number of partitions this plot can visualize
     * @memberof! Chart
     * @type {number}
     */
    maxPartitions: ['number', true, 2],

    /**
     * Minimum number of aggregates this plot requires
     * Note that when no aggregates are defined, a `count(*)` is used as default.
     * @memberof! Chart
     * @type {number}
     */
    minAggregates: ['number', true, 0],

    /**
     * Maximum number of aggregates this plot can visualize
     * @memberof! Chart
     * @type {number}
     */
    maxAggregates: ['number', true, 1]
  },
  session: {
    /**
     * Filter instance
     * @memberof! Chart
     * @type {Filter}
     */
    filter: ['any', true, false]
  },
  getXLabel: function () {
    return labelForPartition(this, '1');
  },
  getYLabel: function () {
    return labelForPartition(this, '2');
  },
  getZLabel: function () {
    return labelForPartition(this, '3');
  },
  getTitle: function () {
    return titleForChart(this);
  }
});
