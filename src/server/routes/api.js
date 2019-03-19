import express from 'express';
import contatos from './contatos'

const router = express.Router();
router.use('/contatos', contatos);

export default router;
