import PlayBtnDisabled from '../images/play-btn-disabled.png';
import PlayBtn from '../images/play-button.png';
import StopBtn from '../images/stop-button.png';
import RecordBtn from '../images/record-btn.png';

const initialState = {
  people: [],
  lifts: [],
  sttSources: [],
  translations: [],
  viewAddCard: false,
  viewEditEmail: false,
  viewEditPassword: false,
  viewAccountView: false,
  contractDetailsView: false,
  contractsView: true,
  detailView: false,
  phaseView: false,
  maxView: false,
  homeView: false,
  phasePicker: false,
  weekPicker: false,
  source: '$200000.00',
  destination: '$10000.00',
  recordBtnStatus: 'RECORD',
  playBtnStatus: 'PLAY',
  sourceLanguages: ['English', 'Italian', 'French', 'Chinese'],
  destinationLanguages: ['English1', 'Italian', 'French', 'Chinese'],
  sttSources: [],
  sttIDs: [],
  sttCodes: [],
  sttDestinations: [],
  sttDestinationIDs: [],
  translationCodes: [],
  // sourceIndex: null,
  // destinationIndex: null,
  recordColor: 'rgb(160,160,160)',
  playColor: 'rgb(160,160,160)',
  playContractColor: 'rgb(160,160,160)',
  personSelected: null,
  phaseIndex: 0,
  weekIndex: 0,
  firstName: '',
  lastName: '',
  phone: '',
  email: 'randall.ridley@gmail.com',
  password: '1224',
  company: '',
  project: '',
  notes: '',
  _id: '',
  toUpdate: false,
  playBtn: PlayBtnDisabled,
  playContractBtn: PlayBtnDisabled,
  recordBtn: RecordBtn,
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
  percentageFields: [
    'closingCostsPercentage',
    'carryingCostsPercentage',
    'desiredProfitPercentage',
  ],
  assigner: '',
  assignee: '',
  propertyAddress: '',
  cityStateZip: '',
  legalDescription: '',
  purchasePrice: '',
  earnestMoney: '',
  contractDate: '',
  recipientEmail: '',
  digitalSignature: false,
  pdfSignature: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INITIAL_FETCH':
      return {
        ...state,
        people: action.payload,
      };

    case 'CONTRACT_SENT':
      var status = 'failed';

      if (action.payload == 'contract sent') {
        status = 'sent';
      }

      return {
        ...state,
        contractStatus: status,
      };

    case 'CLEAR_FIELD':
      return {
        ...state,
      };

    case 'CALCULATE_OFFER':
      // console.log("txt: "+action.txt)
      // console.log("val: "+action.val)

      console.clear();
      console.log();

      if (!action.val) {
        return;
      }

      var percentageFieldInd = state.percentageFields
        .toString()
        .indexOf(action.txt);

      var numVal;

      if (percentageFieldInd != -1) {
        numVal = action.val.replace('%', '');

        //    percentageFields = ["closingCostsPercentage","carryingCostsPercentage","desiredProfitPercentage"]

        if (action.txt == 'closingCostsPercentage') {
          console.log('closingCostsPercentage: ' + numVal);
          state.closingCostsPercentage = numVal * 0.01;
        } else if (action.txt == 'carryingCostsPercentage') {
          console.log('carryingCostsPercentage: ' + numVal);
          state.carryingCostsPercentage = numVal * 0.01;
        } else {
          console.log('desiredProfitPercentage: ' + numVal);
          state.desiredProfitPercentage = numVal * 0.01;
        }
      } else {
        numVal = action.val.toString().replace('$', '');

        if (action.txt == 'arv') {
          console.log('arv numVal: ' + numVal);
          state.arv = numVal;
        } else if (action.txt == 'rehabCost') {
          console.log('rehabCost numVal: ' + numVal);
          state.rehabCost = numVal;
        } else if (action.txt == 'closingCosts') {
          console.log('closingCosts numVal: ' + numVal);
          state.closingCosts = numVal;
        } else if (action.txt == 'carryingCosts') {
          console.log('carryingCosts numVal: ' + numVal);
          state.carryingCosts = numVal;
        } else if (action.txt == 'desiredProfit') {
          console.log('desiredProfit numVal: ' + numVal);
          state.desiredProfit = numVal;
        } else if (action.txt == 'wholesaleFee') {
          console.log('wholesaleFee numVal: ' + numVal);
          state.wholesaleFee = numVal;
        } else if (action.txt == 'buyPrice') {
          console.log('buyPrice numVal: ' + numVal);
          state.buyPrice = numVal;
        } else if (action.txt == 'offer') {
          console.log('offer numVal: ' + numVal);
          state.offer = numVal;
        }
      }

      //randall to do

      //remove symbols from textfields

      var closingCosts = state.arv * state.closingCostsPercentage;
      var carryingCosts = state.arv * state.carryingCostsPercentage;
      var desiredProfit = state.arv * state.desiredProfitPercentage;

      console.log('closingCosts: ' + closingCosts);
      console.log('carryingCosts: ' + carryingCosts);
      console.log('desiredProfit: ' + desiredProfit);

      var buyPrice =
        state.arv -
        state.rehabCost -
        closingCosts -
        carryingCosts -
        desiredProfit;

      console.log('buyPrice: ' + buyPrice);
      console.log('rehabCost: ' + state.rehabCost);
      console.log('wholesaleFee: ' + state.wholesaleFee);

      var offer = buyPrice + state.wholesaleFee;

      console.log('offer: ' + offer);

      return {
        ...state,
        closingCosts: closingCosts,
        carryingCosts: carryingCosts,
        desiredProfit: desiredProfit,
        offer: offer,
        buyPrice: buyPrice,
        arv: state.arv,
        rehabCost: state.rehabCost,
        wholesaleFee: state.wholesaleFee,
      };

    case 'SELECTED_RECORDING':
      //console.log("SELECTED_RECORDING " + action.btn + " " + action.selectedStatus);

      return {
        ...state,
        //recordBtnStatus: "STOP RECORDING",
        recordBtnStatus: action.selectedStatus,
        recordBtn: action.btn,
      };

    case 'SELECTED_PLAY':
      //console.log("SELECTED_RECORDING");

      return {
        ...state,
        //recordBtnStatus: "STOP RECORDING",
        playBtnStatus: action.selectedStatus,
      };

    case 'RECORD_VOICE':
      console.log('hello');

      return {
        ...state,
      };

    case 'SELECTED_PERSON':
      return {
        ...state,
        detailView: true,
        personSelected: action.selectId,
      };

    case 'SELECTED_VIEW_ACCOUNT':
      console.log('SELECTED_VIEW_ACCOUNT: ' + action.state);

      if (action.state == 1) {
        viewAccountView = true;
        viewEditEmail = false;
        viewEditPassword = false;
        viewAddCard = false;
      } else if (action.state == 2) {
        //viewAccountView = false;
        viewEditEmail = true;
        viewEditPassword = false;
        viewAddCard = false;
      } else if (action.state == 3) {
        //viewAccountView = false;
        viewEditEmail = false;
        viewEditPassword = true;
        viewAddCard = false;
      } else if (action.state == 4) {
        //viewAccountView = false;
        viewEditEmail = false;
        viewEditPassword = false;
        viewAddCard = true;
      } else {
        viewAccountView = false;
        viewEditEmail = false;
        viewEditPassword = false;
        viewAddCard = false;
      }

      return {
        ...state,
        viewAccountView: viewAccountView,
        viewEditEmail: viewEditEmail,
        viewEditPassword: viewEditPassword,
        viewAddCard: viewAddCard,
      };

    case 'SELECTED_CONTRACT':
      console.log(
        'selectedContract: ' +
          action.selectedContract.assigner +
          ' ' +
          action.contractDetailsView,
      );

      return {
        ...state,
        contractDetailsView: true,
        selectedContract: action.selectedContract,
      };

    case 'SELECTED_HOME':
      return {
        ...state,
        homeView: true,
        contractsView: false,
        settingsView: false,
      };

    case 'SELECTED_CONTRACTS':
      return {
        ...state,
        homeView: false,
        contractsView: true,
        settingsView: false,
      };

    case 'SELECTED_SETTINGS':
      return {
        ...state,
        homeView: false,
        contractsView: false,
        settingsView: true,
      };

    case 'SELECTED_PHASE':
      return {
        ...state,
        homeView: false,
        phaseView: true,
        maxView: false,
      };

    case 'SELECTED_PHASE_TXT':
      return {
        ...state,
        phasePicker: true,
        weekPicker: false,
      };

    case 'SELECTED_WEEK_TXT':
      return {
        ...state,
        phasePicker: false,
        weekPicker: true,
      };

    case 'SELECTED_PHASE_OPTION':
      return {
        ...state,
        phasePicker: false,
        weekPicker: false,
        phase: action.selectedPhase,
        phaseIndex: action.selectedPhaseIndex,
      };

    case 'PLAY_ENABLED':
      return {
        ...state,
        playColor: 'rgb(123,237,141)',
        hasFile: true,
        playBtn: action.btn,
      };

    case 'PLAY_CONTRACT_ENABLED':
      return {
        ...state,
        playContractColor: 'rgb(123,237,141)',
        hasFile: true,
      };

    case 'SELECTED_WEEK_OPTION':
      return {
        ...state,
        phasePicker: false,
        weekPicker: false,
        week: 'Week ' + action.selectedWeek,
        weekIndex: action.selectedWeekIndex,
      };

    case 'UDPATE_DESTINATIONS':
      console.log('UDPATE_DESTINATIONS');

      return {
        ...state,
      };

    case 'UPDATE_SOURCE_INDEX':
      return {
        ...state,
        sourceIndex: action.selectedSourceIndex,
        source: action.selectedSource,
        destinationIndex: action.selectedDestinationIndex,
        destination: action.selectedDestination,
      };

    case 'UPDATE_DESTINATION_INDEX':
      return {
        ...state,
        destinationIndex: action.selectedDestinationIndex,
        destination: action.selectedDestination,
      };

    case 'SELECTED_SOURCE_OPTION':
      console.log('SELECTED_SOURCE_OPTION');
      console.log('selectedSource ' + action.selectedSource);
      console.log('selectedDestination ' + action.selectedDestination);
      console.log('selectedSourceId ' + action.selectedSourceId);

      //Randall TO DO: loop through available destinatoins for selectedSourceID and update destination options picker

      // if((action.selectedSource != null && action.selectedDestination != null) && action.selectedSource != action.selectedDestination)
      // {
      //     recordColor = "gold"
      // }
      // else
      // {
      //     recordColor = "gray"
      // }

      return {
        ...state,
        phasePicker: false,
        weekPicker: false,
        source: action.selectedSource,
        sourceIndex: action.selectedSourceIndex,
        sourceId: action.selectedSourceId,
        recordColor: 'rgb(160,160,160)',
      };
    case 'SELECTED_DESTINATION_OPTION':
      if (
        action.selectedSource != null &&
        action.selectedDestination != null &&
        action.selectedSource != action.selectedDestination
      ) {
        recordColor = 'rgb(123,237,141)';
      } else {
        recordColor = 'rgb(160,160,160)';
      }

      return {
        ...state,
        phasePicker: false,
        weekPicker: false,
        destination: action.selectedDestination,
        destinationIndex: action.selectedDestinationIndex,
        recordColor: recordColor,
      };

    case 'NONE_CONTRACT_SELECTED':
      return {
        ...state,
        contractDetailsView: false,
        selectedContract: null,
      };

    case 'ACCOUNTS_FETCH':
      return {
        ...state,
        accounts: action.payload,
      };

    case 'DESTINATIONS_FETCH':
      var arr = [];
      var arr2 = [];
      var arr3 = [];
      action.payload.map(obj => {
        arr.push(obj.modelname);
        arr2.push(obj.optionid);
        arr3.push(obj.translationcode);
      });

      // console.log("destination arr: " + JSON.stringify(arr));
      // console.log("destination codes arr: " + JSON.stringify(arr3));

      return {
        ...state,
        sttDestinations: arr,
        sttDestinationIDs: arr2,
        translationCodes: arr3,
        destinationIndex: 0,
      };

    case 'SOURCES_FETCH':
      var arr = [];
      var arr2 = [];
      var arr3 = [];
      action.payload.map(obj => {
        arr.push(obj.modelname);
        arr2.push(obj.optionid);
        arr3.push(obj.code);
      });

      // console.log("arr: " + JSON.stringify(arr));
      // console.log("sourceCodes: " + JSON.stringify(arr3));

      return {
        ...state,
        sttSources: arr,
        sttIDs: arr2,
        sttCodes: arr3,
      };

    case 'MAX_UPDATED':
      return {
        ...state,
        maxUpdated: true,
      };

    case 'EMAIL_UPDATED':
      return {
        ...state,
        maxUpdated: true,
      };

    case 'PASSWORD_UPDATED':
      return {
        ...state,
        maxUpdated: true,
      };

    case 'SHOW_RECORDER':
      return {
        ...state,
        recordView: action.payload,
      };

    case 'WEEK_FETCH':
      var arr = [];
      action.payload.map(obj => {
        if (obj.header) {
          arr.push(action.payload.indexOf(obj));
        }
      });
      arr.push(0);

      return {
        ...state,
        lifts: action.payload,
        stickyHeaderIndices: arr,
      };

    // case 'CONTRACTS_FETCH':
    //   console.log('CONTRACTS_FETCH');

    //   var arr = [];
    //   action.payload.map(obj => {
    //     if (obj.header) {
    //       arr.push(action.payload.indexOf(obj));
    //     }
    //   });
    //   arr.push(0);

    //   return {
    //     ...state,
    //     translations: action.payload,
    //     translationsHeaderIndices: arr,
    //   };

    case 'CONTRACTS_FETCH':
      console.log('CONTRACTS_FETCH');

      var arr = [];
      action.payload.map(obj => {
        if (obj.header) {
          arr.push(action.payload.indexOf(obj));
        }
      });
      arr.push(0);

      return {
        ...state,
        contracts: action.payload,
        contractsHeaderIndices: arr,
      };

    case 'SELECTED_ACCOUNT':
      return {
        ...state,
        accountDetailView: true,
        accountSelected: action.selectId,
      };

    case 'NONE_ACCOUNT_SELECTED':
      return {
        ...state,
        accountDetailView: false,
        accountSelected: null,
      };

    case 'TRANSACTIONS_FETCH':
      return {
        ...state,
        transactions: action.payload,
      };

    case 'MESSAGES_FETCH':
      return {
        ...state,
        messages: action.payload,
      };

    case 'SELECTED_STATEMENT':
      return {
        ...state,
        statementsDetailView: true,
        statementSelected: action.selectId,
      };

    case 'NONE_STATEMENT_SELECTED':
      return {
        ...state,
        statementsDetailView: false,
        statementSelected: null,
      };

    case 'FORM_UPDATE':
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };

    case 'NEW_CONTACT':
      return {
        ...state,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        company: '',
        project: '',
        notes: '',
      };

    case 'NEW_MESSAGE':
      return {
        ...state,
        message: '',
        senderID: '',
      };

    case 'ADD_PERSON':
      return {
        ...state,
        ...action.newPerson,
      };

    case 'UPDATE_CONTACT':
      return {
        ...state,
        toUpdate: true,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phone: action.payload.phone,
        email: action.payload.email,
        company: action.payload.company,
        project: action.payload.project,
        notes: action.payload.notes,
        _id: action.payload._id,
      };

    case 'SAVE_CONTACT':
      return {
        ...state,
        toUpdate: false,
        detailView: false,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        company: '',
        project: '',
        notes: '',
        _id: '',
      };

    case 'DELETE_CONTACT':
      return {
        ...state,
        detailView: false,
        personSelected: null,
      };

    default:
      return state;
  }
};
