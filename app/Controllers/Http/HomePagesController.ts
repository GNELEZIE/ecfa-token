// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

const myurls  = Env.get('DOMAINE_URL')

export default class HomePagesController {
  
    public async home ({ view }){
        return view.render('pages.home',{
            myurls:myurls
        })
      }

      // public async test ({ view }){
      //   return view.render('pages/home',{
      //       myurls:myurls
      //   })
      // }

  
}
