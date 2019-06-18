"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

const e = React.createElement;

var Spinner =
/*#__PURE__*/
function (_Component) {
  _inherits(Spinner, _Component);

  function Spinner() {
    _classCallCheck(this, Spinner);

    return _possibleConstructorReturn(this, _getPrototypeOf(Spinner).apply(this, arguments));
  }

  _createClass(Spinner, [{
    key: "render",
    value: function render() {
      return React.createElement("span", {
        className: "spinme"
      }, React.createElement("div", {
        className: "spinner"
      }, React.createElement("div", {
        className: "bounce1"
      }), React.createElement("div", {
        className: "bounce2"
      }), React.createElement("div", {
        className: "bounce3"
      })));
    }
  }]);

  return Spinner;
}(React.Component);

var Message =
/*#__PURE__*/
function (_Component2) {
  _inherits(Message, _Component2);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, _getPrototypeOf(Message).apply(this, arguments));
  }

  _createClass(Message, [{
    key: "render",
    value: function render() {
      return React.createElement("li", {
        className: "message-".concat(this.props.align, " ms11")
      }, React.createElement("div", {
        className: "messageinner-ms11"
      }, React.createElement("span", {
        className: "message-text"
      }, this.props.text === '' ? React.createElement(Spinner, null) : this.props.text)));
    }
  }]);

  return Message;
}(React.Component);

var ChatRoom =
/*#__PURE__*/
function (_Component3) {
  _inherits(ChatRoom, _Component3);

  function ChatRoom(props) {
    var _this;

    _classCallCheck(this, ChatRoom);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatRoom).call(this, props));
    _this.state = {
      question: '',
      annimationStarted: false
    };
    _this.sendQuestion = _this.sendQuestion.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ChatRoom, [{
    key: "inputValueChange",
    value: function inputValueChange(event) {
      this.setState({
        question: event.target.value
      });

      if (!this.state.annimationStarted) {
        this.setState({
          annimationStarted: true
        });
        this.props.addMessage({
          align: 'right',
          text: ''
        });
      }
    }
  }, {
    key: "sendQuestion",
    value: function sendQuestion(event) {
      if (event.key === 'Enter' && this.state.question !== "") {
        if (this.state.annimationStarted) {
          this.setState({
            annimationStarted: false
          });
        }

        this.props.getResponse(this.state.question);
        this.setState({
          question: ''
        });
      }
    }
    /*onFocus={}*/

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", {
        
      }, React.createElement("div", {
        className: "chatroom form-group"
      }, React.createElement("div", {
        id: "chatroomHeader"
      }, React.createElement("h1", {
        id: "headerText"
      }, "Chatroom")), React.createElement("div", {
        id: "chatroomBody"
      }, React.createElement("ul", {
        id: "message_list",
        className: "chat-message-list"
      }, this.props.messages.map(function (message, index) {
        return React.createElement(Message, {
          key: index,
          align: message.align,
          text: message.text
        });
      }))), React.createElement("div", {
        id: "chatroomInput"
      }, React.createElement("input", {
        type: "text",
        id: "message",
        className: "messageInput",
        placeholder: "Type the message",
        value: this.state.question,
        autoComplete: "off",
        onChange: function onChange(event) {
          return _this2.inputValueChange(event);
        },
        onKeyDown: this.sendQuestion
      }))));
    }
  }]);

  return ChatRoom;
}(React.Component);

var Chatbot =
/*#__PURE__*/
function (_Component4) {
  _inherits(Chatbot, _Component4);

  function Chatbot(props) {
    var _this3;

    _classCallCheck(this, Chatbot);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Chatbot).call(this, props));
    _this3.state = {
      active: false,
      bot_id: 0,
      messages: []
    };
    return _this3;
  }

  _createClass(Chatbot, [{
    key: "openChatRoom",
    value: function openChatRoom(bot_id) {
      var _this4 = this;

      if (bot_id !== 0) {
        this.setState({
          active: !this.state.active
        });

        if (!this.state.active && this.state.messages.length === 0) {
          this.addMessage({
            align: 'left',
            text: ''
          });
          axios.get("https://flask-chatbot-generator.herokuapp.com/get_response?user_id=".concat(this.props.user_id, "&bot_id=").concat(bot_id, "&question=Hello"), {
            withCredentials: true
          }).then(function (response) {
            _this4.changeLastMessage(response.data.answer);
          });
        } else {
          this.setState({
            messages: []
          });
        }
      }
    }
  }, {
    key: "getResponse",
    value: function getResponse(question) {
      var _this5 = this;

      axios.get("https://flask-chatbot-generator.herokuapp.com/get_response?user_id=".concat(this.props.user_id, "&bot_id=").concat(this.props.bot_id, "&question=").concat(question), {
        withCredentials: true
      }).then(function (response) {
        _this5.changeLastMessage(question);

        _this5.addMessage({
          align: 'left',
          text: response.data.answer
        });
      });
    }
  }, {
    key: "addMessage",
    value: function addMessage(message) {
      var messageList = this.state.messages.concat(message);
      this.setState({
        messages: messageList
      });
    }
  }, {
    key: "changeLastMessage",
    value: function changeLastMessage(text) {
      var messageList = _toConsumableArray(this.state.messages);

      messageList[messageList.length - 1].text = text;
      this.setState({
        messages: messageList
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return React.createElement("div", {
        id: "chatbotComponent"
      }, this.state.active && React.createElement(ChatRoom, {
        messages: this.state.messages,
        addMessage: function addMessage(message) {
          return _this6.addMessage(message);
        },
        getResponse: function getResponse(question) {
          return _this6.getResponse(question);
        }
      }), React.createElement("div", {
        className: "chatbotButton"
      }, React.createElement("img", {
        src: "./chat_icon.png",      
        className: "chatbotIcon",
        onClick: function onClick() {
          return _this6.openChatRoom(_this6.props.bot_id);
        }
      })));
    }
  }]);

  return Chatbot;
}(React.Component);

login("admin","ad");
const domContainer1 = document.querySelector('#chatbot_room');
ReactDOM.render(e(Chatbot,{user_id: 1, bot_id: 23}), domContainer1);