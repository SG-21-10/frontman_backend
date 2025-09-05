const { PrismaClient } = require('@prisma/client');
const prisma = require('../prisma/prisma');

const catalogController = {
  getCatalog: async (req, res) => {
    try {
      // Get all available stock with product data
      const stock = await prisma.stock.findMany({
        where: {
          status: 'Available'
        }
      });

      // Fetch product info for each stock manually (to avoid Prisma crash)
      const catalog = [];

      for (const s of stock) {
        const product = await prisma.product.findUnique({
          where: { id: s.productId }
        });

        if (product) {
          catalog.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            warrantyPeriodInMonths: product.warrantyPeriodInMonths,
            stockStatus: s.status,
            stockLocation: s.location
          });
        }
      }

      res.json(catalog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch catalog' });
    }
  }
};

module.exports = catalogController;
