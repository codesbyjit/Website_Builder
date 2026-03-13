import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { getUsersCollection } from '../db/mongodb';
import { generateToken, AuthRequest } from '../middleware/auth';
import { ObjectId } from 'mongodb';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      });
    }
    
    const usersCollection = await getUsersCollection();
    
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered',
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });
    
    const token = generateToken(result.insertedId.toString());
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: result.insertedId.toString(),
        email,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      });
    }
    
    const usersCollection = await getUsersCollection();
    
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }
    
    const token = generateToken(user._id.toString());
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

router.get('/me', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      });
    }
    
    const usersCollection = await getUsersCollection();
    
    const user = await usersCollection.findOne({ _id: new ObjectId(req.userId) });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    
    res.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

export default router;
