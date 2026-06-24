const mongoose=require('mongoose');
const ChatSchema=mongoose.Schema({
  chatName:{type:String, trim:true},
  isGroup:{type:Boolean ,default:false},
  users:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
  groupAdmin:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
  latestMessage:{type:mongoose.Schema.Types.ObjectId,ref:"Message"},
  chatAvatar: {
      type: String,
      default:
        "https://icon-library.com/images/group-chat-icon/group-chat-icon-14.jpg",
    },
},
{timestamps:true}
)

const Chat=mongoose.model('Chat',ChatSchema);
module.exports=Chat;