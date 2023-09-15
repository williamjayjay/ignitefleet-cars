import { reverseGeocodeAsync, LocationObjectCoords } from 'expo-location'

export async function getAddressLocation({ latitude, longitude }: LocationObjectCoords) {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude })

    console.log('total:', addressResponse[0])
    return addressResponse[0]?.street
  } catch (error) {
    console.log(error)
  }
}