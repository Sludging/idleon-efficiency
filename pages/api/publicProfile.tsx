import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../profiles/sludger.json';
import data2 from '../../profiles/morojo.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.profile == "sludger") {
    res.status(200).json(data);
  }
  else if (req.query.profile == "morojo") {
    res.status(200).json(data2);
  }
  else {
    res.status(404).json({ message: `Profile ${req.query.profile} not found.`});
  }


}