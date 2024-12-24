import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request): Promise<Response> {
  try {
    // Fetch parking lot data using Prisma
    const parkingLots = await prisma.parkingLot.findMany();

    // Return the data as JSON
    return new Response(
      JSON.stringify({ data: parkingLots, status: 200 }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Error fetching parking lot data:', error);
    return new Response(
      JSON.stringify({ error: error.message, status: 500 }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  } finally {
    // Prisma automatically closes the connection on app shutdown
  }
}
