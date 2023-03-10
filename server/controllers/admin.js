const admin={email:'Admin',pass:'123'}

module.exports={
    adminLogin:(req,res)=>{
        console.log('here');
        const {email,password} =req.body;
        if(email==admin.email&&password==admin.pass){
            console.log('login sucess');
            res.status(200).json({msg:'login Sucess'})
        }else{
            if(email!==admin.email){
                return res.status(401).json({ msg: 'Invalid name', name:true, status: false });
            }else{
                return res.status(401).json({ msg: 'Invalid password',  password:true,status: false })
            }
        }
    }
}