import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

type Orientation = 'portrait' | 'landscape';

interface DimensionsInfo {
  window: ScaledSize;
  screen: ScaledSize;
  isSmallDevice: boolean;
  isMediumDevice: boolean;
  isLargeDevice: boolean;
  isTablet: boolean;
  orientation: Orientation;
}

export function useDimensions(): DimensionsInfo {
  const [dimensions, setDimensions] = useState<DimensionsInfo>({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
    isSmallDevice: Dimensions.get('window').width < 375,
    isMediumDevice: Dimensions.get('window').width >= 375 && Dimensions.get('window').width < 768,
    isLargeDevice: Dimensions.get('window').width >= 768,
    isTablet: Dimensions.get('window').width >= 768 || 
              (Dimensions.get('window').width > Dimensions.get('window').height && 
               Dimensions.get('window').width >= 580),
    orientation: Dimensions.get('window').height > Dimensions.get('window').width ? 'portrait' : 'landscape',
  });

  useEffect(() => {
    const onChange = ({ window, screen }: { window: ScaledSize; screen: ScaledSize }) => {
      const orientation: Orientation = window.height > window.width ? 'portrait' : 'landscape';
      const isTablet = window.width >= 768 || (orientation === 'landscape' && window.width >= 580);
      
      setDimensions({
        window,
        screen,
        isSmallDevice: window.width < 375,
        isMediumDevice: window.width >= 375 && window.width < 768,
        isLargeDevice: window.width >= 768,
        isTablet,
        orientation,
      });
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      // Clean up
      subscription.remove();
    };
  }, []);

  return dimensions;
}
