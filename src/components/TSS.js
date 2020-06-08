import { Component } from "react";
import {View,Text} from "react-native"


class ClassName extends Component {

    constructor() {
        super();
      }

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        return(
<>
        <View>
                <Text>Hello</Text>
            </View>
</>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
  };

  const styles = StyleSheet.create({

  })
  
  export default connect(
    mapStateToProps,
    {},
  )(ClassName);

export default ClassName