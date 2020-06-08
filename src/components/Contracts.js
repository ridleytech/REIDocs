import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, ListItem, Left, Body, Right, Title} from 'native-base';
import {connect} from 'react-redux';
import WeekItem from './WeekItem';
import {getContracts, selectContract, noneContractSelected} from '../actions';
import RecordBtn from '../images/record-btn.png';

import Italy from '../images/italy.png';
import USA from '../images/usa.png';
import Spain from '../images/spain.png';
import Japan from '../images/japan.png';
import ContractDetails from './ContractDetails';
import PlayBtn from '../images/play-button.png';
import ChevronIcon from '../images/chevron-icon.png';

class Contracts extends Component {
  constructor() {
    super();
  }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name={'user'} size={50} color={tintColor} />
    ),
  };

  componentDidMount() {
    this.props.getContracts(1, this.props.url);
  }

  closeDetails() {
    this.props.noneContractSelected();
  }

  selectContract(item) {
    this.props.selectContract(item);
  }

  updateList() {
    var arr = [];
    this.state.contracts.map(obj => {
      if (obj.header) {
        arr.push(this.state.contracts.indexOf(obj));
      }
    });
    arr.push(0);
    this.setState({
      contractsHeaderIndices: arr,
    });
  }

  renderItem = ({item}) => {
    if (item.header) {
      return (
        <ListItem itemDivider>
          <Left />
          <Body style={styles.body1}>
            <Text style={styles.headerLbl}>{item.assigner}</Text>
          </Body>
          <Right />
        </ListItem>
      );
    } else if (!item.header) {
      return (
        <ListItem style={{marginLeft: 5}}>
          <Body>
            <Text style={styles.exerciseCell}>
              {item.propertyAddress} {item.cityStateZip}
            </Text>
            <Text style={styles.liftCell}>{item.purchasePrice}</Text>
          </Body>
        </ListItem>
      );
    }
  };

  renderItem2 = ({item}) => {
    if (item.header) {
      var flag;

      // if (item.assigner == 'English') {
      //   flag = USA;
      // } else if (item.assigner == 'Japanese') {
      //   flag = Japan;
      // } else if (item.assigner == 'Italian') {
      //   flag = Italy;
      // } else if (item.assigner == 'Spanish') {
      //   flag = Spain;
      // }

      flag = Spain;

      //  this.setState({
      //   flag: flag
      // });

      return (
        <ListItem style={styles.listitem}>
          <Image source={flag} style={styles.headerImg} />
          <Text style={styles.headerLbl}>{item.assigner}</Text>
        </ListItem>
      );
    } else if (!item.header) {
      return (
        <ListItem
          style={styles.listitem2}
          onPress={() => this.selectContract(item)}>
          <Body style={styles.cellInfo}>
            <View>
              <Text style={styles.exerciseCell}>{item.assigner}</Text>
              <Text style={styles.exerciseCell}>
                {item.propertyAddress} {item.cityStateZip}
              </Text>
              <Text style={styles.exerciseCell}>{item.contractDate}</Text>
            </View>

            <Image source={ChevronIcon} style={styles.chevron} />
          </Body>
        </ListItem>
      );
    }
  };

  showDetails = () => {
    console.log('details: ' + this.props.selectedContract.propertyAddress);

    var flag;

    // if (this.props.selectedContract.language == 'English') {
    //   flag = USA;
    // } else if (this.props.selectedContract.language == 'Japanese') {
    //   flag = Japan;
    // } else if (this.props.selectedContract.language == 'Italian') {
    //   flag = Italy;
    // } else if (this.props.selectedContract.language == 'Spanish') {
    //   flag = Spain;
    // }

    flag = Spain;

    return (
      <View style={styles.ContractView}>
        <TouchableOpacity
          style={styles.closeBtnView}
          onPress={() => this.closeDetails()}>
          <Text style={styles.closeBtn}>X</Text>
        </TouchableOpacity>

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
      </View>
    );
  };

  renderInitialView() {
    if (this.props.contractDetailsView === true) {
      // <ContractDetails/>

      console.log('show details');

      return (
        <>
          {/* {this.showDetails()} */}

          <ContractDetails selectedContract={this.props.selectedContract} />
        </>
      );
    } else {
      console.log('show list');
      return (
        <FlatList
          style={styles.list}
          data={this.props.contracts}
          renderItem={this.renderItem2}
          keyExtractor={(item, index) => index.toString()}
          contractsHeaderIndices={this.props.contractsHeaderIndices}
        />
      );
    }
  }
  render() {
    return <View style={styles.container}>{this.renderInitialView()}</View>;
  }
}

const mapStateToProps = state => {
  return {
    contracts: state.contracts,
    contractsHeaderIndices: state.contractsHeaderIndices,
    contractDetailsView: state.contractDetailsView,
    selectedContract: state.selectedContract,
  };
};

export default connect(
  mapStateToProps,
  {getContracts, selectContract, noneContractSelected},
)(Contracts);

const styles = StyleSheet.create({
  closeBtnView: {position: 'absolute', top: -100, right: 30},
  closeBtn: {
    color: 'rgb(116,138,157)',
  },
  cellInfo: {flexDirection: 'row', alignItems: 'center'},
  ContractView: {
    marginTop: 50,
    marginLeft: 30,
    height: Dimensions.get('window').height - 280,
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
