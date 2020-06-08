import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import {Provider, connect} from 'react-redux';
import Picker from 'react-native-picker-view';
import {calculateOffer} from '../actions';

import {NativeModules} from 'react-native';

class Calculator extends Component {
  constructor() {
    super();

    this.state = {
      arv: 200000,
      rehabCost: 10000,
      closingCosts: 0,
      closingCostsPercentage: 0.09,
      carryingCosts: 0,
      carryingCostsPercentage: 0.06,
      desiredProfit: 0,
      desiredProfitPercentage: 0.2,
      wholesaleFee: 15000,
      buyPrice: 0,
      offer: 0,
      index: 0,
      weekIndex: 0,
      hasFile: false,
      hasTranslationFile: false,
    };
  }

  getDecimal(r) {
    return parseFloat(r).toFixed(2);
  }

  getPercentage(r) {
    return r * 100;
  }

  createOffer() {}

  // inputChange(event) {

  //     console.log("change")
  // }

  // inputSubmit(event) {

  //     console.log("submit")

  //     this.props.calculateOffer();

  // }

  componentDidMount() {
    this.props.calculateOffer('arv', 200000);

    //   this.setupRecorder(this.props.url);
    //   this.props.getLanguages(this.props.url);
    //   this.props.updateDestinations(6,this.props.url);
  }

  showPicker1 = () => {
    return (
      <View style={styles.picker}>
        <Picker
          values={this.props.sttSources}
          selected={this.props.sourceIndex}
          enableInput={false}
          onSelect={(value, index) => {
            console.log('onSelect', value, index);

            this.props.updateSourceIndex(value, index);

            //console.log('selectedID', this.props.sttIDs[index]);

            this.setState({
              source: value,
              sourceIndex: index,
              selectedSourceID: this.props.sttIDs[index],
            });
          }}
        />

        <Text
          style={styles.doneBtn}
          onPress={() => [
            this.props.doneSelectSource(
              this.state.source,
              this.state.sourceIndex,
              this.state.destination,
              this.state.selectedSourceID,
            ),
            this.props.updateDestinations(this.state.selectedSourceID),
          ]}>
          Done
        </Text>
      </View>
    );
  };

  renderInitialView() {
    if (this.props.phasePicker === true) {
      return <>{this.showPicker1()}</>;
    } else if (this.props.weekPicker === true) {
      return <>{this.showPicker2()}</>;
    } else if (this.props.recordView === true) {
      return (
        <>
          {this.showRecordView()}

          {/* <RecordView/> */}
        </>
      );
    }
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.headerLbl}>After Repair Value</Text>

            <TextInput
              style={styles.inputTxt}
              onChangeText={text => this.setState({arv: text})}
              onBlur={() => this.props.calculateOffer('arv', this.state.arv)}>
              ${this.getDecimal(this.props.arv)}
            </TextInput>
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Rehab Cost</Text>

            <TextInput
              style={styles.inputTxt2}
              onChangeText={text => this.setState({rehabCost: text})}
              onBlur={() =>
                this.props.calculateOffer('rehabCost', this.state.rehabCost)
              }>
              ${this.getDecimal(this.props.rehabCost)}
            </TextInput>
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Estimated Closing Costs</Text>

            <View style={styles.doubleView}>
              <TextInput
                style={styles.inputTxt3}
                onChangeText={text => this.setState({closingCosts: text})}
                onBlur={() =>
                  this.props.calculateOffer(
                    'closingCosts',
                    this.state.closingCosts,
                  )
                }>
                ${this.getDecimal(this.props.closingCosts)}
              </TextInput>

              {/* <TextInput style={[styles.subscript]}>9%</TextInput> */}

              <TextInput
                style={styles.subscript}
                onChangeText={text =>
                  this.setState({closingCostsPercentage: text})
                }
                onBlur={() =>
                  this.props.calculateOffer(
                    'closingCostsPercentage',
                    this.state.closingCostsPercentage,
                  )
                }>
                {this.getPercentage(this.props.closingCostsPercentage)}%
              </TextInput>
            </View>

            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Estimated Carrying Cost</Text>

            <View style={styles.doubleView}>
              <TextInput
                style={styles.inputTxt3}
                onChangeText={text => this.setState({carryingCosts: text})}
                onBlur={() =>
                  this.props.calculateOffer(
                    'carryingCosts',
                    this.state.carryingCosts,
                  )
                }>
                ${this.getDecimal(this.props.carryingCosts)}
              </TextInput>

              {/* <TextInput style={[styles.subscript]}>6%</TextInput> */}

              <TextInput
                style={styles.subscript}
                onChangeText={text =>
                  this.setState({carryingCostsPercentage: text})
                }
                onBlur={() =>
                  this.props.calculateOffer(
                    'carryingCostsPercentage',
                    this.state.carryingCostsPercentage,
                  )
                }>
                {this.getPercentage(this.props.carryingCostsPercentage)}%
              </TextInput>
            </View>
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Desired Profit</Text>
            <View style={styles.doubleView}>
              <TextInput
                style={styles.inputTxt3}
                onChangeText={text => this.setState({desiredProfit: text})}
                onBlur={() =>
                  this.props.calculateOffer(
                    'desiredProfit',
                    this.state.desiredProfit,
                  )
                }>
                ${this.getDecimal(this.props.desiredProfit)}
              </TextInput>

              {/* <TextInput style={[styles.subscript]}>20%</TextInput> */}

              <TextInput
                style={styles.subscript}
                onChangeText={text =>
                  this.setState({desiredProfitPercentage: text})
                }
                onBlur={() =>
                  this.props.calculateOffer(
                    'desiredProfitPercentage',
                    this.state.desiredProfitPercentage,
                  )
                }>
                {this.getPercentage(this.props.desiredProfitPercentage)}%
              </TextInput>
            </View>
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Desired Wholesale Fee</Text>
            <TextInput
              style={styles.inputTxt2}
              onChangeText={text => this.setState({wholesaleFee: text})}
              onBlur={() =>
                this.props.calculateOffer(
                  'wholesaleFee',
                  this.state.wholesaleFee,
                )
              }>
              ${this.getDecimal(this.props.wholesaleFee)}
            </TextInput>
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Buy Price for House</Text>
            <TextInput
              style={styles.inputTxt2}
              onChangeText={text => this.setState({buyPrice: text})}
              onBlur={() =>
                this.props.calculateOffer('buyPrice', this.state.buyPrice)
              }>
              ${this.getDecimal(this.props.buyPrice)}
            </TextInput>
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Max Offer</Text>
            <TextInput
              style={styles.inputTextBold}
              onChangeText={text => this.setState({offer: text})}
              onBlur={() =>
                this.props.calculateOffer('offer', this.state.offer)
              }>
              ${this.getDecimal(this.props.offer)}
            </TextInput>
            <View style={styles.separator} />

            <TouchableOpacity onPress={() => this.createOffer()}>
              <Text style={[styles.offerBtn]}>CREATE OFFER</Text>
            </TouchableOpacity>
          </ScrollView>

          {this.renderInitialView()}
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    source: state.source,
    sttSources: state.sttSources,
    sttIDs: state.sttIDs,
    sttDestinations: state.sttDestinations,
    sttDestinationIDs: state.sttDestinationIDs,
    sttCodes: state.sttCodes,
    translationCodes: state.translationCodes,
    destination: state.destination,
    recordColor: state.recordColor,
    playColor: state.playColor,
    playTranslationColor: state.playTranslationColor,
    sourceIndex: state.sourceIndex,
    sourceLanguages: state.sourceLanguages,
    destinationIndex: state.destinationIndex,
    destinationLanguages: state.destinationLanguages,
    phasePicker: state.phasePicker,
    weekPicker: state.weekPicker,
    recordBtnStatus: state.recordBtnStatus,
    playBtnStatus: state.playBtnStatus,
    recordView: state.recordView,
    playBtn: state.playBtn,
    playTranslationBtn: state.playTranslationBtn,
    recordBtn: state.recordBtn,

    closingCosts: state.closingCosts,
    carryingCosts: state.carryingCosts,
    desiredProfit: state.desiredProfit,
    offer: state.offer,
    buyPrice: state.buyPrice,
    arv: state.arv,
    rehabCost: state.rehabCost,
    wholesaleFee: state.wholesaleFee,

    closingCostsPercentage: state.closingCostsPercentage,
    carryingCostsPercentage: state.carryingCostsPercentage,
    desiredProfitPercentage: state.desiredProfitPercentage,
  };
};

export default connect(
  mapStateToProps,
  {calculateOffer},
)(Calculator);

const styles = StyleSheet.create({
  doubleView: {
    backgroundColor: 'red',
    height: 50,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },

  subscript: {
    position: 'absolute',
    right: 0,
    fontSize: 25,
    color: '#484848',
  },
  separator: {
    width: 300,
    height: 1,
    backgroundColor: '#DEDEDE',
    marginTop: 5,
    marginBottom: 20,
  },
  headerLbl: {
    color: '#B2B2B2',
    width: 300,
    fontSize: 18,
    //marginBottom: 5
  },
  headerLbl2: {
    color: '#B2B2B2',

    width: 300,
    height: 50,
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  phaseLbl: {},
  inputTxt: {
    color: '#484848',
    overflow: 'hidden',
    width: 300,
    height: 50,
    fontSize: 35,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  inputTxt2: {
    color: '#484848',
    overflow: 'hidden',
    width: 300,
    height: 50,
    fontSize: 35,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  inputTxt3: {
    color: '#484848',
    overflow: 'hidden',
    width: 300,
    height: 50,
    fontSize: 35,
    paddingTop: 10,
    backgroundColor: 'white',
  },

  inputTextBold: {
    overflow: 'hidden',
    width: 300,
    height: 50,
    fontSize: 35,
    paddingTop: 10,
    backgroundColor: 'white',
    color: '#85DEB1',
    fontWeight: 'bold',
  },

  recordVButtons: {
    paddingTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100,
    alignItems: 'center',
    width: 250,
  },
  navIcon: {
    width: 50,
    height: 50,
  },
  recordViewHeader: {
    fontSize: 23,
    color: 'gray',
    fontWeight: 'bold',
  },
  recordVOuter: {
    display: 'flex',
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  recordV: {
    width: Dimensions.get('window').width,
    height: 300,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
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
  recordViewStart: {
    width: 100,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 50,
  },
  pickerSelect: {
    textAlign: 'center',
    height: 200,
  },
  recordBtnsView: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  offerBtn: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: 15,
    backgroundColor: '#85DEB1',
    color: 'white',
    marginTop: 15,
    width: 300,
    height: 60,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  recordBtn: {
    borderRadius: 30,
    overflow: 'hidden',
    paddingTop: 17,
    //backgroundColor: "rgb(123,237,141)",
    backgroundColor: 'rgb(160,160,160)',
    color: 'white',
    marginTop: 15,
    height: 60,
    fontSize: 20,
    width: 150,
    marginRight: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recordBtn2: {
    borderRadius: 30,
    overflow: 'hidden',
    paddingTop: 17,
    // backgroundColor: "rgb(123,237,141)",
    backgroundColor: 'rgb(160,160,160)',
    color: 'white',
    marginTop: 75,
    height: 60,
    fontSize: 20,
    width: 300,
    marginRight: 10,
    fontWeight: 'bold',
    textAlign: 'center',
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
  container: {
    alignItems: 'center',
    //backgroundColor: "red"
  },

  picker: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    backgroundColor: 'white',
    height: 500,
  },
  picker2: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    backgroundColor: 'white',
    height: 500,
  },
  doneBtn: {
    backgroundColor: 'gray',
    color: 'white',
    textAlign: 'center',
    height: 65,
    marginTop: 15,
    paddingTop: 20,
    fontSize: 22,
  },
});
