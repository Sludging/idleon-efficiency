import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../profiles/sludger.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.profile == "sludger") {
    res.status(200).json(data);
  }
  else {
    res.status(404).json({ message: `Profile ${req.query.profile} not found.`});
  }


}