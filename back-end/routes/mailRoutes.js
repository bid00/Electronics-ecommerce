import express from 'express';
import { subscribeUser,contactForm } from '../controllers/mailController.js';

const router = express.Router();

router.post('/subscribe', subscribeUser);
router.post('/contact',contactForm);

export default router;
