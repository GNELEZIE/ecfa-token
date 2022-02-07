//  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//  const myurls  = Env.get('URL_WEB')

const axios = require("axios").default;
import Env from '@ioc:Adonis/Core/Env'
const myurls  = Env.get('DOMAINE_URL')
 const API_BASE_URL = Env.get(`API_BASE_URL`);
const DOMAINE_URL = Env.get(`DOMAINE_URL`);
export default class RegistersController {
    public async register ({ view,session,response }){
        if (session.get('Users')){
            return  response.redirect('/wallette')
          }else{
            return view.render('pages.auth.register',{
              myurls:myurls
            })
          }
       
      }

      async registrationUsers({request,response}){
        const {firstname, lastname, country, phone, email, password} = request.body();
    
        var config = {
          method: "post",
          url: `${API_BASE_URL}/api/v1/user?isrectosent=false&isversosent=false&ispicturesent=false`,
          headers: {},
          data: {
            firstname:firstname,
            lastname:lastname,
            country:country,
            email:email,
            phone:phone,
            password:password,
          },
        };
        var result: any = {};
        try {
          result = await axios(config);
          console.log(result.data);
        } catch (error) {
          console.log("error");
          console.log('...........................................');
        }
    
        if(result.data){
          if(result.data.error){
            //afficher alerte d'erreur
            return response.send(result.data.error)
          }else {
            //afficher alerte de success
            return  response.send(200)
          }
        }else {
          //afficher alerte d'erreur
         
          return response.send(501)
          
        }
      }
}
 