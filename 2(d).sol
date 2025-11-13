pragma solidity >=0.5.1 <0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.1/contracts/math/SafeMath.sol";

contract FlawedVoting {
    using SafeMath for uint256;
    
    mapping(address => uint256) public remainingVotes;
    uint256[] public candidates;
    address owner;
    bool hasEnded = false;

    // ... (constructor and other functions unchanged)

    function vote(uint256 _candidateID, uint256 _amountOfVotes) public notEnded {
        require(_candidateID < candidates.length);
        require(remainingVotes[msg.sender] >= _amountOfVotes); // sufficient check
        remainingVotes[msg.sender] = remainingVotes[msg.sender].sub(_amountOfVotes);
        candidates[_candidateID] = candidates[_candidateID].add(_amountOfVotes);
    }

    // ... (other functions unchanged)
}