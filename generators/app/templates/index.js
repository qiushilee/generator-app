import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Backbone from 'backbone';
import './router';

Backbone.on('error', () => {
  console.error('接口发生错误');
});
