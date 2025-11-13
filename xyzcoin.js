const XYZCoin = artifacts.require("XYZCoin");

contract("XYZCoin", async accounts => {
  const [creator, user1, user2] = accounts;

  it("should set the token name correctly", async () => {
    let instance = await XYZCoin.deployed();
    assert.equal(await instance.name(), "XYZCoin");
  });

  it("initial balance of creator equals total supply", async () => {
    let instance = await XYZCoin.deployed();
    let balance = await instance.balanceOf(creator);
    assert.equal(balance.toNumber(), 1000);
  });

  it("can transfer tokens using transfer()", async () => {
    let instance = await XYZCoin.deployed();
    await instance.transfer(user1, 100, { from: creator });
    let balance = await instance.balanceOf(user1);
    assert.equal(balance.toNumber(), 100);
  });

  it("can set and read allowance", async () => {
    let instance = await XYZCoin.deployed();
    await instance.approve(user1, 50, { from: creator });
    let allowance = await instance.allowance(creator, user1);
    assert.equal(allowance.toNumber(), 50);
  });

  it("can transfer tokens on behalf of another account", async () => {
    let instance = await XYZCoin.deployed();
    await instance.approve(user1, 30, { from: creator });
    await instance.transferFrom(creator, user2, 30, { from: user1 });
    let balance = await instance.balanceOf(user2);
    assert.equal(balance.toNumber(), 30);
  });
});