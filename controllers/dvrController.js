const prisma = require('../prisma/prisma');

const dvrController = {
  // POST /fieldExecutive/dvr
  createDVR: async (req, res) => {
    try {
      const { feedback, location } = req.body;
      const executiveId = req.user.id;

      const fieldExec = await prisma.fieldExecutive.findUnique({
        where: { userId: executiveId }
      });

      if (!fieldExec) {
        return res.status(403).json({ message: 'Not a Field Executive' });
      }

      const dvr = await prisma.dVR.create({
        data: {
          feedback,
          location,
          executiveId: fieldExec.id
        }
      });

      res.status(201).json({ message: 'DVR submitted', dvr });
    } catch (err) {
      console.error('Error in createDVR:', err);
      res.status(500).json({ message: 'Failed to submit DVR' });
    }
  },

  // GET /fieldExecutive/dvr
  getMyDVRs: async (req, res) => {
    try {
      const executiveId = req.user.id;

      const fieldExec = await prisma.fieldExecutive.findUnique({
        where: { userId: executiveId }
      });

      if (!fieldExec) {
        return res.status(403).json({ message: 'Not a Field Executive' });
      }

      const dvrList = await prisma.dVR.findMany({
        where: { executiveId: fieldExec.id },
        orderBy: { id: 'desc' }
      });

      res.json(dvrList);
    } catch (err) {
      console.error('Error in getMyDVRs:', err);
      res.status(500).json({ message: 'Failed to fetch DVR reports' });
    }
  }
};

module.exports = dvrController;
