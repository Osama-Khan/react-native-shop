import React from 'react';
import Svg, {
  Color,
  Defs,
  Rect,
  Stop,
  LinearGradient as Gradient,
} from 'react-native-svg';

type StopType = {
  offset: number;
  stopColor: Color;
  stopOpacity: number;
};

type PositionType =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'right'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
  | 'left';

type P = {
  stops?: StopType[];
  start: PositionType;
  end: PositionType;
};

export default class LinearGradient extends React.Component<P> {
  defaultStops: StopType[] = [
    {offset: 0, stopColor: '#000', stopOpacity: 1},
    {offset: 1, stopColor: '#000', stopOpacity: 0},
  ];

  render() {
    const s = this.dirToCoord(this.props.start);
    const e = this.dirToCoord(this.props.end);
    const stops = this.props.stops || this.defaultStops;
    return (
      <Svg width="100%" height="100%">
        <Defs>
          <Gradient id="grad" x1={s.x} y1={s.y} x2={e.x} y2={e.y}>
            {stops.map((s, i) => (
              <Stop key={i} {...s} />
            ))}
          </Gradient>
        </Defs>
        <Rect width="100%" height="100%" x="0" y="0" fill="url(#grad)" />
      </Svg>
    );
  }

  /** Converts prop direction to coordinates */
  dirToCoord = (d: PositionType) =>
    d == 'top-left'
      ? {x: 0, y: 0}
      : d == 'top'
      ? {x: 0.5, y: 0}
      : d == 'top-right'
      ? {x: 1, y: 0}
      : d == 'right'
      ? {x: 1, y: 0.5}
      : d == 'bottom-right'
      ? {x: 1, y: 1}
      : d == 'bottom'
      ? {x: 0.5, y: 1}
      : d == 'bottom-left'
      ? {x: 0, y: 1}
      : {x: 0, y: 0.5};
}
