import { Locations } from '../generated/client'
import prisma from '../lib/prisma'
import { NotFoundError } from '../types/Error'
import { ResponseMessage } from '../types/Message'

class LocationService {
  async getAllLocations (): Promise<Locations[]> {
    const locations = await prisma.locations.findMany({
      where: {
        deleted: false
      }
    })

    return locations
  }

  async getLocation (locationId: number): Promise<Locations> {
    const location = await prisma.locations.findFirst({
      where: {
        location_id: locationId
      }
    })

    if (location === null) {
      throw new NotFoundError('No se encontró el lugar con el id proporcionado')
    }

    return location
  }

  async createLocation (name: string): Promise<Locations> {
    const location = await prisma.locations.create({
      data: {
        name
      }
    })

    return location
  }

  async renameLocation (locationId: number, name: string): Promise<Locations> {
    await this.getLocation(locationId)

    const location = await prisma.locations.update({
      where: {
        location_id: locationId
      },
      data: {
        name
      }
    })

    return location
  }

  async deleteLocation (locationId: number): Promise<ResponseMessage> {
    await this.getLocation(locationId)

    await prisma.locations.update({
      where: {
        location_id: locationId
      },
      data: {
        deleted: true
      }
    })

    return { message: 'Lugar eliminado correctamente' }
  }
}

export default new LocationService()
