pragma solidity ^0.4.21;

contract lizzenz0r {
    enum licenseTemplate {Lizzenz0rSoundSupplyLicense} // contains licensenames
    string[] ISRCs // contains all available Songs by ISRC






    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public constant returns (uint) {
        return storedData;
    }



}