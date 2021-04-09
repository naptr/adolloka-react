import React from 'react';
import Lottie from 'react-lottie';
import InlineLogo from './InlineLogo';
import styles from '../styles/Animation/Animation.module.css';


class LottieAnimation extends React.Component {
  constructor(props) {
    super(props);

    this.defaultOptions = {
      loop: true, 
      autoplay: true, 
      animationData: this.props.lotti, 
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  }

  render() {
    return (
      <div className={styles.animationContainer}>
        <Lottie options={this.defaultOptions} height={this.props.height} width={this.props.width} />
        <div className={styles.subtitles}>
          <h2>Fashionmu, tanggung jawab kami</h2>
          <span><InlineLogo fontSize={1} fontWeight={700}/> berkomitmen untuk selalu memberikan yang terbaik</span>
        </div>
      </div>
    )
  }
}

export default LottieAnimation;