import { Request, Response, NextFunction } from "express";

export function validatePokemonLimit(req: Request, res: Response, next: NextFunction) {
  const { limit } = req.query;

  if (limit) {
    if (limit == "" || limit == undefined || limit == null) {
      return res.status(400).json({
        message: 'Limit defined but value not provided'
      });
    }

    const limitNumber = parseInt(limit as string)

    if (isNaN(limitNumber)) {
      return res.status(400).json({
        message: 'Invalid limit, it should be a number'
      });
    }

    req.query.limit = limitNumber.toString();
  }

  next();
}