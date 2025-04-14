interface ParkingLot {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  totalSlots: number;
  availableSlots: number;
}

export default ParkingLot;
