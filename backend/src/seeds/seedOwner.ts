import bcrypt from 'bcrypt';
import { db } from '../config/db';

async function seedOwner() {
  try {

    const email = 'owner@restaurant.com';

    const [rows]: any = await db.query('SELECT id FROM users WHERE email = ?', [email]);

    console.log('🔹 Query result:', rows);

    if ((rows as any[]).length > 0) {
      console.log('Owner already exists');
      return;
    }


    const hashedPassword = await bcrypt.hash('owner@123', 10);


    const [result]: any = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Owner', email, hashedPassword, 'OWNER']
    );

    console.log('Owner seeded successfully, ID:', result.insertId);
  } catch (err) {
    console.error('Error seeding owner:', err);
  } finally {
    // close the db pool to exit script cleanly
    await db.end();
  }
}

seedOwner();
