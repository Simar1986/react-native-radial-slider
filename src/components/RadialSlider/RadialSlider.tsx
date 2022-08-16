import React, { useEffect, useState } from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, Circle, } from 'react-native-svg';
import { View, Platform, StyleSheet } from 'react-native';
import { styles } from './styles';
import { Colors } from '../../theme';
import { useSilderAnimation, useRadialSlider } from './hooks';
import { defaultProps } from './SliderDefaultProps';
import ButtonContent from './ButtonContent';
import CenterContent from './CenterContent';
import TailText from './TailText';
import LineContent from './LineContent';
const RadialSlider = (props) => {
    const [isStart, setIsStart] = useState(false);
    const [iconPosition, setIconPosition] = useState('');
    const { step, radius, sliderWidth, sliderTrackColor, linearGradient, thumbRadius, thumbBorderColor, thumbColor, thumbBorderWidth, style, markerLineSize, disabled, contentStyle, buttonContainerStyle, min, max, isHideSlider, isHideCenterContent, isHideTailText, isHideButtons, isHideLines, leftIconStyle, rightIconStyle, stroke, onChange = () => { }, } = props;
    const { panResponder, value, setValue, curPoint, currentRadian, prevValue } = useSilderAnimation(props);
    const { svgSize, containerRef, startPoint, endPoint, startRadian, radianValue, isRadialCircleVariant, centerValue, } = useRadialSlider(props);
    useEffect(() => {
        var _a;
        //check max value length
        const maxLength = (_a = max === null || max === void 0 ? void 0 : max.toString()) === null || _a === void 0 ? void 0 : _a.length;
        const timerId = setTimeout(handleValue, maxLength > 2 ? 10 : 100);
        return () => clearTimeout(timerId);
    });
    const handleValue = () => {
        if (iconPosition === 'up' && max > value) {
            isStart && onPressButtons('up');
        }
        else if (iconPosition === 'down' && min < value) {
            isStart && onPressButtons('down');
        }
    };
    const leftButtonStyle = StyleSheet.flatten([
        leftIconStyle,
        (disabled || min === value) && {
            opacity: 0.5,
        },
    ]);
    const rightButtonStyle = StyleSheet.flatten([
        rightIconStyle,
        (disabled || max === value) && {
            opacity: 0.5,
        },
    ]);
    const onLayout = () => {
        const ref = containerRef.current;
        if (ref) {
            ref.measure((_x, _y, _width, _height) => { });
        }
    };
    const onPressButtons = (type) => {
        if (type === 'up' && max > value) {
            setValue((prevState) => {
                prevValue.current = prevState + step;
                return prevState + step;
            });
            onChange(value);
        }
        else if (type === 'down' && min < value) {
            setValue((prevState) => {
                prevValue.current = prevState - step;
                return prevState - step;
            });
            onChange(value);
        }
    };
    const circleXPosition = isRadialCircleVariant
        ? centerValue < value
            ? -7
            : 4
        : 0;

    const strokeLinecap = isRadialCircleVariant ? 'square' : 'round';
    return (React.createElement(View, { onLayout: onLayout, ref: containerRef, style: [styles.container, style, { width: svgSize, height: svgSize }], testID: "slider-view" },
        React.createElement(Svg, { width: svgSize + markerLineSize / 2 - (Platform.OS === 'web' ? 20 : 0), height: svgSize + markerLineSize / 2, viewBox: `-${markerLineSize / 2} -${markerLineSize / 2} ${svgSize + markerLineSize} ${svgSize + markerLineSize}`, preserveAspectRatio: "none" },
            React.createElement(Defs, null,
                React.createElement(LinearGradient, { x1: "0%", y1: "100%", x2: "100%", y2: "0%", id: "gradient" }, linearGradient.map((item, index) => (React.createElement(Stop, { key: index, offset: item.offset, stopColor: item.color }))))),
            !isRadialCircleVariant && !isHideTailText && React.createElement(TailText, { ...props }),
            !isHideLines && React.createElement(LineContent, { ...props, value: value }),
            !isHideSlider && (React.createElement(React.Fragment, null,
                React.createElement(Path, { strokeWidth: sliderWidth, stroke: sliderTrackColor, fill: "none", strokeLinecap: strokeLinecap, d: `M${startPoint.x},${startPoint.y} A ${radius},${radius},0,${startRadian - radianValue >= Math.PI ? '1' : '0'},1,${endPoint.x},${endPoint.y}` }),
                React.createElement(Path, { strokeWidth: sliderWidth, stroke: "url(#gradient)", fill: "none", strokeLinecap: strokeLinecap, d: `M${startPoint.x},${startPoint.y} A ${radius},${radius},0,${startRadian - currentRadian >= Math.PI ? '1' : '0'},1,${curPoint.x},${curPoint.y}` }),
                React.createElement(Circle, { cx: curPoint.x + circleXPosition, cy: curPoint.y, r: thumbRadius, fill: thumbColor || thumbBorderColor, stroke: thumbBorderColor, strokeWidth: thumbBorderWidth, ...panResponder.panHandlers })))),
        React.createElement(View, { style: [styles.content, contentStyle], pointerEvents: "box-none" },
            !isHideCenterContent && React.createElement(CenterContent, { ...props, value: value }),
            !isRadialCircleVariant && !isHideButtons && (React.createElement(View, { style: [styles.buttonsWrapper, buttonContainerStyle] },
                React.createElement(View, { style: styles.center },
                    React.createElement(ButtonContent, { onPress: () => onPressButtons('down'), onLongPress: () => {
                            setIsStart(true);
                            setIconPosition('down');
                        }, onPressOut: () => setIsStart(false), buttonType: "left-btn", style: leftButtonStyle, disabled: disabled || min === value, stroke: stroke !== null && stroke !== void 0 ? stroke : Colors.blue }),
                    React.createElement(ButtonContent, { disabled: disabled || max === value, onPress: () => onPressButtons('up'), onLongPress: () => {
                            setIsStart(true);
                            setIconPosition('up');
                        }, onPressOut: () => setIsStart(false), style: rightButtonStyle, buttonType: "right-btn", stroke: stroke !== null && stroke !== void 0 ? stroke : Colors.blue })))))));
};
RadialSlider.defaultProps = defaultProps;
export default RadialSlider;
//# sourceMappingURL=RadialSlider.js.map