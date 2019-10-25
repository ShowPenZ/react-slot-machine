import React from 'react';
import ClassName from 'classnames';
import anime from 'animejs/lib/anime.es.js';
import PropTypes from 'prop-types';
import './index.css';

class SlotsMachine extends React.Component {
  static propTypes = {
    giftPos1: PropTypes.number.isRequired,
    giftPos2: PropTypes.number.isRequired,
    giftPos3: PropTypes.number.isRequired,
    giftType: PropTypes.number.isRequired,
    startEngine: PropTypes.bool.isRequired,
    hasStart: PropTypes.bool.isRequired,
    onClickEngineStart: PropTypes.func.isRequired,
    onEngineCompelet: PropTypes.func.isRequired,
    giftImgUrlArr: PropTypes.array.isRequired,
    slotDelay2: PropTypes.number,
    slotDelay3: PropTypes.number,
    backgroundImg: PropTypes.string,
    engineDuration: PropTypes.number,
    reWindowsContainer: PropTypes.string,
    reWindows: PropTypes.string,
    reGiftContainer: PropTypes.string,
    reStartBtn: PropTypes.string,
    customTurns: PropTypes.number,
  };

  static defaultProps = {
    slotDelay2: 500,
    slotDelay3: 1000,
    engineDuration: 8000,
    backgroundImg: require('./images/bg.png'),
    customTurns: 2,
  };

  state = {};

  componentDidMount() {}

  componentDidUpdate() {
    const that = this;
    const {
      giftPos1,
      giftPos2,
      giftPos3,
      slotDelay2,
      slotDelay3,
      startEngine,
      hasStart,
      onEngineCompelet,
      engineDuration,
      giftType,
      customTurns,
    } = that.props;

    // 核心技术点 translateY 来控制最后旋转到的奖品 默认老虎机旋转两圈则用li的高度*数量*2次之后再停下
    //          使用li的高度乘以奖品的位置数得到旋转到奖品的高度加上旋转两圈的高度即为停下时的位置

    const engine1 = anime({
      targets: that.myRef1.current,
      translateY:
        -that.myGiftRef.current.clientHeight * giftType * customTurns - that.myGiftRef.current.clientHeight * giftPos1,
      easing: 'easeInOutQuad',
      duration: engineDuration,
      autoplay: false,
      // complete: function(anim) {
      //   console.log(234);
      // }
    });

    const engine2 = anime({
      targets: that.myRef2.current,
      translateY:
        -that.myGiftRef.current.clientHeight * giftType * customTurns - that.myGiftRef.current.clientHeight * giftPos2,
      easing: 'easeInOutQuad',
      duration: engineDuration,
      delay: slotDelay2,
      autoplay: false,
      // complete: function(anim) {
      // }
    });

    const engine3 = anime({
      targets: that.myRef3.current,
      translateY:
        -that.myGiftRef.current.clientHeight * giftType * customTurns - that.myGiftRef.current.clientHeight * giftPos3,
      easing: 'easeInOutQuad',
      duration: engineDuration,
      delay: slotDelay3,
      autoplay: false,
      complete: onEngineCompelet,
    });

    if (startEngine) {
      engine1.play();
      engine2.play();
      engine3.play();
    } else {
      if (hasStart) {
        that.myRef1.current.style.transform = `translateY(${-that.myGiftRef.current.clientHeight * giftPos1}px)`;
        that.myRef2.current.style.transform = `translateY(${-that.myGiftRef.current.clientHeight * giftPos2}px)`;
        that.myRef3.current.style.transform = `translateY(${-that.myGiftRef.current.clientHeight * giftPos3}px)`;
      } else {
        that.myRef1.current.style.transform = `translateY(0px)`;
        that.myRef2.current.style.transform = `translateY(0px)`;
        that.myRef3.current.style.transform = `translateY(0px)`;
      }
    }
  }

  myRef1 = React.createRef();
  myRef2 = React.createRef();
  myRef3 = React.createRef();
  myGiftRef = React.createRef();

  render() {
    const that = this;
    const {
      onClickEngineStart,
      backgroundImg,
      reWindowsContainer,
      reWindows,
      reGiftContainer,
      reStartBtn,
      giftImgUrlArr,
      customTurns,
    } = that.props;
    let tempArr = null;

    if (customTurns > 2) {
      tempArr = giftImgUrlArr;
    } else {
      tempArr = giftImgUrlArr.concat(giftImgUrlArr, giftImgUrlArr);
    }

    const item = () => {
      return tempArr.map((d, i) => {
        const key = Object.keys(d)[0];

        return (
          <li key={i} className="imgContainer">
            <img className={ClassName('gift')} src={d[key]} ref={that.myGiftRef} alt="" />
          </li>
        );
      });
    };

    return (
      <div
        className={ClassName('windowsContainer', reWindowsContainer)}
        style={{ background: `url(${backgroundImg})  no-repeat` }}
      >
        <div className={ClassName('windows', reWindows)}>
          <ul id="giftContainer" className={ClassName('giftContainer', reGiftContainer)} ref={that.myRef1}>
            {item()}
          </ul>
          <ul id="giftContainer" className={ClassName('giftContainer', reGiftContainer)} ref={that.myRef2}>
            {item()}
          </ul>
          <ul id="giftContainer" className={ClassName('giftContainer', reGiftContainer)} ref={that.myRef3}>
            {item()}
          </ul>
        </div>
        <div className={ClassName('startBtn', reStartBtn)} onClick={onClickEngineStart}></div>
      </div>
    );
  }
}

export default SlotsMachine;
