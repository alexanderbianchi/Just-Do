const pool = require("./db");
const crypto = require('crypto');
//middleware
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}


module.exports = function (app) {
  app.post("/login", async (req, res) => {
    
    try {
      let { username, password } = req.body;
      password = getHashedPassword(password)
      const user = await pool.query(
        'SELECT id FROM users WHERE username = $1 and password = $2',[username,password]
      );
      
      if (user){ res.json(user.rows[0].id);}
      else {console.log('No User Found')}
      
      
    } catch (err) {
      console.error(err.message);
    }
  });

  app.post("/register", async (req, res) => {
    
    try {
      
      let { username, password } = req.body ;
      
      password = getHashedPassword(password)
      const newUser = await pool.query(
        'INSERT INTO users (username,password) VALUES ($1,$2) returning id;',[username,password]
      );

      res.json(newUser.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get('/account', async (req,res) => {
    try {
      
      let token = req.query.id ;
      
      const user = await pool.query(
        `SELECT * from users where id = ${token};`
      );
      console.log(user.rows)
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  })

  app.delete('/account', async (req,res) => {
    try {
      
      let token = req.query.id ;
      
      await pool.query(
        `DELETE from users where id = ${token};`
      );
      await pool.query(
        `DELETE from todo where id = ${token};`
      );
      res.json('Bye!!')
    } catch (err) {
      console.error(err.message);
    }
  })

  app.put("/account", async (req, res) => {
    try {
      let pass = getHashedPassword(req.body.pass);
      let token = req.query.id;
      
      
      await pool.query(
        'UPDATE users SET password = $1 where id = $2;',[pass,token]
      );
        
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
};
