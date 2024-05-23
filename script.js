document.addEventListener("DOMContentLoaded", function() {
  let gold = 0;
  let goldPerClick = 1;
  let upgradeCosts = [10, 100, 1000, 10000, 100000, 1000000];
  const costIncreaseFactor = 1.1; // Factor by which the cost increases for each upgrade

  const goldText = document.getElementById('goldText');
  const goldPerClickText = document.getElementById('goldPerClickText');
  const goldBar = document.getElementById('goldBar');
  const upgrades = document.querySelectorAll('.upgrade');

  goldBar.addEventListener('click', function() {
    gold += goldPerClick;
    goldText.textContent = `Current Gold: ${Math.round(gold)}`;
  });

  function purchaseUpgrade(upgradeCost, upgradeBonus, upgradeButton, index) {
    if (gold >= upgradeCost || Math.abs(gold - upgradeCost) < Number.EPSILON) { // Check for equality within a small margin of error
      gold -= upgradeCost;
      goldText.textContent = `Current Gold: ${Math.round(gold)}`;
      goldPerClick += upgradeBonus;
      goldPerClickText.textContent = `Gold per Click: ${Math.round(goldPerClick)}`;
      upgradeCosts[index] *= costIncreaseFactor; // Increase the cost for the next upgrade
      upgradeButton.textContent = `Upgrade (+${upgradeBonus} Gold/Click) - Cost: ${Math.round(upgradeCosts[index])}`;
    } else {
      alert('Not enough gold to purchase this upgrade!');
    }
  }

  upgrades.forEach((upgrade, index) => {
    let upgradeBonus = 0;
    if (index === 0) {
      upgradeBonus = 1;
    } else if (index === 1) {
      upgradeBonus = 5;
    } else if (index === 2) {
      upgradeBonus = 25;
    } else if (index === 3) {
      upgradeBonus = 100;
    } else if (index === 4) {
      upgradeBonus = 500;
    } else if (index === 5) {
      upgradeBonus = 2500;
    }

    upgrade.addEventListener('click', function() {
      let upgradeCost = upgradeCosts[index];
      purchaseUpgrade(upgradeCost, upgradeBonus, upgrade, index);
    });
  });
});
