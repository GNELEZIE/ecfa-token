// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const axios = require("axios").default;
import Env from '@ioc:Adonis/Core/Env'
const myurls  = Env.get('DOMAINE_URL')
 const API_BASE_URL = Env.get(`API_BASE_URL`);
const DOMAINE_URL = Env.get(`DOMAINE_URL`);
export default class LoginController {
    public async login ({ view,session,response }){
        if (session.get('Users')){

            return  response.redirect('/')
            
          }else{
            return view.render('pages.auth.login',{
                myurls:myurls
            })
          }
        
      }

      async authUser({ request ,session,response}) {
        const { email, password } = request.body();
        var config = {
          method: "post",
          url: `${API_BASE_URL}/api/v1/auth/login`,
          headers: {},
          data: {
            email,
            password,
          },
        };
        var result: any = {};
        try {
          result = await axios(config);
          console.log(result.data);
        } catch (error) {
          console.log("error");
          console.log(error);
        }
    
        // return {
        //   error: false,
        //   result: result.data,
        // };
    
        if(result.data){
          if(result.data.error){
            //afficher alerte d'erreur
            return response.send(result.data.error)
          }else {
            //afficher alerte de success
            session.put('Users',result.data.user[0])
            session.put('Token',result.data.token)
            session.get('Token')
           // console.log(session.get('InfosUsers'))
            return  response.send(200)
            //return view.render("auth/profile", success{data : result.data, user : result.data.user[0], token : result.data.token , isauth : true} );
          }
        }else {
          //afficher alerte d'erreur
          return response.send(504) //return view.render("auth/login", {data : {}, user : {}, token : {} , auth : false} );
        }
      }

        // @ts-ignore
  async logout({session, response}){
    var config = {
      method: "post",
      url: `${API_BASE_URL}/api/v1/auth/logout`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ session.get('Token').token
      },
    };
    var result: any = {};
    try {
      result = await axios(config);
      console.log(result.data);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
    if (result){
      session.clear('Users')
      return response.redirect('/')
    }else {

    }
  }
}
