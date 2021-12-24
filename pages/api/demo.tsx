import type { NextApiRequest, NextApiResponse } from 'next'
import save from '../../public/demo.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(save);
}