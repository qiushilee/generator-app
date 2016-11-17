/**
 * <%= name %>
 */
import Backbone from 'backbone';
import MainTemplate from './templates/main.hbs';
import Style from './styles/main.scss';
<% if (model) { -%>
import Model from './models/main';
<% } -%>

export default Backbone.View.extend({
  el: '.main-page',

  template: MainTemplate,
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
