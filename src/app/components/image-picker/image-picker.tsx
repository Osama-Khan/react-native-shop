import React from 'react';
import {Image} from 'react-native';
import {IconButton} from 'react-native-paper';
import s from '../../../styles/styles';
import uiService from '../../services/ui.service';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

type PropType = {
  /** Image to show as preview*/
  thumb: string;

  /** Called when an image is picked successfully with the
   * base64 encoded string in parameter */
  onPick: (img: string) => void;

  /** Size of the image preview */
  size?: {width: number; height: number};
};

/** Picks an image and returns a base64 encoded string in onPick prop */
export default class ImagePicker extends React.Component<PropType> {
  constructor(props: PropType) {
    super(props);
  }

  render() {
    return (
      <>
        <Image
          source={{
            uri: this.props.thumb,
            height: this.props.size?.height || 144,
            width: this.props.size?.width || 144,
          }}
        />
        <IconButton
          icon="upload"
          style={s.bottomRight}
          onPress={() => {
            DocumentPicker.pickSingle({
              type: DocumentPicker.types.images,
            })
              .then(img => {
                RNFS.readFile(img.uri, 'base64').then(res => {
                  const b64pre = 'data:image/png;base64,';
                  this.props.onPick(b64pre + res);
                });
              })
              .catch(() => {
                uiService.toast('No image selected');
              });
          }}
        />
      </>
    );
  }
}
