import prisma from '../db';

type application = {
    id?: number;
    firstName?: string;
    lastName?: string;
    dOb?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: number;
    vin?: string;
    year?: number;
    make?: string;
    model?: string;
  };

export async function createApplication(contents: application) {
    const app = await prisma.application.create({
        data: contents
    });
    return app.id;
}

export async function getApplication(id:number) {
    const app = await prisma.application.findUnique({
        where: {
          id: id
        }
    });
    return app;   
}

export async function updateApplication(id:number, contents) {
    const app = await prisma.application.update({
        where: { id: id },
        data: contents,
      });
    return app; 
}
