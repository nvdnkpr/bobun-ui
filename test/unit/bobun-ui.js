/*jshint undef:false, expr:true, strict:false */
var expect = chai.expect;

describe('Bobun.UI', function () {

  it('should attach a Bobun.UI object on window', function () {
    expect(window.Bobun).to.be.an('object');
    expect(window.Bobun.UI).to.be.an('object');
  });

  describe('Bobun.UI.Base', function () {
    var baseView;

    beforeEach(function () {
      baseView = new Bobun.UI.Base();
    });

    describe('#append', function () {
      var myView;

      beforeEach(function () {
        myView = new (Backbone.View.extend({
          render: function () {
            this.rendered = true;
            this.$el.html('foo');
            return this;
          }
        }))();

        baseView.append(myView);
      });

      it('should render a view', function () {
        expect(myView).to.have.property('rendered', true);
      });

      it('should append the view element to the base view element', function () {
        expect(baseView.$el.text()).to.equal('foo');
      });

      it('should be fluent', function () {
        expect(baseView.append(myView)).to.equal(baseView);
      });
    });

    describe('#set', function () {

      beforeEach(function () {
        baseView.options = {};
      });

      it('should set an option', function () {
        baseView.set('foo', 'bar');
        expect(baseView.options.foo).to.equal('bar');
      });

      it('should trigger a "change:key" event with args (view, value, options)', function () {
        var spy = sinon.spy();
        baseView.on('change:foo', spy);

        baseView.set('foo', 'bar', 'opts');

        expect(spy.firstCall.args[0]).to.equal(baseView);
        expect(spy.firstCall.args[1]).to.equal('bar');
        expect(spy.firstCall.args[2]).to.equal('opts');
      });

      it('should trigger a "change" event with args (view, options)', function () {
        var spy = sinon.spy();
        baseView.on('change', spy);

        baseView.set('foo', 'bar', 'opts');

        expect(spy.firstCall.args[0]).to.equal(baseView);
        expect(spy.firstCall.args[1]).to.equal('opts');
      });

      it('should not trigger an event with silent option', function () {
        var spy = sinon.spy();
        baseView.on('change:foo', spy);
        baseView.on('change', spy);

        baseView.set('foo', 'bar', {silent: true});

        expect(spy.called).to.be.false;
      });
    });
  });
});