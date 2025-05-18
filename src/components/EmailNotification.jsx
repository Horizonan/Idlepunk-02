
import React from 'react';
import './EmailNotification.css';

class EmailNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
    this.visibilityTimer = null;
    this.closeTimer = null;
  }

  componentDidMount() {
    this.visibilityTimer = setTimeout(() => {
      this.setState({ isVisible: false });
    }, 5000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isVisible && !this.state.isVisible) {
      this.closeTimer = setTimeout(this.props.onClose, 300);
    }
  }

  componentWillUnmount() {
    if (this.visibilityTimer) clearTimeout(this.visibilityTimer);
    if (this.closeTimer) clearTimeout(this.closeTimer);
  }

  handleClose = () => {
    this.setState({ isVisible: false });
  }

  render() {
    const { email } = this.props;
    const { isVisible } = this.state;

    return (
      <div className={`email-notification ${isVisible ? 'visible' : 'hiding'}`}>
        <div className="email-header">
          <span className="email-from">{email.from}</span>
          <button className="close-button" onClick={this.handleClose}>×</button>
        </div>
        <div className="email-subject">{email.subject}</div>
      </div>
    );
  }
}

export default EmailNotification;
