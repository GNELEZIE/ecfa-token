// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const axios = require("axios").default;
import Env from '@ioc:Adonis/Core/Env'
const myurls  = Env.get('DOMAINE_URL')
 const API_BASE_URL = Env.get(`API_BASE_URL`);
const DOMAINE_URL = Env.get(`DOMAINE_URL`);
export default class AchahsController {
 public async achat({view,session,response}){
if(session.get('Users')){
    return view.render('pages.achat.achat',{
        myurls:myurls
    })
}else{
return  response.redirect('/login',{
    myurls:myurls
})
}
}



}
