import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, ListItem, Left, Body, Right, Title} from 'native-base';
import {connect} from 'react-redux';
import WeekItem from './WeekItem';
import {getContracts, selectContract, noneContractSelected} from '../actions';

class ContractDetais extends Component {
  constructor() {
    super();
  }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name={'user'} size={50} color={tintColor} />
    ),
  };

  componentDidMount() {
    //this.props.getContractDetais(1,this.props.url);
  }

  closeDetails() {
    this.props.noneContractSelected();
  }

  renderInitialView() {
    return (
      <>
        <View style={styles.contractView}>
          <TouchableOpacity
            style={styles.closeBtnView}
            onPress={() => this.closeDetails()}>
            <Text style={styles.closeBtn}>X</Text>
          </TouchableOpacity>

          <ScrollView>
            {/* <Image source={flag} style={styles.headerImg2} /> */}
            <Text style={styles.headerTxt}>Assigner</Text>
            <Text style={styles.inputTxt}>
              {this.props.selectedContract.assigner}
            </Text>
            <Text style={styles.headerTxt}>Property Address</Text>
            <Text style={styles.inputTxt}>
              {this.props.selectedContract.propertyAddress}
            </Text>
            <Text style={styles.headerTxt}>Purchase Price</Text>
            <Text style={styles.ContractTxt}>
              {this.props.selectedContract.purchasePrice}
            </Text>
            <Text style={styles.headerTxt}>City, State, Zip</Text>
            <Text style={styles.ContractTxt}>
              {this.props.selectedContract.cityStateZip}
            </Text>
            <Text style={styles.headerTxt}>Legal Description</Text>
            <Text style={styles.ContractTxt}>
              {this.props.selectedContract.legalDescription}
            </Text>
            <Text style={styles.headerTxt}>Earnest Money Deposit</Text>
            <Text style={styles.ContractTxt}>
              {this.props.selectedContract.earnestMoney}
            </Text>
            <Text style={styles.headerTxt}>Contract Date</Text>
            <Text style={styles.ContractTxt}>
              {this.props.selectedContract.contractDate}
            </Text>
            <Text style={styles.headerTxt}>Recipient Email</Text>
            <Text style={styles.ContractTxt}>
              {this.props.selectedContract.recipientEmail}
            </Text>
          </ScrollView>
        </View>
      </>
    );
  }
  render() {
    return <View style={styles.container}>{this.renderInitialView()}</View>;
  }
}

const mapStateToProps = state => {
  return {
    selectedTranslation: state.selectedTranslation,
  };
};

export default connect(
  mapStateToProps,
  {noneContractSelected},
)(ContractDetais);

const styles = StyleSheet.create({
  closeBtnView: {position: 'absolute', top: -45, right: 30},
  closeBtn: {
    color: 'rgb(116,138,157)',
  },
  cellInfo: {flexDirection: 'row', alignItems: 'center'},
  contractView: {
    marginLeft: 30,
    height: Dimensions.get('window').height - 200,
  },
  inputTxt: {
    marginTop: 20,
    fontSize: 16,
    color: 'rgb(116,138,157)',
  },
  headerTxt: {
    marginTop: 20,
  },
  ContractTxt: {
    marginTop: 20,
    fontSize: 16,
    color: 'rgb(116,138,157)',
  },
  listitem2: {
    marginLeft: 5,
    minHeight: 75,
  },
  chevron: {},
  listitem: {
    marginLeft: 5,
    backgroundColor: 'rgb(248,248,248)',
  },
  list: {},
  headerImg: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  headerImg2: {
    width: 25,
    height: 25,
  },
  item2: {
    backgroundColor: 'white',
  },
  headerLbl: {
    color: 'black',
    width: Dimensions.get('window').width,
    marginLeft: 0,
  },
  exerciseCell: {
    marginTop: 0,
    fontSize: 16,
    color: 'rgb(116,138,157)',
    fontFamily: 'Avenir Heavy',
    width: Dimensions.get('window').width - 55,
  },
  liftCell: {
    fontSize: 16,
    top: 10,
    color: '#333333',
    fontFamily: 'Avenir Book',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  body1: {
    marginRight: Dimensions.get('window').width,
    backgroundColor: 'white',
  },
  playBtn: {
    borderRadius: 30,
    overflow: 'hidden',
    paddingTop: 15,
    backgroundColor: 'rgb(160,160,160)',
    color: 'white',
    marginTop: 15,
    height: 60,
    fontSize: 20,
    width: 150,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recordViewPlay: {
    width: 100,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 50,
  },
  playView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: "yellow",
    width: Dimensions.get('window').width - 60,
    bottom: 0,
    position: 'absolute',
  },
});
