import connectToDB from "./DB"
import app from "./app"
import config from "./config"


try{
  connectToDB().then(()=>{
    

app.listen(config.port, () => {
    console.log(`Example app listening on config.port ${config.port}`)
  })
  


  })
}catch(err){
  console.log(err,'database connect failed');
}


