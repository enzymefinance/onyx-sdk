import { encodeFunctionResult, getAddress, toFunctionSelector } from "viem";
import { describe, expect, test } from "vitest";
import * as AccountERC20Tracker from "../src/components/position-trackers/AccountERC20Tracker.js";
import * as Shares from "../src/Shares.js";

describe("move-assets encoders", () => {
  test("encodeWithdrawAssetTo uses withdrawAssetTo selector", () => {
    const assetAddress = getAddress("0x1c7d4b196cb0c7b01d743fbc6116a902379c7238");
    const recipient = getAddress("0x0000000000000000000000000000000000000001");
    const amount = 1_000_000n;

    const data = Shares.encodeWithdrawAssetTo({ assetAddress, to: recipient, amount });
    const selector = toFunctionSelector("withdrawAssetTo(address,address,uint256)");

    expect(data.startsWith(selector)).toBe(true);
  });

  test("encodeGetAssets uses getAssets selector", () => {
    const data = AccountERC20Tracker.encodeGetAssets();
    const selector = toFunctionSelector("getAssets()");

    expect(data).toBe(selector);
  });

  test("decodeGetAssets round-trips asset list", () => {
    const assets = [
      getAddress("0x1c7d4b196cb0c7b01d743fbc6116a902379c7238"),
      getAddress("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"),
    ];

    const resultData = encodeFunctionResult({
      abi: [
        {
          type: "function",
          name: "getAssets",
          inputs: [],
          outputs: [{ name: "", type: "address[]" }],
          stateMutability: "view",
        },
      ],
      functionName: "getAssets",
      result: assets,
    });

    expect(AccountERC20Tracker.decodeGetAssets(resultData)).toEqual(assets);
  });
});
