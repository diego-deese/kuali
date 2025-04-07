import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { UnauthorizedError } from '../types/Error';

class AuthController {
  login = async (req: Request, res: Response): Promise<undefined> => {
    try {
      const { institutional_email, password } = req.body;
      
      const response = await authService.login(institutional_email, password);
      
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        res.status(401).json({
          message: 'Error al iniciar sesión',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Error al iniciar sesión',
          error: error instanceof Error ? error.message : 'Error desconocido',
        });
      }
    }
  };

}

export default new AuthController();
