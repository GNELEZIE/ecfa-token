// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

const myurls  = Env.get('URL_WEB')

export default class HomePagesController {
  
    public async home ({ view }){
        return view.render('welcome',{
            myurls:myurls
        })
      }
}
