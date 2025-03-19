export default function Store({ credits, itemCosts, onBuyTrashBag, onBuyPicker, onBuyStreetrat, onBuyCart, onBuyJunkMagnet, onBuyUrbanRecycler, onBuyClickEnhancer, clickCount, purchasedUpgrades, onBack }) {
  const showClickEnhancer = purchasedUpgrades >= 3 || clickCount >= 1000;

  return (
    <div className="store-container">
      <h2>Junk Store</h2>

      <div className="store-sections-wrapper">
        <div className="store-section">
          <h3>Click Power</h3>
          <div className="store-items">
            <button
              onClick={onBuyTrashBag}
              disabled={credits < itemCosts.trashBag}
              className="store-item"
            >
              Buy Scrap Bag ({itemCosts.trashBag} Junk)
              <div className="item-info">
                <strong>Scrap Bag</strong>
                <p>+1 Junk per click</p>
                <p>+10% Cost per purchase</p>
                <p className="owned">Owned: {Math.log1p(itemCosts.trashBag / 10).toFixed(0)}</p>
              </div>
            </button>

            <button
              onClick={onBuyPicker}
              disabled={credits < itemCosts.trashPicker}
              className="store-item"
            >
              Buy Trash Picker ({itemCosts.trashPicker} Junk)
              <div className="item-info">
                <strong>Trash Picker</strong>
                <p>+3 Junk per click</p>
                <p>+10% Cost per purchase</p>
                <p className="owned">Owned: {Math.log1p(itemCosts.trashPicker / 100).toFixed(0)}</p>
              </div>
            </button>

            {showClickEnhancer && (
              <button
                onClick={onBuyClickEnhancer}
                disabled={credits < itemCosts.clickEnhancer}
                className="store-item"
              >
                Buy Click Enhancer ({itemCosts.clickEnhancer} Junk)
                <div className="item-info">
                  <strong>Click Enhancer</strong>
                  <p>+10 Junk per click</p>
                  <p>+10% Cost per purchase</p>
                  <p className="owned">Level: {Math.log1p(itemCosts.clickEnhancer / 2500).toFixed(0)}</p>
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="store-section">
          <h3>Junk Per Second</h3>
          <div className="store-items">
            <button
              onClick={onBuyStreetrat}
              disabled={credits < itemCosts.streetrat}
              className="store-item"
            >
              Buy Streetrat ({itemCosts.streetrat} Junk)
              <div className="item-info">
                <strong>Streetrat</strong>
                <p>+1 Junk per second</p>
                <p>+15% Cost per purchase</p>
                <p className="owned">Owned: {Math.log1p(itemCosts.streetrat / 100).toFixed(0)}</p>
              </div>
            </button>

            <button
              onClick={onBuyCart}
              disabled={credits < itemCosts.cart}
              className="store-item"
            >
              Buy Shopping Cart ({itemCosts.cart} Junk)
              <div className="item-info">
                <strong>Shopping Cart</strong>
                <p>+5 Junk per second</p>
                <p>+15% Cost per purchase</p>
                <p className="owned">Owned: {Math.log1p(itemCosts.cart / 500).toFixed(0)}</p>
              </div>
            </button>

            <button
              onClick={onBuyJunkMagnet}
              disabled={credits < itemCosts.junkMagnet}
              className="store-item"
            >
              Buy Junk Magnet ({itemCosts.junkMagnet} Junk)
              <div className="item-info">
                <strong>Junk Magnet</strong>
                <p>+10 Junk per second</p>
                <p>+15% Cost per purchase</p>
                <p className="owned">Owned: {Math.log1p(itemCosts.junkMagnet / 1500).toFixed(0)}</p>
              </div>
            </button>

            <button
              onClick={onBuyUrbanRecycler}
              disabled={credits < itemCosts.urbanRecycler}
              className="store-item"
            >
              Buy Urban Recycler ({itemCosts.urbanRecycler} Junk)
              <div className="item-info">
                <strong>Urban Recycler</strong>
                <p>+20 Junk per second</p>
                <p>+15% Cost per purchase</p>
                <p className="owned">Owned: {Math.log1p(itemCosts.urbanRecycler / 3000).toFixed(0)}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}