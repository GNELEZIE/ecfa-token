"use strict";
var myContract ;
var isloading = false
var tokenAdress = null
var accounts = [];

$(document).ready(async function () {


//  alert('ok');
  //OBENTIR LES COMPTES DU WALLET DE L'UTILISATEUR
  async function _getAccounts() {
    try {
      const _result = ethereum.request({ method: 'eth_requestAccounts' });
      console.log(_result);
      const _accounts = await web3.eth.getAccounts()

      for (const account of _accounts) {
        const balanceWei = await web3.eth.getBalance(account)
        const balance = web3.utils.fromWei(balanceWei)
        accounts.push({
          account,
          balance,
        });
      }
     

    //  $("#_adress").text( accounts[0].account + " - ::::: - " +  accounts[0].balance + " eth") ;
     // $("#_totalSuply").text( balances[address(0)] + " eth") ;

      return {
         error: false, account: accounts[0].account, balance: accounts[0].balance
        }
    } catch (error) {
      // User denied account access...
      console.log('error getAccounts')
      console.log(error)
      return { error: true, error: error }
    }
  }
// CHECKER SI METAMASK EST BIEN INTSALLER
if (typeof window.ethereum !== 'undefined') {
//we use eth_accounts because it returns a list of addresses owned by us.
const accounts = await ethereum.request({ method: 'eth_accounts' });


}else{
   alert('MetaMask is not installed!');
}

  // CHECKER SI METAMASK EST BIEN INTSALLER
  async function CheckMetamaskConnection() {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      
      try {
        // Request account access if needed
        // await ethereum.enable(); //depreciated
        // Acccounts now exposed
        
        return true
      } catch (error) {
        // User denied account access...
        return false
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider)
      getAccounts();
      // Acccounts always exposed
      return true
    }
    // Non-dapp browsers...
    else {
      // console.log('not found CheckMetamaskConnection')
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
      return false
    }
  }
  // INTERCONNEXION A NOTRE SMART CONTRACT
  async function connectSmartContract() {

    var IsMetamask = await CheckMetamaskConnection();

    if (IsMetamask) {
      try {
        myContract = await new web3.eth.Contract(
          TokenABI,
          TokenADRESSE,
          {
            data: ByteCODE, //optional
          },
        );

        //----------ECOUTE DES EVENEMENTS ----------------
        await myContract.events
        .Transfer(async function (err, event) {
          //des actions
          if(err){
            alert(err)
          }

          $('#transfert').attr('disabled', false);
          $('#receiver').val('');
          $('#tokens').val('')
          $('#proprio').val('');
          alert("transferer avec succès");
          console.log(event)
        });

          await myContract.events
        .Burn(async function (err, event) {
          //des actions
          if(err){
            alert(err)
          }
         
          console.log(event)
        });

        await myContract.events
        .Approval(async function (err, event) {
          //des actions
          if(err){
            alert(err)
          }
          $('#approves').val('');
          ($('#mont').val(''));
          alert("Compte a été approuvé avec succès !!!");
          console.log(event)
        });
         const decimals = await myContract.methods.Decimals().call()
             .then(receipt =>{
              decim.innerHTML = receipt;
      }).catch(error =>{
           console.log(error)
       });

      const soldes = await myContract.methods.totalSupply().call()
    .then(receipt =>{
      solde.innerHTML = receipt;
    }).catch(error =>{
      alert(error);
        console.log(error);
    })
   
        const names = await myContract.methods.Symbole().call()
            .then(receipt =>{
              symb.innerHTML = receipt;
    }).catch(error =>{
            console.log(error);
        })

      } catch (error) {
        // console.log(error);
        console.log(error);
        return;
      }

    }else {
      console.log("Vous devez installer metamask")
    }
  }




  // BOUTON DE CONNEXION AU COMPTE
  $('#minBurn').hide();
  $('#btnAction').hide();
  // $('#buyBNB').hide();
  $('#test').on('click', async function () {
    $('#btn_connect').hide();
    $('#connexMetamask').hide();
    $('#openSwal').hide();
    $('#minBurn').show();
    $('#btnAction').show();
    $('#buyBNB').show();
    var result = await _getAccounts()
    console.log(result)
    if (result.error) {
      $('#btn_connect').show();
      alert("Une erreur est survenue au moment de l'obtention des infos de votre compte !");
      return
    }
    //Recuper les ECFA de l'adresse connecté
     myContract.methods.balanceOf(accounts[0].account).call()
    .then(receipt =>{
      ecfas.innerHTML = receipt;
      console.log(receipt);
    }).catch(error =>{ 
        console.log(error);
    })
    
  })

  $(window).on('load',async function(){
//     Swal.fire({
//         title: 'Voulez vous vous connecter sur metamask ?',
//         icon: 'info',
//         showCancelButton: true,
//         confirmButtonColor: '#1ed674',
//         cancelButtonColor: '#d33',
//         cancelButtonText: 'Annuler',
//         confirmButtonClass: "btn-danger",
//         confirmButtonText: 'Se connecter',
//     }).then((result) => {
//         if (result.isConfirmed) {
//          var connex = await _getAccounts();
//          if(connex){
//              Swal.fire(
//             'Connecté!',
//             'Vous êtes connecté avec success sur metamask.',
//             'success'
//         )
//          }
      
        
//     }
// })
});


  //la focntion de transfert
  $('#transferts').on("click", async function _tranfert (){
    $('#transferts').attr('disabled', true);
    var receiver = $('#receivers').val();
    var tokens  = parseInt($('#token').val());
    console.log(tokens);
    console.log(receiver);
    console.log(receiver, tokens);
    const _result = await myContract.methods.transfer(receiver, tokens).send({from: accounts[0].account});
    console.log(_result);
    if(_result){
    $('#receivers').val('');
    ($('#token').val(''));
      $('#transferts').attr('disabled', false);
    }
    
  })
  
// Fonction Mintable
$('#mintable').on("click", async function _min (){
    $('#mintable').attr('disabled', true);
    var mintab  = parseInt($('#mint').val());
    console.log(mintab);
    //console.log(receiver, tokens);
    const _result = await myContract.methods.mint(mintab).send({from: accounts[0].account});
    //{from: accounts[0].account}
    console.log(_result);
    if(_result){
      $('#mint').val('');
        $('#mintable').attr('disabled', false);
        
    }

})
// Acheter avec du BNB
$('#valid').on("click", async function _valid (){
  $('#bybnb').attr('disabled', true);
  var bybnb  = parseInt($('#bybnb').val());
  console.log(bybnb);
  //console.log(receiver, tokens);
  const _result = await myContract.methods.mint(bybnb).send({from: accounts[0].account});
  //{from: accounts[0].account}
  console.log(_result);
  if(_result){
    $('#bybnb').val('');
      $('#valid').attr('disabled', false);
      
  }

})



// Fonction Burnable
$('#burnable').on("click", async function _min (){
    $('#burnable').attr('disabled', true);
    var burnb  = parseInt($('#burn').val());
    console.log(burnb);
    //console.log(receiver, tokens);
    const _result = await myContract.methods.burn(burnb).send({from: accounts[0].account});
    //{from: accounts[0].account}
    console.log(_result);
    if(_result){
        $('#burn').val('');
        $('#burnable').attr('disabled', false);
    }

})
// Fonction transferFrom
$('#transfertFrom').on("click", async function _transferFrom (){
    $('#transfertFrom').attr('disabled', true);
    var proprio  = $('#proprio').val();
    var receiver  = $('#receiver').val();
    var tokens  = parseInt($('#tokens').val());
    console.log(proprio);
    console.log(receiver);
    console.log(tokens);
    const _result = await myContract.methods.transferFrom(proprio, receiver, tokens).send({from:proprio});
    console.log(_result);
    if(_result){
        $('#transfertFrom').attr('disabled', false);
    }else{
      console.log(error);
    }

})

// Fonction approve
$('#approuver').on("click", async function _approved (){
  $('#approuver').attr('disabled', true);
  var approves  = $('#approves').val();
  var mont  = parseInt($('#mont').val());
  console.log(approves);
  console.log(mont);
  const _result = await myContract.methods.approve(approves, mont).send({from:accounts[0].account});
  if(_result){
      $('#approuver').attr('disabled', false);
  }

})
  await connectSmartContract();
});



