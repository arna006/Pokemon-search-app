// REGISTER
app.post('/register', async (req, res) => {
    try {
      // 1. Hent username og password fra req.body
      const { username, password } = req.body;

      // 2. Sjekk at begge feltene er fylt ut
      if (!username || !password) {
        return res.status(400).send('Username and password are required');
      }

      // 3. Koble til databasen
      const db = client.db('pokemonApp');
      const users = db.collection('users');

      // 4. Sjekk om brukernavn allerede finnes
      const existingUser = await users.findOne({ username });
      if (existingUser) {
        return res.status(409).send('Username already exists');
      }

      // 5. Hash passordet
      const hashedPassword = await bcrypt.hash(password, 10);

      // 6. Sett bruker inn i databasen
      await users.insertOne({ username, password: hashedPassword });

      // 7. Send bekreftelse
      res.status(201).send('User registered successfully');
    } catch (error) {
      // 8. Håndter eventuelle feil
      console.error('Error in /register:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // LOGIN
  app.post('/login', async (req, res) => {
    try {
      // 1. Hent username og password fra req.body
      const { username, password } = req.body;

      // 2. Sjekk at begge feltene er fylt ut
      if (!username || !password) {
        return res.status(400).send('Username and password are required');
      }

      // 3. Koble til databasen og hent bruker
      const db = client.db('pokemonApp');
      const users = db.collection('users');
      const user = await users.findOne({ username });

      // 4. Hvis bruker ikke finnes
      if (!user) {
        return res.status(401).send('Invalid username or password');
      }

      // 5. Sammenlign hashet passord
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send('Invalid username or password');
      }

      // 6. Innlogging OK
      res.send('Login successful');
    } catch (error) {
      // 7. Håndter eventuelle feil
      console.error('Error in /login:', error);
      res.status(500).send('Internal Server Error');
    }
  });
