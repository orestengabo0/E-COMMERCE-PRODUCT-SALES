import axios from "axios";
import { create } from "zustand";

interface Address {
  _id: string;
  Street: string;
  City: string;
  ZipCode: string;
  Country: string;
  isDefault: boolean;
}

interface AddressState {
  addresses: Address[];
  fetchAddresses: () => Promise<{
    success: boolean;
    message: string;
    address?: Address[];
  }>;
  createAddress: (
    address: Omit<Address, "_id">
  ) => Promise<{ success: boolean; message: string }>;
  updateAddress: (
    id: string,
    updatedAddress: Omit<Address, "id">
  ) => Promise<{ success: boolean; message: string }>;
  deleteAddress: (id: string) => Promise<{ success: boolean; message: string }>;
  setDefaultAddress: (
    id: string
  ) => Promise<{ success: boolean; message: string }>;
}

export const useAddressStore = create<AddressState>((set) => ({
  addresses: [],
  fetchAddresses: async () => {
    const token = localStorage.getItem("authToken");
    if (!token)
      return { success: false, message: "User is not authenticated." };

    try {
      const res = await axios.get("http://localhost:5000/api/addresses", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        const addressList = res.data.address.addresses;
        set({ addresses: addressList });
        return {
          success: true,
          message: "Addresses fetched successfully.",
          address: addressList,
        };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      return { success: false, message: "Failed to fetch addresses." };
    }
  },
  createAddress: async (address: Omit<Address, "_id">) => {
    if (
      !address.Street ||
      !address.City ||
      !address.Country ||
      !address.ZipCode
    ) {
      return { success: false, message: "Please fill in all inputs" };
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return { success: false, message: "User not authenticated." };

      // Set all other addresses to non-default if the new address is default
      if (address.isDefault) {
        set((state) => ({
          addresses: state.addresses.map((addr) =>
            addr.isDefault ? { ...addr, isDefault: false } : addr
          ),
        }));
      }

      const res = await axios.post(
        "http://localhost:5000/api/addresses/create",
        address,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        const createdAddress = {
          ...address,
          _id: res.data.address?.id || res.data.address?._id || "", // Fallback if id is undefined
        };
        set((state) => ({ addresses: [...state.addresses, createdAddress] }));
        return { success: true, message: "Address created successfully." };
      }

      return { success: false, message: "Address creation failed." };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error response:", error.response?.data || error.message);
        return {
          success: false,
          message: error.response?.data?.message || "Failed to create Address.",
        };
      } else if (error instanceof Error) {
        console.log("Error response:", error.message);
        return { success: false, message: "An unexpected error occurred." };
      } else {
        console.log("Unexpected error:", error);
        return { success: false, message: "Failed to create Address." };
      }
    }
  },

  updateAddress: async (
    addressId: string,
    updatedAddress: Omit<Address, "_id">
  ) => {
    if (
      !updatedAddress.Street ||
      !updatedAddress.City ||
      !updatedAddress.Country ||
      !updatedAddress.ZipCode
    ) {
      return { success: false, message: "Please fill in all inputs" };
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return { success: false, message: "User not authenticated." };

      if (updatedAddress.isDefault) {
        await axios.put(
          "http://localhost:5000/api/addresses/update/clear-default",
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      }

      const res = await axios.put(
        `http://localhost:5000/api/addresses/update/${addressId}`,
        updatedAddress,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        set((state) => ({
          addresses: state.addresses.map((addr) =>
            addr._id === addressId ? { ...addr, ...updatedAddress } : addr
          ),
        }));
        return { success: true, message: "Address updated successfully." };
      }

      return { success: false, message: "Address update failed." };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error response:", error.response?.data || error.message);
        return {
          success: false,
          message: error.response?.data?.message || "Failed to update Address.",
        };
      } else if (error instanceof Error) {
        console.log("Error response:", error.message);
        return { success: false, message: "An unexpected error occurred." };
      } else {
        console.log("Unexpected error:", error);
        return { success: false, message: "Failed to update Address." };
      }
    }
  },

  deleteAddress: async (addressId) => {
    const token = localStorage.getItem("authToken");
    if (!token) return { success: false, message: "User not authenticated." };
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/addresses/delete/${addressId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        set((state) => ({
          addresses: state.addresses.filter(
            (address) => address._id !== addressId
          ),
        }));
        return { success: true, message: "Address deleted successfully." };
      }
      return { success: false, message: "Failed to delete address." };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error response:", error.response?.data || error.message);
        return {
          success: false,
          message: error.response?.data?.message || "Failed to create Address.",
        };
      } else if (error instanceof Error) {
        console.log("Error response:", error.message);
        return { success: false, message: "An unexpected error occurred." };
      } else {
        console.log("Unexpected error:", error);
        return { success: false, message: "Failed to create Address." };
      }
    }
  },
  setDefaultAddress: async (addressId) => {
    const token = localStorage.getItem("authToken");
    if (!token) return { success: false, message: "User not authenticated." };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/addresses/update/set-default/${addressId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        set((state) => ({
          addresses: state.addresses.map((address) => ({
            ...address,
            isDefault: address._id === addressId,
          })),
        }));
        return {
          success: true,
          message: "Default address updated successfully.",
        };
      }

      return { success: false, message: res.data.message };
    } catch (error) {
      console.error("Error setting default address:", error);
      return { success: false, message: "Failed to update default address." };
    }
  },
}));
