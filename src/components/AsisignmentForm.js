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
  TouchableOpacity,
} from 'react-native';

import {Provider, connect} from 'react-redux';
import Picker from 'react-native-picker-view';
import {calculateOffer, sendContract, formUpdate} from '../actions';

import {NativeModules} from 'react-native';
import {Textarea, CheckBox} from 'native-base';

class AssignmentForm extends Component {
  constructor() {
    super();

    // var local = true;
    // var localPath = 'http://localhost:8888/ridtech/languagetranslator/';
    // var remotePath = 'http://agiledevelopment.xyz/languagetranslator/';
    //var url;

    // if (local) {
    //   url = localPath;
    // } else {
    //   url = remotePath;
    // }

    this.state = {
      done: false,
      checked: false,
      checked1: false,
    };
  }

  getDecimal(r) {
    return parseFloat(r).toFixed(2);
  }

  getPercentage(r) {
    return r * 100;
  }

  previewContract() {}

  sendContract() {
    //console.log('sendContract assigner: ' + this.props.assigner);

    const {
      assigner,
      assignee,
      propertyAddress,
      cityStateZip,
      legalDescription,
      purchasePrice,
      earnestMoney,
      contractDate,
      recipientEmail,
      // digitalSignature,
      // pdfSignature,
      url,
    } = this.props;

    //return;

    var pdfSignature = this.state.pdfSignature;
    var digitalSignature = this.state.digitalSignature;

    this.props.sendContract({
      assigner,
      assignee,
      propertyAddress,
      cityStateZip,
      legalDescription,
      purchasePrice,
      earnestMoney,
      contractDate,
      recipientEmail,
      digitalSignature,
      pdfSignature,
      url,
    });

    //this.props.navigation.navigate('Contracts')
  }

  componentDidMount() {
    console.log('url: ' + this.props.url);

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
            <Text style={styles.headerLbl}>Assigner</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.assigner}
              onChangeText={text =>
                this.props.formUpdate({prop: 'assigner', value: text})
              }
            />
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Assignee</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.assignee}
              onChangeText={text =>
                this.props.formUpdate({prop: 'assignee', value: text})
              }
            />
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Property Address</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.propertyAddress}
              onChangeText={text =>
                this.props.formUpdate({prop: 'propertyAddress', value: text})
              }
            />
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>City, State, Zip</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.cityStateZip}
              onChangeText={text =>
                this.props.formUpdate({prop: 'cityStateZip', value: text})
              }
            />
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Legal Description</Text>

            <Textarea
              style={styles.inputAreaTxt}
              value={this.props.legalDescription}
              onChangeText={text =>
                this.props.formUpdate({prop: 'legalDescription', value: text})
              }
            />

            <Text style={styles.headerLbl}>Purchase Price</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.purchasePrice}
              onChangeText={text =>
                this.props.formUpdate({prop: 'purchasePrice', value: text})
              }
            />
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Earnest Money Fee</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.earnestMoney}
              onChangeText={text =>
                this.props.formUpdate({prop: 'earnestMoney', value: text})
              }
            />
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Contract Date</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.contractDate}
              onChangeText={text =>
                this.props.formUpdate({prop: 'contractDate', value: text})
              }
            />
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Recipient Email</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.recipientEmail}
              onChangeText={text =>
                this.props.formUpdate({prop: 'recipientEmail', value: text})
              }
            />
            <View style={styles.separator} />

            <View style={styles.recordBtnsView}>
              <Text style={styles.headerLbl4}>Digital Signature</Text>
              <CheckBox
                style={styles.cb}
                checkedIcon={
                  <Image source={require('../images/checked.png')} />
                }
                uncheckedIcon={
                  <Image source={require('../images/unchecked.png')} />
                }
                checked={this.state.digitalSignature}
                onPress={() =>
                  this.setState({
                    digitalSignature: !this.state.digitalSignature,
                  })
                }
              />
            </View>

            <View style={styles.recordBtnsView}>
              <Text style={styles.headerLbl4}>PDF Signature</Text>
              <CheckBox
                style={styles.cb}
                checkedIcon={
                  <Image source={require('../images/checked.png')} />
                }
                uncheckedIcon={
                  <Image source={require('../images/unchecked.png')} />
                }
                checked={this.state.pdfSignature}
                onPress={() => [
                  this.setState({pdfSignature: !this.state.pdfSignature}),
                ]}
              />
            </View>

            <TouchableOpacity onPress={() => this.previewContract()}>
              <Text style={[styles.previewBtn]}>PREVIEW CONTRACT</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.sendContract()}>
              <Text style={[styles.offerBtn]}>SEND</Text>
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
    assigner: state.assigner,
    assignee: state.assignee,
    propertyAddress: state.propertyAddress,
    cityStateZip: state.cityStateZip,
    legalDescription: state.legalDescription,
    purchasePrice: state.purchasePrice,
    earnestMoney: state.earnestMoney,
    contractDate: state.contractDate,
    recipientEmail: state.recipientEmail,
    digitalSignature: state.digitalSignature,
    pdfSignature: state.pdfSignature,
  };
};

export default connect(
  mapStateToProps,
  {calculateOffer, sendContract, formUpdate},
)(AssignmentForm);

const styles = StyleSheet.create({
  cb: {
    //width: 50, height: 50
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
  headerLbl3: {
    color: '#B2B2B2',

    width: 150,
    height: 50,
    marginTop: 20,
    fontSize: 20,
    backgroundColor: 'yellow',
  },
  headerLbl4: {
    color: '#B2B2B2',

    width: 150,
    height: 30,
    marginTop: 5,
    fontSize: 20,
  },
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
  inputAreaTxt: {
    color: '#484848',
    overflow: 'hidden',
    width: 300,
    height: 130,
    fontSize: 15,
    paddingTop: 10,
    backgroundColor: '#FAFAFA',
    marginTop: 10,
    marginBottom: 15,
    borderColor: '#DEDEDE',
    borderStyle: 'solid',
    borderWidth: 1,
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
  pickerSelect: {
    textAlign: 'center',
    height: 200,
  },
  recordBtnsView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  previewBtn: {
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
});
