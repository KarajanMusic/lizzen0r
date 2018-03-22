pragma solidity ^0.4.18;

contract lizzenz0r {

    address private owner;

    bytes12[] isrcs;

    struct License {
        uint userId;
        bytes12 isrc;
        uint start;
        uint end;
    }

    // licenseId => license
    mapping(uint => License) issuedLicenses;

    // userId => licenseId
    mapping(uint => uint) userLicenses;

    // videoId => licenseId
    mapping(string => uint) videoRegistrations;

    uint numIssuedLicenses;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function lizzenz0r(address owner_) public {
        owner = owner_;
    }

    function setISRCs(bytes12[] isrcs_) public onlyOwner {
        isrcs = isrcs_;
    }

    function registerLicensePurchase(uint userId, bytes12 isrc, uint startTime, uint endTime) public onlyOwner returns (uint licenseId) {
        require(endTime > startTime);

        licenseId = numIssuedLicenses++;
        issuedLicenses[licenseId] = License(userId, isrc, startTime, endTime);
        userLicenses[userId] = licenseId;
    }

    function registerVideo(string ytId, uint licenseId, uint userId) public onlyOwner {
        require(userLicenses[userId] != 0); // ensure user has a license

        videoRegistrations[ytId] = licenseId;
    }

    function getUserLicenseId(uint userId) public constant returns (uint) {
        require(userLicenses[userId] != 0);

        return userLicenses[userId];
    }

    function getLicenseOnVideo(string ytId) public constant returns (uint userId, bytes12 isrc, uint start, uint end) {
        require(videoRegistrations[ytId] != 0);

        userId = issuedLicenses[videoRegistrations[ytId]].userId;
        isrc = issuedLicenses[videoRegistrations[ytId]].isrc;
        start = issuedLicenses[videoRegistrations[ytId]].start;
        end = issuedLicenses[videoRegistrations[ytId]].end;    
    }

    function getISRCs() public constant returns (bytes12[]) {
        return isrcs;
    }

}