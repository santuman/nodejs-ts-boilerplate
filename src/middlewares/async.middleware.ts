import { Request, Response, NextFunction } from 'express'
import { AsyncFunction } from 'interfaces/AsyncFunction'

export const asyncHandler =
	(fn: AsyncFunction<[Request, Response, NextFunction], unknown>) => (req: Request, res: Response, next: NextFunction) =>
		Promise.resolve(fn(req, res, next)).catch(next)
