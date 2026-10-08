import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getUserById(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId)
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        resumeSummary: true,
        skills: true
      }
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Transform user data to include default values for missing fields
    return {
      ...user,
      skills: user.skills && user.skills.length > 0 ? user.skills : ["JavaScript", "Web Development"],
      summary: user.resumeSummary || "Aspiring developer looking to enhance skills"
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export default getUserById;