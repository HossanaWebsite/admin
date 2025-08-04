// const prisma = require('./prisma');

// async function getEvent(slug) {
//   console.log("e",slug)
//   const event = await prisma.event.findUnique({ where: { slug } });
//   console.log("ee",event)
//   if (!event) return null;
//   return {
//     title: event.title,
//     summary: event.summary,
//     image: event.image,
//     date: event.date.toISOString(),
//   };
// }

// async function getLatestEvent() {
//   const event = await prisma.event.findFirst({ orderBy: { date: 'desc' } });
//   if (!event) return null;
//   return {
//     title: event.title,
//     summary: event.summary,
//     image: event.image,
//     date: event.date.toISOString(),
//   };
// }

// module.exports = { getEvent, getLatestEvent };


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getEvent(slug) {
  console.log("Fetching event for slug:", slug);
  const event = await prisma.event.findUnique({ 
    where: { slug },
  });

  if (!event || !event.isActive) return null;

  console.log("Found event:", event);
  return {
    title: event.title,
    summary: event.summary,
    image: event.image,
    picPath: event.picPath,
    url: event.url,
    paragraphs: event.paragraphs,
    organizer: event.organizer,
    date: event.date.toISOString(),
    start: event.start.toISOString(),
    end: event.end.toISOString(),
    location: event.location,
    eventName: event.eventName,
    day: event.day,
  };
}

async function getLatestEvent() {
  const event = await prisma.event.findFirst({ 
    where: { isActive: true },
    orderBy: { date: 'desc' }
  });

  if (!event) return null;

  return {
    title: event.title,
    summary: event.summary,
    image: event.image,
    picPath: event.picPath,
    url: event.url,
    paragraphs: event.paragraphs,
    organizer: event.organizer,
    date: event.date.toISOString(),
    start: event.start.toISOString(),
    end: event.end.toISOString(),
    location: event.location,
    eventName: event.eventName,
    day: event.day,
  };
}

module.exports = { getEvent, getLatestEvent };

