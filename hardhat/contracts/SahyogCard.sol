// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract SahyogCard is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    // Mapping to store user's wallet address and the hashes of their diagnostic data
    mapping(address => string[]) private userData;

    // Mapping to store whether a user has chosen to share their data
    mapping(address => bool) private userSharingData;

    // Mapping to store user's age
    mapping(address => uint) private userAge;

    // Mapping to store user's gender
    mapping(address => string) private userGender;

    // Mapping to store user's name
    mapping(address => string) private userName;

    // Mapping to store user's phone number
    mapping(address => string) private userPhoneNumber;

    function initialize(address initialOwner) public initializer {
        __Pausable_init();
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    // Function to store the hash of diagnostic data for a user
    function storeUserData(string memory dataHash) public {
        userData[msg.sender].push(dataHash);
        userSharingData[msg.sender] = true;
    }

    // Function to store user's age, gender, name and phone number
    function storeUserDetails(
        uint age,
        string memory gender,
        string memory name,
        string memory phoneNumber
    ) public {
        userAge[msg.sender] = age;
        userGender[msg.sender] = gender;
        userName[msg.sender] = name;
        userPhoneNumber[msg.sender] = phoneNumber;
    }

    // Function to allow a user to stop sharing their data
    function stopSharingData() public {
        userSharingData[msg.sender] = false;
    }

    // Function to get the hashes of diagnostic data of a user
    function getUserRecords(
        address user
    ) public view returns (string[] memory) {
        require(
            userSharingData[user],
            "This user is not sharing their Medical Records."
        );
        return userData[user];
    }

    // Function to get the user's age, gender and name
    function getUserDetails(
        address user
    ) public view returns (uint, string memory, string memory, string memory) {
        return (
            userAge[user],
            userGender[user],
            userName[user],
            userPhoneNumber[user]
        );
    }

    // Function to allow a user to start sharing their data
    function startSharingData() public {
        userSharingData[msg.sender] = true;
    }
}
