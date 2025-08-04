const prisma = require('./prisma');

async function getAboutData() {
  const about = await prisma.about.findFirst({ orderBy: { updatedAt: 'desc' } });
  if (!about) return {
    title: 'About HCSEM',
    description: 'HCSEM is a nonprofit uniting Ethiopians in Minnesota.',
    image: '/assets/images/about-banner.jpg',
  };
  return {
    title: about.title,
    description: about.description,
    image: about.image,
  };
}

module.exports = { getAboutData };
