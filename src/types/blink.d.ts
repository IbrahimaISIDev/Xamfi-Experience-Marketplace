import { BlinkDatabase } from '@blinkdotnew/sdk'

declare module '@blinkdotnew/sdk' {
  interface BlinkDatabase {
    activities: {
      list(options?: { limit?: number }): Promise<any[]>
      get(id: string): Promise<any>
      createMany(data: any[]): Promise<any>
    }
    profiles: {
      get(id: string): Promise<any>
      create(data: any): Promise<any>
      update(id: string, data: any): Promise<any>
    }
    bookings: {
      list(options?: { where?: { travelerId: string } }): Promise<any[]>
      create(data: any): Promise<any>
    }
  }
}
