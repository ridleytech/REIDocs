export const calculateOffer = (txt, val) => {
  // var percentageFields = ["closingCostsPercentage","carryingCostsPercentage","desiredProfitPercentage"]

  // var percentageFieldInd = state.percentageFields.toString().indexOf(txt);

  // if (percentageFieldInd != -1) {
  // }

  return {
    type: 'CALCULATE_OFFER',
    txt: txt,
    val: val,
  };
};

export const textText = () => {
  return 3;
};

export const clearField = (txt, l) => {
  return {
    type: 'CLEAR_FIELD',
    txt: txt,
  };
};

export const selectHome = () => {
  return {
    type: 'SELECTED_HOME',
  };
};

export const selectTranslations = () => {
  return {
    type: 'SELECTED_TRANSLATIONS',
  };
};

export const selectViewContracts = () => {
  return {
    type: 'SELECTED_CONTRACTS',
  };
};

export const selectSettings = () => {
  return {
    type: 'SELECTED_SETTINGS',
  };
};

export const selectPhase = () => {
  //console.log("selectPhase");

  return {
    type: 'SELECTED_PHASE',
  };
};

export const selectPhaseText = () => {
  //console.log("selectPhaseText");
  return {
    type: 'SELECTED_PHASE_TXT',
  };
};

export const managePlay = btn => {
  //console.log("selectPhaseText");
  return {
    type: 'PLAY_ENABLED',
    btn: btn,
  };
};

export const enableTranslationPlay = () => {
  //console.log("selectPhaseText");
  return {
    type: 'PLAY_TRANSLATION_ENABLED',
  };
};

export const selectWeekText = () => {
  //console.log("selectWeekText");
  return {
    type: 'SELECTED_WEEK_TXT',
  };
};

export const selectTranslation = (translation, val) => {
  console.log('selectTranslation');

  return {
    type: 'SELECTED_TRANSLATION',
    selectedTranslation: translation,
    contractDetailsView: val,
  };
};

export const viewAccount = val => {
  console.log('viewAccount');

  return {
    type: 'SELECTED_VIEW_ACCOUNT',
    state: val,
  };
};

export const doneSelectPhase = (phase, index) => {
  return {
    type: 'SELECTED_PHASE_OPTION',
    selectedPhase: phase,
    selectedPhaseIndex: index,
  };
};

export const doneSelectWeek = (week, index) => {
  //console.log("doneSelectWeek");

  return {
    type: 'SELECTED_WEEK_OPTION',
    selectedWeek: week,
    selectedWeekIndex: index,
  };
};

export const updateSourceIndex = (value, index) => {
  return {
    type: 'UPDATE_SOURCE_INDEX',
    selectedSourceIndex: index,
    selectedSource: value,
    selectedDestinationIndex: 0,
    selectedDestination: 'Select translation',
  };
};

export const updateDestinationIndex = (value, index) => {
  return {
    type: 'UPDATE_DESTINATION_INDEX',
    selectedDestinationIndex: index,
    selectedDestination: value,
  };
};

export const doneSelectSource = (source, index, destination, sourceID) => {
  console.log('doneSelectPhaseWeek');

  if (!source) {
    source = 'English';
    selectedSourceIndex = 0;
    selectedSourceId = 6;
  }

  return {
    type: 'SELECTED_SOURCE_OPTION',
    selectedSource: source,
    selectedDestination: destination,
    selectedSourceIndex: index,
    selectedSourceId: sourceID,
  };
};

export const doneSelectDestination = (
  destination,
  index,
  source,
  translationCode,
) => {
  //console.log("doneSelectPhaseWeek");

  return {
    type: 'SELECTED_DESTINATION_OPTION',
    selectedDestination: destination,
    selectedSource: source,
    selectedDestinationIndex: index,
    selectedTranslationCode: translationCode,
  };
};

export const recordingSelected = (status, btn) => {
  return {
    type: 'SELECTED_RECORDING',
    selectedStatus: status,
    btn: btn,
  };
};

export const playSelected = status => {
  return {
    type: 'SELECTED_PLAY',
    selectedStatus: status,
  };
};

export const selectPerson = peopleId => {
  return {
    type: 'SELECTED_PERSON',
    selectId: peopleId,
  };
};

export const noneContractSelected = () => {
  console.log('noneContractSelected');
  return {
    type: 'NONE_CONTRACT_SELECTED',
  };
};

export const recordVoice = () => {
  console.log('recordVoice');
  return {
    type: 'RECORD_VOICE',
  };
};

export const showRecorder = value => {
  console.log('showRecorder');

  return {
    type: 'SHOW_RECORDER',

    payload: value,
  };
};

export const formUpdate = ({prop, value}) => {
  console.log(prop + ': ' + value);

  return {
    type: 'FORM_UPDATE',
    payload: {prop, value},
  };
};

export const selectContract = contract => {
  console.log('contract: ' + contract.assigner);

  return {
    type: 'SELECTED_CONTRACT',
    contractDetailsView: true,
    selectedContract: contract,
  };
};

export const updateDestinations = (sourceID, url) => {
  //console.log("updateDestinations: "+sourceID);

  return dispatch => {
    fetch(url + 'getSourceDestinations.php?sourceID=' + sourceID)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({type: 'DESTINATIONS_FETCH', payload: data});
      })
      .catch(error => console.log(error));
  };
};

export const getLanguages = url => {
  console.log(url + 'getLanguagesJSON.php');

  return dispatch => {
    fetch(url + 'getLanguagesJSON.php')
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({type: 'SOURCES_FETCH', payload: data});
      })
      .catch(error => console.log(error));
  };
};

export const getContracts = (uid, url) => {
  var urlStr = url + 'get-contracts.php?uid=' + uid;

  console.log('getContracts: ' + urlStr);

  return dispatch => {
    fetch(urlStr)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({type: 'CONTRACTS_FETCH', payload: data});
      })
      .catch(error => console.log(error));
  };
};

export const getSourceDestinations = () => {
  return dispatch => {
    fetch(url + 'getLanguagesJSON.php')
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({type: 'SOURCES_FETCH', payload: data});
      })
      .catch(error => console.log(error));
  };
};

export const sendContract = ({
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
}) => {
  console.log('send contract: ' + assigner);

  //var url = '';

  // console.log(
  //   'send contract: ' +
  //     assigner +
  //     assignee +
  //     propertyAddress +
  //     cityStateZip +
  //     legalDescription +
  //     purchasePrice +
  //     earnestMoney +
  //     contractDate +
  //     recipientEmail +
  //     digitalSignature +
  //     pdfSignature,
  // );

  return dispatch => {
    fetch(url + 'send-contract.php', {
      method: 'POST',
      body: JSON.stringify({
        assigner: assigner,
        assignee: assignee,
        propertyAddress: propertyAddress,
        cityStateZip: cityStateZip,
        legalDescription: legalDescription,
        purchasePrice: purchasePrice,
        earnestMoney: earnestMoney,
        contractDate: contractDate,
        recipientEmail: recipientEmail,
        digitalSignature: digitalSignature,
        pdfSignature: pdfSignature,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.text())
      .then(responseData => {
        console.log('response: ' + responseData);
      })
      .then(data => {
        dispatch({type: 'CONTRACT_SENT', payload: data});
      })
      .catch(error => console.log('error: ' + error));
  };
};

export const createNewContact = ({
  firstName,
  lastName,
  phone,
  email,
  company,
  project,
  notes,
}) => {
  return dispatch => {
    fetch('http://192.168.2.19:3000/contact', {
      method: 'POST',
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        company: company,
        project: project,
        notes: notes,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => console.log(response))
      .then(() => {
        dispatch({type: 'NEW_CONTACT'});
      })
      .catch(error => console.log(error));
  };
};

export const loadInitialContacts = () => {
  return dispatch => {
    fetch('http://localhost:8888/ridtech/bankbot/react/')
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({type: 'INITIAL_FETCH', payload: data});
      })
      .catch(error => console.log(error));
  };
};

export const loadAccounts = () => {
  return dispatch => {
    fetch('http://localhost:8888/ridtech/bankbot/react/accounts.php')
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({type: 'ACCOUNTS_FETCH', payload: data});
      })
      .catch(error => console.log(error));
  };
};

export const loadMessages = () => {
  return dispatch => {
    fetch('http://localhost:8888/ridtech/bankbot/react/messages.php?userID=1')
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({type: 'MESSAGES_FETCH', payload: data});
      })
      .catch(error => console.log(error));
  };
};

export const createMessage = ({message, senderID}) => {
  return dispatch => {
    fetch('http://localhost:8888/ridtech/bankbot/react/sendMessage.php', {
      method: 'POST',
      body: JSON.stringify({
        message: message,
        senderID: senderID,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => console.log(response))
      .then(() => {
        dispatch({type: 'NEW_MESSAGE'});
      })
      .catch(error => console.log(error));
  };
};

export const deleteContact = id => {
  return dispatch => {
    fetch(`http://192.168.2.19:3000/contact/${id}`, {method: 'DELETE'}).then(
      () => {
        dispatch({type: 'DELETE_CONTACT'});
      },
    );
  };
};

export const updateContact = person => {
  return {
    type: 'UPDATE_CONTACT',
    payload: person,
  };
};

export const saveContact = ({
  firstName,
  lastName,
  phone,
  email,
  company,
  project,
  notes,
  _id,
}) => {
  return dispatch => {
    fetch(`http://192.168.2.19:3000/contact/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        company: company,
        project: project,
        notes: notes,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => console.log(response))
      .then(() => {
        dispatch({type: 'SAVE_CONTACT'});
      })
      .catch(error => console.log(error));
  };
};

export const updateMax = ({amount, _exerciseid}) => {
  return dispatch => {
    fetch(`http://localhost:8888/ridtech/bankbot/react/updateMax.php`, {
      method: 'PUT',
      body: JSON.stringify({
        amount: amount,
        exerciseid: _exerciseid,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => console.log(response))
      .then(() => {
        dispatch({type: 'MAX_UPDATED'});
      })
      .catch(error => console.log(error));
  };
};

export const updateEmail = ({email, _userid}) => {
  return dispatch => {
    fetch(url + `updateEmail.php`, {
      method: 'PUT',
      body: JSON.stringify({
        email: email,
        userid: _userid,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => console.log(response))
      .then(() => {
        dispatch({type: 'EMAIL_UPDATED'});
      })
      .catch(error => console.log(error));
  };
};

export const updatePassword = ({password, _userid}) => {
  return dispatch => {
    fetch(url + `updatePassword.php`, {
      method: 'PUT',
      body: JSON.stringify({
        password: password,
        userid: _userid,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => console.log(response))
      .then(() => {
        dispatch({type: 'PASSWORD_UPDATED'});
      })
      .catch(error => console.log(error));
  };
};
