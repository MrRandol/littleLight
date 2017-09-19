import React from 'react';
import { Image, ActivityIndicator } from 'react-native';

class LoadingImage extends Image {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  onLoad() {
    this.setState({loading: false});
  }

  render() {
    return (
      <Image {...this.props} onLoad={() => {this.setState({loading: false})}} >
        <ActivityIndicator animating={this.state.loading} size='small' />
        {this.props.children}
      </Image>
    );
  }

}

export default LoadingImage;