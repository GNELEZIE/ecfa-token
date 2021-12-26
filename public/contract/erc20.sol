pragma solidity ^0.5.16;

// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
//
// ----------------------------------------------------------------------------
contract ERC20Interface {
    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address payable spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Burn(address indexed to, uint value);
}

// ----------------------------------------------------------------------------
// Safe Math Library
// ----------------------------------------------------------------------------
contract SafeMath {
    function safeAdd(uint a, uint b) public pure returns (uint c) {
        c =  a + b;
        require(c >= a);
    }
    
    function safeSub(uint a, uint b) public pure returns (uint c) {
      
        require(b <= a,'Le token envoyé ne peut etre retirer du compte de l utilisateur'); 
        c = a - b; 
        return c;
    }
    
    function safeMul(uint a, uint b) public pure returns (uint c) { 
            c = a * b; 
            require(a == 0 || c / a == b);
            
        }
            
    function safeDiv(uint a, uint b) public pure returns (uint c) {
                require(b > 0);
        c = a / b;
    }
}

contract Cryptopourlesnuls is ERC20Interface, SafeMath {
    string public name;
    string public symbol;
    uint8 public decimals; // 18 decimals is the strongly suggested default, avoid changing it
    uint public _totalSupply;
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    /**
     * Constrctor function
     *
     * Initializes contract with initial supply tokens to the creator of the contract
     */
    constructor() public {
        name = "Token ECFA";
        symbol = "ECFA";
        decimals = 18;
        _totalSupply = 1000000000000000000000000;
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function totalSupply() public view returns (uint) {
        
        return _totalSupply  - balances[address(0)];
    }
    
    function Name() public view returns (string memory) {
        return name;
    }
    
     function Decimals() public view returns (uint) {
        return decimals;
    }
    
     function Symbole() public view returns (string memory) {
        return symbol;
    }
    
    // Le solde de l'address cette vient du contract
    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }

// la function allowance permet de voir combien la personne est autorisé a transfer
    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }

//La function approve permet a l'administateur de donner la permission a
//une autre de faire des transction en spécifiant le montant qu'il peut transfer
    function approve(address payable spender, uint tokens)  public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

//Cette function permet à l'administrateur d'envoyer des tokens a d'autre personne
    function transfer(address to, uint tokens) public returns (bool success) {
        balances[msg.sender] = safeSub(balances[msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }

// Cette function permet a une personne qui été approve de Transfer des tokens a une autre personne
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        // require(to != address(0));
        // require(tokens <= balances[from],'Fond de from insuffisant');
        // require(tokens <= allowed[from][msg.sender],'Fond alloué trop petit');
        balances[from] = safeSub(balances[from], tokens);
        allowed[from][msg.sender] = safeSub(allowed[from][msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(from, to, tokens);
        return true;
        
    }
    
        function burn(uint256 _value) public { 
        _burn(msg.sender, _value); 
      }
        function _burn(address _to, uint256 _value) internal { 
        require(_value <= balances[_to]);
         balances[_to] =  safeSub(balances[_to], _value); 
        _totalSupply = safeSub(_totalSupply, _value);  
        emit Burn(_to, _value); 
        emit Transfer(_to, address(0), _value); 
      }
        
        
        function mint(uint256 _value) public { 
        _mint(msg.sender, _value); 
        }
       
     function _mint(address _to, uint256 value) internal {
       // require(msg.sender == owner, "If faut etre admin pour utiliser mintable !!!");    
        require(_to != address(0));
        _totalSupply = safeAdd(_totalSupply,value);
        balances[_to] =safeAdd(balances[_to], value);
        emit Transfer(address(0), _to, value);
    }
    
    


}