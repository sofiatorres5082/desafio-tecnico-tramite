import express from 'express';
import upload from '../config/multerConfig.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';
import { getTramites, createTramite, updateTramite } from '../controllers/tramiteController.js';
import validateSchema from '../middleware/validatorMiddleware.js';
import tramiteSchema from '../schemas/auth.schema.js';

const router = express.Router();

router.get('/', authenticateToken, getTramites); 
router.post('/tramite', authenticateToken, upload.single('archivoBaja'), validateSchema(tramiteSchema), createTramite); 
router.put('/:id', authenticateToken, authenticateAdmin(), updateTramite); 

export default router;
