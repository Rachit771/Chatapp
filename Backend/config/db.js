const mongoose=require('mongoose');
const DB='mongodb+srv://sharmarachit554_db_user:VQto3C7C1YTWVC1N@rachitdb.mxslh19.mongodb.net/Chatapp?retryWrites=true&w=majority&appName=Rachitdb';
mongoose.connect(DB).then(()=> console.log('Db connected')).catch(()=>console.log('Error while connecting'))
