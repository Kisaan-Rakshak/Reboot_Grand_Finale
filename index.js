var mongojs = require("mongojs");
var express=require("express");
var bodyParser=require('body-parser');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var session = require('express-session');
var passport = require('passport');
var MongoDBStore = require('connect-mongodb-session')(session);
var LocalStrategy = require('passport-local').Strategy;
var app = express();
const db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/kisaanRakshak?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["members,productList"]);
const path = require('path');
var telegram= require("telegram-bot-api");

var api = new telegram({
        token: '1418758571:AAEH7JnRQq5SpdqxshsJ5c4K4Elzb0qAv90',
        updates: {
        	enabled: true
    }
});
const mp = new telegram.GetUpdateMessageProvider()
api.setMessageProvider(mp)
api.start()
.then(() => {
    console.log('Telegram API is started')
})
.catch(console.err)

var store = new MongoDBStore({
  uri: 'mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/kisaanRakshak?ssl=true&replicaSet=igk-shard-0&authSource=admin',
  collection: 'sessions'
});

app.use(express.static("Templates"));
app.use(express.static("tfjs_model"));
app.set('view engine','ejs');
app.set('views', __dirname + '/Templates');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'KisaanRakshak',
  saveUninitialized: true,
  resave: false,
  store: store
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

var logindata=null;
passport.use(new LocalStrategy(function(username, password, done) {
  	var mongojs = require("mongojs");
	const db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/kisaanRakshak?ssl=true&replicaSet=igk-shard-0&authSource=admin",["members"]);

	var object={
		username:username
	}
	db.members.find(object,function(err,data){
		if(err){
			console.log(err);
		}else
		{
			if(data.length>0){ 	
				logindata=data;
				const hash=data[0].password.toString();
				bcrypt.compare(password, hash, function(err, res) {
				    if(res === true){
				    	return done(null,logindata[0]);
				    }
				    else{
				    	return done(null, false);
				    }
				});
			}
			else{
				return done(null, false);
			}
		}
	});
  }
));

api.on('update', update => {
    console.log(update)
})

api.on("message",function(message){
	var m=message.text.toLowerCase();
	api.sendMessage({chat_id:message.chat.id,text:"Hello My friend"});
});


app.get('/myProfile',function(req,res){
	if(req.isAuthenticated()){
		db.members.find({email:req.user.email},function(err,userdata){
			res.render('profile',{data:[{userdata}]});
		})
	}else{
		res.redirect('/');
	}
});

app.post("/save-basic-profile",function(req,res){
	if(req.isAuthenticated()){
			var obj={
					username:req.body.username,
					email:req.body.email
				}
			db.members.update({email:req.user.email,username:req.user.username},{$set:{username:obj.username,email:req.body.email}},function(err,data){
					req.user["email"] = req.body.email;
					req.user["username"] = req.body.username;
					res.redirect("/myProfile");
			})
		}else{
			res.redirect('/login');
		}
	});

app.get("/authenticate",function(req,res){
	if(req.isAuthenticated()){
		res.redirect('/');
	}else{
		res.render("authenticate",{data:null});
	}
});

app.post("/authorise-hardware",function(req,res){
	if(req.isAuthenticated()){
		// db.productList.insert({demoPrdt:"HelloWorld"},function(err,data){
		// 	console.log("successfully inserted into databse");
		// })
		// req.body.qrcode
		console.log(req.body)
		var prdt = {
			query: {productId:req.body.qrcode},
			remove: true
		  }
		db.productList.findAndModify(prdt,function(err,prdtdata){
			if(err) throw err;
			if(prdtdata){
				console.log("Printing the product Data")
				console.log(prdtdata)
				var usrpdt = {
					query: {
						email:req.user.email,
						username:req.user.username
					},
					update: { $set: { productId:prdtdata.productId } },
					upsert: true,
					new: true
				}
				db.members.findAndModify(usrpdt,function(err,farmerData){
					console.log("Printing the updated farmer Data")
					console.log(farmerData);
					res.send(farmerData)
				})
			}else{
				res.send("No such Product Exists");
			}
		})
	}else{
		res.render("authenticate",{data:null});
	}
})

app.get('/model.json',function(req,res){
	if(req.isAuthenticated()){
		res.sendFile(__dirname+"tfjs_model/model.json");
	}else{
		res.redirect('/login');
	}
})

app.get("/myHardware",function(req,res){	
	if(req.isAuthenticated()){
		res.render("hardware",{data:req.user});
	  }else{
		res.redirect('/authenticate');
	  }
  });

app.get("/qrcodescanner",function(req,res){	
	if(req.isAuthenticated()){
		res.render("qrcodeScanner",{data:req.user});
	  }else{
		res.redirect('/authenticate');
	  }
  });

app.get("/",function(req,res){
  if(req.isAuthenticated()){
	res.render("dashboard",{data:{data:req.user}})
  }
  else{
      res.redirect('/authenticate');
  }
});

app.get("/diseaseprediction",function(req,res){
	if(req.isAuthenticated()){
	  res.render("diseaseprediction",{data:{data:req.user}})
	}
	else{
		res.redirect('/authenticate');
	}
  });

  app.get("/sensorsGraph",function(req,res){
	if(req.isAuthenticated()){
	  res.render("sensorsGraph.ejs",{data:{data:req.user}})
	}
	else{
		res.redirect('/authenticate');
	}
  });


app.get('/signout',function(req,res){
	req.logout()
	req.session.destroy();
	res.redirect('/authenticate');
})

app.post('/login-done',passport.authenticate('local',{
	successRedirect : '/',
	failureRedirect : '/authenticate'
}));

var registerationdata=null;
app.post("/register-done",function(req,res){
		bcrypt.genSalt(10, function(err, salt){
   			bcrypt.hash(req.body.password, salt, function(err, hash) {
					var obj={
						username:req.body.username,
						email:req.body.email,
						password:hash,
						productId:null
					}
					var checkobj={
						username:req.body.username,
						email:req.body.email
					}
					db.members.findOne(checkobj,function(err,data){
						if(err){
							console.log("err with members");
						}
						else{
							if(data == null){ 
								db.members.insert(obj,function(err,data){
									if(err) throw err;
									res.send("Member added Successfully");
								})
							}
							else
							{
								res.send("Member already exists");
							}

						 }
							})
						});
					})
});



// db.sessions.remove({},function(err,data){
// 	console.log("successfully removed all sessions");	
// })

// db.productList.insert({productId:"https://eqrcode.co/a/BfynRn"},function(err,data){
// 	console.log("Data has been added")
// })

passport.serializeUser(function(id, done) {
  done(null,id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});


function authenticationMiddleware() {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/authenticate')
	}
} 

app.set('port',process.env.PORT||8000)

var server = app.listen(app.get('port'),function(){
console.log("server started at port "+app.get('port').toString())
})