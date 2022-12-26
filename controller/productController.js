const product=require('../schema/productSchema');
const signup=require('../schema/signupSchema');

exports.getProducts=async(req,res)=>{
    try {
        const data=await product.find();
        res.send(data);
    } catch (error) {
        return res.json({
            status:500,
            msg:error.message
        })
    }
}
exports.registration=async(req,res)=>{
    const { firstname, lastname, username, email, password, phone } = req.body;
  const userNameCheck = await signup.findOne({ username: username });
 
  if (userNameCheck) {
    return res.json({ msg: "Username already used", status: false });
  }
  const emailCheck = await signup.findOne({ email: email });
  console.log(email);
  console.log(emailCheck)
  if (emailCheck) {
    return res.json({ msg: "Email already used", status: false });
  }
  const data = new signup({
    firstname,
    lastname,
    username,
    email,
    password,
    phone,
  });
  await data.save();
  return res.json({
    msg: "Account Successfully Created, Please Login Now",
    status: true,
  });
}
exports.login=async(req,res)=>{
  const { logEmail, logPassword } = req.body;
  const userCheck = await signup.findOne({ email: logEmail });
  if (!userCheck) {
    return res.json({ msg: "Incorrect Username", status: false });
  }
  let isMatch = await bcrypt.compare(logPassword, userCheck.password);
  if (!isMatch) {
    return res.json({ msg: "Incorrect Password", status: false });
  }
  return res.json({
    status: true,
    msg: "Successfully Logged in!",
  });
}
exports.getProductById=async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await product.findOne({'id':id});
        res.send(data);
    } catch (error) {
        return res.json({
            status:500,
            msg:error.message
        })
    }
  }