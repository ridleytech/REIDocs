import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import SettingsIcon from '../images/settings-icon.png';
import AddContractIcon from '../images/add-translation-icon.png';
import ContractsIcon from '../images/translation-icon.png';
import HomeIcon from '../images/clipboard.png';
import PhaseIcon from '../images/clock.png';
import MaxIcon from '../images/dumbell2.png';
import Contracts from './Contracts';
import Settings from '../components/Settings';
import Upload from '../components/Upload';
import Calculator from '../components/Calculator';
import AsisignmentForm from '../components/AsisignmentForm';

import {connect} from 'react-redux';
import {selectHome, selectViewContracts, selectSettings} from '../actions';
import * as actions from '../actions';

class Home extends Component {
  constructor() {
    super();

    var local = true;
    var localPath = 'http://localhost:8888/ridtech/reidocs/';
    var remotePath = 'http://agiledevelopment.xyz/reidocs/';
    var url;

    if (local) {
      url = localPath;
    } else {
      url = remotePath;
    }

    this.state = {
      url: url,
    };
  }

  componentDidMount() {
    // this.state = {
    //   phase: 'Postseason',
    //   week: 1,
    // };
    //console.log("state: "+JSON.stringify(this.state))
  }

  renderInitialView() {
    if (this.props.homeView === true) {
      //return <Calculator style={styles.phaseDiv} url={this.state.url} />;

      return <AsisignmentForm style={styles.phaseDiv} url={this.state.url} />;
    } else if (this.props.contractsView === true) {
      return <Contracts style={styles.phaseDiv} url={this.state.url} />;
    } else {
      return <Settings style={styles.vw} url={this.state.url} />;
    }
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safe} />

        {/* header view */}

        <View style={styles.container}>
          <View style={styles.headerView}>
            {/* <Text style={styles.headerLbl}>{this.props.phase} Week {this.props.week}</Text>
             */}

            <Text style={styles.headerLbl}>REI Docs</Text>
          </View>

          {/* content */}

          <View style={styles.content}>{this.renderInitialView()}</View>

          {/* bottom nav */}

          <View style={styles.bottomNavContainer}>
            <View style={styles.bottomNav}>
              <TouchableWithoutFeedback
                onPress={() => this.props.selectViewContracts()}>
                <View style={styles.navDiv}>
                  <Image source={ContractsIcon} style={styles.navIcon} />
                  {/* <Text style={styles.navText}>ContractS</Text> */}
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => this.props.selectHome()}>
                <View style={styles.navDivContract}>
                  <Image
                    source={AddContractIcon}
                    style={styles.navIconContract}
                  />
                  {/* <Text style={styles.navText}>Week</Text> */}
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => this.props.selectSettings()}>
                <View style={styles.navDiv}>
                  <Image source={SettingsIcon} style={styles.navIcon} />
                  {/* <Text style={styles.navText}>Maxes</Text> */}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    phase: state.phase,
    week: state.week,
    homeView: state.homeView,
    phaseView: state.phaseView,
    maxView: state.maxView,
    contractsView: state.contractsView,
  };
};

export default connect(
  mapStateToProps,
  {selectSettings, selectHome, selectViewContracts},
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "purple",
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  headerView: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  safe: {backgroundColor: 'white'},
  headerLbl: {
    fontSize: 20,
    color: 'rgb(116,138,157)',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 100,
    alignItems: 'center',
  },
  bottomNavContainer: {
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -5},
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  navDiv: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    width: 90,
    height: 52,
    paddingTop: 15,
  },
  navDivContract: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    width: 90,
    height: 52,
    paddingTop: 0,
  },
  navIconContract: {
    width: 55,
    height: 55,
  },
  navDivSelected: {
    alignItems: 'center',
    backgroundColor: 'rgb(123,237,141)',
    borderRadius: 30,
    width: 90,
    height: 52,
    paddingTop: 15,
  },
  navIcon: {
    width: 25,
    height: 25,
  },
  navText: {
    width: 100,
    textAlign: 'center',
    color: '#666',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 10,
    //backgroundColor: "yellow"
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
