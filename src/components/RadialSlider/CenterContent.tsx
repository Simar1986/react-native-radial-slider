import { View, Text, Image } from 'react-native';
import React from 'react';
import { styles } from './styles';
import type { CenterContentProps } from './types';
import { moderateScale } from '../../theme';

const CenterContent = (props: CenterContentProps) => {
  const {
    title,
    subTitle,
    unit,
    titleStyle,
    subTitleStyle,
    valueStyle,
    unitStyle,
    isHideTitle,
    isHideSubtitle,
    isHideValue,
    value,
    centerContentStyle,
    unitValueContentStyle,
    icon1,
    icon2,
    icon3,
  } = props;

  return (
    <View style={[styles.hideCenterContent, centerContentStyle]}>
      {!isHideTitle && (
        <Text style={[styles.helperText, styles.subTitleWidth, titleStyle]}>
          {title}
        </Text>
      )}
      {!isHideValue && (
        <>
          <View style={[styles.hideValue, unitValueContentStyle]}>
            <Text style={[styles.valueText, styles.large_header, valueStyle]}>
              {value}
            </Text>
            <Text style={[styles.valueUnit, styles.helperText, unitStyle]}>
              {unit}
            </Text>
          </View>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: moderateScale(10),
            }}>
            <Image
              source={icon1}
              style={{
                height: moderateScale(16),
                width: moderateScale(16),
                marginRight: moderateScale(10),
              }}
            />
            <Image
              source={icon2}
              style={{
                height: moderateScale(16),
                width: moderateScale(16),
                marginRight: moderateScale(10),
              }}
            />
            <Image
              source={icon3}
              style={{ height: moderateScale(16), width: moderateScale(16) }}
            />
          </View>
        </>
      )}
      {!isHideSubtitle && (
        <Text style={[styles.helperText, styles.subTitleWidth, subTitleStyle]}>
          {subTitle}
        </Text>
      )}
    </View>
  );
};

export default CenterContent;
