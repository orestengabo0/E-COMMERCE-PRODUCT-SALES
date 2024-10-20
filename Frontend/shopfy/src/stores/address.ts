import axios from "axios";
import { create } from "zustand";

interface Address {
  id: string;
  Name: string;
  Street: string;
  City: string;
  ZipCode: string;
  Country: string;
  isDefault: boolean;
}

interface AddressState {
  addresses: Address[];
  fetchAddresses: () => Promise<{ success: boolean; message: string, address?: Address[] }>;
  // createAddress: (address: Omit<Address, "id">) => Promise<void>,
  // updateAddress: (id: string, updatedAddress: Omit<Address, "id">) => Promise<void>,
  // deleteAddress: (id: string) => Promise<void>
}

export const useAddressStore = create<AddressState>((set) => ({
  addresses: [],
  fetchAddresses: async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return { success: false, message: "User is not authenticated." };

    try {
      const res = await axios.get("http://localhost:5000/api/addresses", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        set({ addresses: res.data.address });
        return { success: true, message: "Addresses fetched successfully.", address: res.data.address };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      return { success: false, message: "Failed to fetch addresses." };
    }
  },
}));
