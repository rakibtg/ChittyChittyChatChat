let express   = require( 'express' )
let app       = express()
let http      = require( 'http' ).Server( app )
let io        = require( 'socket.io' )( http )
let mysql     = require( 'mysql' )
let session   = require( 'express-session' )
let bp        = require( 'body-parser' )

app.use( session({resave: true, saveUninitialized: true, secret: 'sabjfS^FW^T#VEHGS', cookie: { maxAge: 60000 }}) )
app.set( 'view engine', 'ejs' )
app.use( bp.urlencoded({ extended: true }) )

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '100200',
  database : 'chittychittychatchat'
})

connection.connect()

// session.fullName = "Kazi Mehedi Hasan - Bluh"

// Access static files
app.use( '/assets', express.static( 'assets' ) )

app.get( '/', function( req, res ){
  console.log( session.user_id )
  console.log( session.user_name )
  res.json([])
  // Check if logged in or not
  // if( session.uid ) {
  //   res.sendFile( __dirname + '/view/index.html' )
  // } else {
  //   res.redirect( '/login' )
  // }
})

app.get( '/login', ( req, res ) => {
  if( session.uid ) {
    res.redirect( '/login' )
  } else {
    res.render( 'login', {
      user: 1
    } )
  }
} )

app.post( '/actlogin', ( req, res ) => {
  // insert user
  // connection.query( 'INSERT INTO users ( u_email, u_password ) VALUES ( '+req.body.email+', '+req.body.password+' )', ( err, rows, fields ) => {
  connection.query('SELECT * from users where u_email="'+req.body.email+'" limit 1', function(err, rows, fields) {
    if (!err) {
      session.user_name = rows[0].u_name
      session.user_id = rows[0].u_id
      // console.log('The solution is: ', rows[0]);
    }
    else
      console.log('Error while performing Query.');
  });
  console.log( req.body )
  res.json([])
  // find user
  
  // add to session
  // redirect
} )

app.get( '/signup', ( req, res ) => {
  if( session.uid ) {
    res.redirect( '/signup' )
  } else {
    res.render( 'signup' )
  }
} )

app.post( '/actsignup', ( req, res ) => {
  connection.query( 'INSERT INTO users ( u_name, u_email, u_password ) VALUES ( "'+req.body.name+'", "'+req.body.email+'", "'+req.body.password+'" )', ( err ) => {
    res.redirect( '/login' )
  } )
} )

if( session.uid ) {
  io.on( 'connection', ( socket ) => {
    socket.on( 'chat message', function( msg ) {
      io.emit( 'chat message', session.fullName + ': ' +msg )
    } )
    socket.on( 'disconnect', () => {
      console.log( 'user disconnected' )
    } )
  } )
}

http.listen( 3000, function(){})