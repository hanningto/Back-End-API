import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


//************getting all events */
export const getAllevents = async() => {
    const allEvents = await prisma.events.findMany()
    // console.log(allEvents);
    const serializedEvents = allEvents.map(event => ({
        ...event,
        id: event.id.toString(),
    }))
//  // Convert BigInt values to strings before serialization
//  const serializedEvents = events.map(event => ({
//     ...event,
//     id: event.id.toString(), // Assuming id is a BigInt field
//   }));

//   console.log(JSON.stringify(serializedEvents));

    return JSON.stringify(serializedEvents)
}


//***********getting event by id ********/
export const getOneEvent = async(id) => {
    const allEvents = await prisma.events.findMany({
        where: {id: id}
    })
    const serializedEvents = allEvents.map(event => ({
        ...event,
        id: event.id.toString(),
    }))
//  // Convert BigInt values to strings before serialization
//  const serializedEvents = events.map(event => ({
//     ...event,
//     id: event.id.toString(), // Assuming id is a BigInt field
//   }));

//   console.log(JSON.stringify(serializedEvents));

    return JSON.stringify(serializedEvents)
}


export const addNewEvent = async(body) => {
    const {imageUrl, title, price, date, location, company} = body
    await prisma.events.create({
        data: {
            imageUrl: imageUrl,
            title: title,
            price: price,
            date: date,
            location: location,
            company: company
        }
    })
}

export const deleteOneEvent = async(id) => {
    const deleteEvent = await prisma.events.delete({
        where: {
            id: id
        }
    })
    
}


export const updateEvent = async(id, body) =>{
    // const {imageUrl, title, price, date, location, company} = body
console.log("updating")
    const eventUpdate = await prisma.events.update({
        where:{
            id: id
        },
        data: body
    })
    return eventUpdate
}