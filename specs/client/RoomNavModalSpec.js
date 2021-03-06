describe('RoomNavModal', function(){

  var TestUtils, roomNavModal, roomMockAction, holder;

  beforeEach(function(){
    TestUtils = React.addons.TestUtils;
    roomNavModal = React.createElement(app.RoomNavModal, {roomId: '0'});
    holder = app.PageActions;
    app.PageActions = {
      navigate: function(body){
        roomMockAction = body;
      }
    };
    roomNavModal = TestUtils.renderIntoDocument(roomNavModal);
  });

  afterEach(function(){
    app.PageActions = holder;
  });

  it('should render the body', function(){
    expect(roomNavModal.refs.body).to.be.ok();
  });

  it('should handle a click', function(){
    TestUtils.Simulate.click(roomNavModal.refs.room.getDOMNode());
    expect(roomMockAction.dest).to.equal('rooms');
    expect(roomMockAction.props).to.equal('0');
  });

});
