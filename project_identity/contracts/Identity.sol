pragma solidity ^0.4.18;

import "./ConvertLib.sol";

contract Identity {
    
    struct identity {
bool active;
string idNumber;
string idType;
    }
    
    mapping(address => identity) public identities;
    
// Register User with FirstName, LastName and password    
    struct userIdentity {
string firstName;
string lastName;
string password;
bool active;
    }
    
        mapping(address => userIdentity) public users;

function registerUser(string _firstName, string _lastName, string _password) public returns (bool _bool){
       
        users[ msg.sender ] = userIdentity({
firstName: _firstName,
lastName: _lastName,
password: _password,
            active: true
        });
        return true;
    }

// Register Issuer with issuerType,issuerDescription    
    struct issuerIdentity {
string issuerType;
string issuerDescription;
bool active;
    }    
    
        mapping(address => issuerIdentity) public issuers;

function registerIssuer(string _issuerType, string _issuerDescription) public returns (bool _bool){
       
        issuers[ msg.sender ] = issuerIdentity({
issuerType: _issuerType,
issuerDescription: _issuerDescription,
            active: true
        });
        return true;
    }

    
    function registerUserIdentity( string _idNumber, string _idType) public returns (bool _bool){
       
        identities[ msg.sender ] = identity({
            active: true,
            idNumber: _idNumber,
            idType: _idType
        });
        return true;
    }
}