// Test script for Supabase API endpoint
import https from 'https';

// Your Supabase credentials from env.example
const SUPABASE_URL = 'https://neecghjltqhtevcworvr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lZWNnaGpsdHFodGV2Y3dvcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTg0MDEsImV4cCI6MjA3MTYzNDQwMX0.JoGRvJ1Gvb9v6aK_8wKXC2r_hvkFFj6t3cyEgEv9pqA';

// Test the player progress endpoint
function testPlayerProgressAPI() {
  const playerId = 'player_1756070658790_zi1jjxzgz';
  const path = `/rest/v1/player_progress?select=*&player_id=eq.${playerId}`;
  
  const options = {
    hostname: 'neecghjltqhtevcworvr.supabase.co',
    path: path,
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        console.log('\nResponse Data:');
        console.log(JSON.stringify(jsonData, null, 2));
      } catch (e) {
        console.log('\nRaw Response:');
        console.log(data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error);
  });

  req.end();
}

// Test the players table endpoint
function testPlayersAPI() {
  const path = '/rest/v1/players?select=*';
  
  const options = {
    hostname: 'neecghjltqhtevcworvr.supabase.co',
    path: path,
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    console.log(`\n=== Players Table Test ===`);
    console.log(`Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        console.log('\nPlayers Data:');
        console.log(JSON.stringify(jsonData, null, 2));
      } catch (e) {
        console.log('\nRaw Response:');
        console.log(data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error);
  });

  req.end();
}

console.log('Testing Supabase API endpoints...\n');
console.log('=== Player Progress Test ===');
testPlayerProgressAPI();

// Wait a bit then test players table
setTimeout(testPlayersAPI, 2000);
