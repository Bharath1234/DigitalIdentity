// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import identity_artifacts from '../../build/contracts/Identity.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Id = contract(identity_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {

start: function(){

  var self = this;
    // Bootstrap the MetaCoin abstraction for Use.
    Id.setProvider(web3.currentProvider);

// Get the initial account balance so it can be displayed.
web3.eth.getAccounts(function(err, accs) {
  if (err != null) {
    alert("There was an error fetching your accounts.");
    return;
  }

  if (accs.length == 0) {
    alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
    return;
  }
  accounts = accs;
});
},

registerUser: function() {
  var self = this;

  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var password = document.getElementById("password").value;

    var meta;
  Id.deployed().then(function(instance) {
    alert(firstName);
    alert(lastName);
    alert(password);
    alert(accounts[0]);
    meta = instance;
   return  meta.registerUser(firstName,lastName,password,{from: accounts[0],gas:3000000});
    
  }).then(function() {
    alert("User Registered Successfully");
  }).catch(function(e) {
    console.log(e);
    alert("Error Registering User")
  //  self.setStatus("Error Registering User; see log.");
  });
},
registerIssuer: function() {
  var self = this;

  var issuerType = document.getElementById("issuerType").value;
  var issuerDescription = document.getElementById("issuerDescription").value;


    var meta;
  Id.deployed().then(function(instance) {
    alert(issuerType);
    alert(issuerDescription);

    alert(accounts[0]);
    meta = instance;
   return meta.registerIssuer(issuerType,issuerDescription,{from: accounts[0],gas:3000000});
    
  }).then(function() {
    alert("Issuer Registered Successfully");
  }).catch(function(e) {
    console.log(e);
    alert("Error Registering Issuer")
  //  self.setStatus("Error Registering User; see log.");
  });
},

registerUserIdentity: function() {
  var self = this;

  var idNumber = document.getElementById("idNumber").value;
  var idType = document.getElementById("idType").value;


    var meta;
  Id.deployed().then(function(instance) {
    alert(idNumber);
    alert(idType);

    alert(accounts[0]);
    meta = instance;
   return meta.registerUserIdentity(idNumber,idType,{from: accounts[0],gas:3000000});
    
  }).then(function() {
    alert("User Identity Registered Successfully");
  }).catch(function(e) {
    console.log(e);
    alert("Error Registering Issuer")
  //  self.setStatus("Error Registering User; see log.");
  });
},

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
});


