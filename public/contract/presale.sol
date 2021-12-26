pragma solidity ^0.5.16; 
 
contract presale{
    
     address public owner;

  /**
   * Ownable
   * @dev Ownable constructor sets the `owner` of the contract to sender
   */
  function Ownable() public {
    owner = msg.sender;
  }
    
     function buyTokens() public payable  {
    uint256 weiAmount = msg.value; // Calculate tokens to sell
    uint256 tokens = weiAmount.mul(RATE);
    
    emit BoughtTokens(msg.sender, tokens); // log event onto the blockchain
    raisedAmount = raisedAmount.add(msg.value); // Increment raised amount
    token.transfer(msg.sender, tokens); // Send tokens to buyer
    
    owner.transfer(msg.value);// Send money to owner
  }
}
