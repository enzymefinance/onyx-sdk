import { type Address, getAddress, isAddress, isAddressEqual, zeroAddress } from "viem";

export function sameAddress(a: string, b: string) {
  return isAddressEqual(getAddress(a), getAddress(b));
}

export function safeSameAddress(a: Address | string | null | undefined, b: Address | string | null | undefined) {
  try {
    return !!a && !!b && isAddress(a) && isAddress(b) && sameAddress(a, b);
  } catch {}

  return false;
}

export function isNonZeroAddress(value: string): value is Address {
  return isAddress(value) && value !== zeroAddress;
}

export function asAddress(value: string): Address {
  const address = value.toLowerCase();

  if (isAddress(address)) {
    return address;
  }

  throw new Error("Invalid address");
}
