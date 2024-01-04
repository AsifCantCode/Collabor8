const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const isLoggedIn = async (req, res, next) => {
    //Ekhane user ID ta extract kore nis and auth logic dish to check login
    if(!req.body.profile){
        next();
    }
    else{
        const { id } = req.body.profile._id;
        try{
            const user = await User.findById(id);

            //Append korbo
            req.body.profile = {
                ...req.body.profile,
                favTags: user.favTags,
                following: user.following,
            }
            next();
        }catch(error){
            console.log(error.message);
            res.status(401).json({ error: "Request not authorized" });
        }
    }
    
};

module.exports = isLoggedIn;
