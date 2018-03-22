pragma solidity ^0.4.18;

contract lizzenz0r {

    address private owner;

    enum licenseTemplate {Lizzenz0rSoundSupplyLicense} // contains licensenames
    bytes24[] isrcs; // contains all available Songs by ISRC

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function lizzenz0r(address owner_) public {
        owner = owner_;
    }

    function addISRCs(bytes24[] _isrcs) public onlyOwner {
        isrcs = _isrcs;
    }

    function getISRCs() public returns (bytes24[]) {
        return isrcs;
    }

}