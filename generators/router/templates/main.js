import Backbone from 'backbone';
<% views.forEach((view) => { -%>
import <%= view %> from '../web/<%= view %>/view';
<% }); -%>

/**
 * events:
 *  leave - 离开时触发，参数：page - 页面名称，timeline - 时长，url - page url
 */
var Router = Backbone.Router.extend({
  view: {
    destroy: function() {}
  },
  
  initialize: function() {
<% views.forEach((view) => { -%>
    this.route('<%= view %>', '<%= view %>', function() {
      this.view.destroy();
      this.view = new <%= view %>();
    });
<% }); -%>
  }
});

var router = new Router();
router.on('leave', view => view.destroy());

Backbone.history.start();

export { router };
