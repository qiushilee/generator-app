/**
 * <%= name %>
 */
import Backbone from 'backbone';
import Tpl from './main.hbs';
import Style from './main.scss';
<% if (model) { -%>
import Model from './model';
<% } -%>

export default Backbone.View.extend({
  el: '.main-page',

  template: Tpl,
<% if (model) { -%>
  model: new Model(),
<% } -%>

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.append(this.template());
    this.$el.find('.page-body').addClass(Style.className);
  },

  destroy: function() {
<% if (model) { -%>
    this.model.destroy();
<% } -%>
    this.$el.html('');
    this.stopListening();
    return this;
  }
});
