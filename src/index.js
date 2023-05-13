import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import {createStore,applyMiddleware} from 'redux'
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './redux/reducers/rootReducer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';


const firebaseConfig = {
  apiKey: "AIzaSyACyd5AJB2JgZRBX6Rpyjt37q-eh4w3sFI",
  authDomain: "resume-f7bfb.firebaseapp.com",
  projectId: "resume-f7bfb",
  storageBucket: "resume-f7bfb.appspot.com",
  messagingSenderId: "385150176671",
  appId: "1:385150176671:web:104e8f6c175e825be141aa"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore()

const reduxStore = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),reduxFirestore(firebase))) 



ReactDOM.render(

    <BrowserRouter>
   <Provider store={reduxStore}>
   <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={reduxStore.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <App />
      </ReactReduxFirebaseProvider>
   </Provider>
    </BrowserRouter>
,
  document.getElementById('root')
);