import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {Dimensions} from 'react-native';
import Svg, {Color, Polygon, Rect} from 'react-native-svg';

type P = {color: Color; height?: number; width?: number};

export default function Triangle({color, height, width: propWidth}: P) {
  height = height || 24;
  if (propWidth) {
    return <TrianglePolygon color={color} height={height} width={propWidth} />;
  }

  const [width, setWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width: w}}) => {
      setWidth(w);
    });
  });

  return <TrianglePolygon color={color} height={height} width={width} />;
}

function TrianglePolygon({color, height, width}: P) {
  const points = `0,0 ${width},${height} 0,${height} 0,0`;
  return (
    <Svg width="100%" height="100%">
      <Polygon points={points} fill={color} />
    </Svg>
  );
}
