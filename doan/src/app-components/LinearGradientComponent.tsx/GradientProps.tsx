import React, { ReactNode } from 'react';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

interface GradientComponentProps extends Omit<LinearGradientProps, 'colors'> {
  children?: ReactNode;
  colors?: string[];
}

const GradientComponent: React.FC<GradientComponentProps> = ({
  children,
  colors = ['#EA7E79', '#F8B97C'],
  ...restProps
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      {...restProps}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientComponent
