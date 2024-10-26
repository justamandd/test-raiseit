import { IsAlpha } from '@utils/IsAlpha';
import { Request, Response, NextFunction } from 'express';

export function validatePokemonName(req: Request, res: Response, next: NextFunction) {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({
      message: 'Name is required'
    });
  }

  if (!IsAlpha.validate(name as string)) {
    return res.status(400).json({
      message: 'Name must contain only letters'
    });
  }

  next();
}