import { Locations } from '../generated/client'
import prisma from '../lib/prisma'
import { NotFoundError } from '../types/Error'

class LocationService {
  async getAllLocations (): Promise<Locations[]> {
    const locations = await prisma.locations.findMany()

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
}

export default new LocationService()
