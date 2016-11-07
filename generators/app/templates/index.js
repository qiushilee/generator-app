<% echarts.forEach((chart) => { -%>
import 'echarts/lib/chart/<%= chart %>';
<% }); -%>
<% if (echarts.length > 0) { -%>
import 'echarts/lib/component/axis';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
<% } -%>
import Backbone from 'backbone';
import './routes/main';

Backbone.on('error', () => {
  console.error('接口发生错误');
});
