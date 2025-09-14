const prevButtonLow = document.getElementById("prevButton") as HTMLButtonElement
const nextButtonLow = document.getElementById("nextButton") as HTMLButtonElement
const marketTextLow = document.getElementById("marketPrice") as HTMLParagraphElement
const caseImageLow = document.getElementById("caseImage") as HTMLImageElement;
const caseNameLow = document.getElementById("caseName") as HTMLParagraphElement;
const buyButtonLow = document.getElementById("buyButton") as HTMLButtonElement;
const prevButtonHigh = document.getElementById("prevButtonHigh") as HTMLButtonElement
const nextButtonHigh = document.getElementById("nextButtonHigh") as HTMLButtonElement
const marketTextHigh = document.getElementById("marketPriceHigh") as HTMLParagraphElement
const caseImageHigh = document.getElementById("caseImageHigh") as HTMLImageElement;
const caseNameHigh = document.getElementById("caseNameHigh") as HTMLParagraphElement;
const buyButtonHigh = document.getElementById("buyButtonHigh") as HTMLButtonElement;
const spentAmountText = document.getElementById("spent-amount") as HTMLSpanElement;
const gainAmountText = document.getElementById("net-gain-amount") as HTMLSpanElement;
const openScreen = document.getElementById("open-screen") as HTMLDivElement;
const revealedItem = document.getElementById("revealed-item") as HTMLDivElement;
const closeOpeningButton = document.getElementById("close-opening") as HTMLButtonElement;
const itemName = document.getElementById("item-name") as HTMLDivElement;
const itemValue = document.getElementById("item-value") as HTMLDivElement;
const openSound = new Audio('/assets/open.mp3');
const weaponWheel = document.getElementById("weapon-wheel") as HTMLDivElement;
const wheelItems = document.getElementById("wheel-items") as HTMLDivElement;

let marketPriceLow: number = 0.00
let marketPriceHigh: number = 0.00
let caseLoaded: boolean = false
let totalSpent: number = 0.00
let totalGain: number = 0.00
let onCaseLow: number = 0
let onCaseHigh: number = 0

let cachedPrices: Record<string, string> = {}

const caseNamesLow: string[] = [
  "Kilowatt Case",
  "Revolution Case",
  "Fracture Case",
]

const casesLow: Record<string, string> = {
  "Kilowatt Case" : "/assets/cases/kilowatt.png",
  "Revolution Case" : "/assets/cases/revolution.png",
  "Fracture Case" : "/assets/cases/fracture.png",
}

const caseNamesHigh: string[] = [
  "Operation Bravo Case",
  "CS:GO Weapon Case",
  "CS:GO Weapon Case 2",
  "eSports 2013 Winter Case",
  "eSports 2014 Summer Case",
]

const casesHigh: Record<string, string> = {
  "Operation Bravo Case" : "/assets/cases/operation bravo.png",
  "CS:GO Weapon Case" : "/assets/cases/weapon.png",
  "CS:GO Weapon Case 2" : "/assets/cases/weapon2.png",
  "eSports 2013 Winter Case" : "/assets/cases/esports 2013 winter.png",
  "eSports 2014 Summer Case" : "/assets/cases/esports 2014 summer.png"

}

//@ts-ignore
const _blank: { name: string; value: number; rarity: string; }[] = [
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
]


const kilowattItems: { name: string; value: number; rarity: string }[] = [
  { name: "Tec-9 | Slag", value: 0.18, rarity: "consumer" },
  { name: "XM1014 | Irezumi", value: 0.14, rarity: "consumer" },
  { name: "UMP-45 | Motorized", value: 0.14, rarity: "consumer" },
  { name: "SSG 08 | Dezastre", value: 0.15, rarity: "consumer" },
  { name: "Nova | Dark Sigil", value: 0.13, rarity: "consumer" },
  { name: "Dual Berettas | Hideout", value: 0.14, rarity: "consumer" },
  { name: "MAC-10 | Light Box", value: 0.23, rarity: "consumer" },
  { name: "MP7 | Just Smile", value: 1.25, rarity: "mil-spec" },
  { name: "Five-SeveN | Hybrid", value: 1.57, rarity: "mil-spec" },
  { name: "Sawed-Off | Analog Input", value: 1.04, rarity: "mil-spec" },
  { name: "M4A4 | Etch lord", value: 3.24, rarity: "restricted" },
  { name: "Glock-18 | Block-18", value: 1.14, rarity: "mil-spec" },
  { name: "Zeus x27 | Olympus", value: 8.21, rarity: "classified" },
  { name: "USP-S | Jawbreaker", value: 13.15, rarity: "classified" },
  { name: "M4A1-S | Black Lotus", value: 16.80, rarity: "classified" },
  { name: "AWP | Chrome Cannon", value: 56.10, rarity: "covert" },
  { name: "AK-47 | Inheritance", value: 181.13, rarity: "covert" },
  { name: "Kukri Knife | Fade", value: 412.53, rarity: "contraband" },
]

const revolutionItems: { name: string; value: number; rarity: string; }[] = [
  { name: "P250 | Re.built", value: 0.14, rarity: "mil-spec" },
  { name: "Tec-9 | Rebel", value: 0.14, rarity: "mil-spec" },
  { name: "MAG-7 | Insomnia", value: 0.15, rarity: "mil-spec" },
  { name: "SCAR-20 | Fragments", value: 0.14, rarity: "mil-spec" },
  { name: "MP5-SD | Liquidation", value: 0.16, rarity: "mil-spec" },
  { name: "MP9 | Featherweight", value: 0.14, rarity: "mil-spec" },
  { name: "SG 553 | Cyberforce", value: 0.15, rarity: "mil-spec" },
  { name: "R8 Revolver | Banana Cannon", value: 0.93, rarity: "restricted" },
  { name: "P90 | Neoqueen", value: .80, rarity: "restricted" },
  { name: "MAC-10 | Sakkaku", value: .22, rarity: "restricted" },
  { name: "Glock-18 | Umbral Rabbit", value: 1.12, rarity: "restricted" },
  { name: "M4A1-S | Empthorosaur-S", value: 4.35, rarity: "restricted" },
  { name: "P2000 | Wicked Sick", value: 6.69, rarity: "classified" },
  { name: "UMP-45 | Wild Child", value: 6.67, rarity: "classified" },
  { name: "AWP | Duality", value: 9.18, rarity: "classified" },
  { name: "AK-47 | Headshot", value: 51.53, rarity: "covert" },
  { name: "M4A1 | Temukau", value: 63.04, rarity: "covert" },
  { name: "Glove | Vice", value: 12521.42, rarity: "contraband" },
]

const fractureItems: { name: string; value: number; rarity: string; }[] = [
  { name: "P90 | Freight", value: 0.14, rarity: "mil-spec" },
  { name: "Negev | Ultralight", value: 0.13, rarity: "mil-spec" },
  { name: "PP-Bizon | Runic", value: 0.15, rarity: "mil-spec" },
  { name: "P2000 | Gnarled", value: 0.17, rarity: "mil-spec" },
  { name: "SG 553 | Ol' Rusty", value: 0.12, rarity: "mil-spec" },
  { name: "SSG 08 | Mainframe 001", value: 0.15, rarity: "mil-spec" },
  { name: "P250 | Cassette", value: 0.15, rarity: "mil-spec" },
  { name: "MAC-10 | Allure", value: 1.40, rarity: "restricted" },
  { name: "Tec-9 | Brother", value: 2.10, rarity: "restricted" },
  { name: "MAG-7 | Monster Call", value: 2.03, rarity: "restricted" },
  { name: "MP5-SD | Kitbash", value: 0.99, rarity: "restricted" },
  { name: "Galil AR | Connexion", value: 1.45, rarity: "restricted" },
  { name: "XM1014 | Entombed", value: 6.12, rarity: "classified" },
  { name: "M4A4 | Tooth Fairy", value: 16.00, rarity: "classified" },
  { name: "Glock-18 | Vouge", value: 8.32, rarity: "classified" },
  { name: "AK-47 | Legion of Anubis", value: 35.23, rarity: "covert" },
  { name: "Desert Eagle | Printstream", value: 75.43, rarity: "covert" },
  { name: "Skeleton Knife | Fade", value: 1278.94, rarity: "contrband" },

]

const relationLow: Record<string, { name: string; value: number; rarity: string; }[]> = {
  "Kilowatt Case" : kilowattItems,
  "Revolution Case" : revolutionItems,
  "Fracture Case" : fractureItems,
}

const weaponItems: { name: string; value: number; rarity: string; }[] = [
  { name: "MP7 | Skulls", value: 15.08, rarity: "mil-spec" },
  { name: "SG 553 | Ultraviolet", value: 34.45, rarity: "mil-spec" },
  { name: "AUG | Wings", value: 13.54, rarity: "mil-spec" },
  { name: "Glock-18 | Dragon Tattoo", value: 120.00, rarity: "restricted" },
  { name: "M4A1-S | Dark Water - m4a1-s", value: 90.00, rarity: "restricted" },
  { name: "USP-S | Dark Water - usp-s", value: 61.40, rarity: "restricted" },
  { name: "Desert Eagle | Hypnotic", value: 98.24, rarity: "classified" },
  { name: "AK-47 | Case Hardened", value: 370.99, rarity: "classified" },
  { name: "AWP | Lightning Strike", value: 543.54, rarity: "covert" },
  { name: "Karambit | Fade", value: 2045.65, rarity: "contraband" },
]

const esports2013Items: { name: string; value: number; rarity: string; }[] = [
  { name: "MAG-7 | Memento", value: 2.12, rarity: "mil-spec" },
  { name: "FAMAS | Dookitty", value: 1.54, rarity: "mil-spec" },
  { name: "M4A4 | Faded Zebra", value: 11.07, rarity: "mil-spec" },
  { name: "Sawed-Off | Orange DDPAT", value: 32.54, rarity: "restricted" },
  { name: "P250 | Splash", value: 22.00, rarity: "restricted" },
  { name: "Galil AR | Orange DDPAT", value: 25.05, rarity: "restricted" },
  { name: "AK-47 | Red Laminate", value: 325.14, rarity: "classified" },
  { name: "AWP | BOOM", value: 350.45, rarity: "classified" },
  { name: "P90 | Death by Kitty", value: 42.44, rarity: "covert" },
  { name: "Karambit | Fade", value: 2045.65, rarity: "contraband" },
]

const bravoItems: { name: string; value: number; rarity: string; }[] = [
  { name: "SG 553 | Wave Spray", value: 8.00, rarity: "mil-spec" },
  { name: "G3SG1 | Demeter", value: 10.43, rarity: "mil-spec" },
  { name: "Dual Berettas | Black Limba", value: 15.08, rarity: "mil-spec" },
  { name: "UMP-45 | Bone Pile", value: 7.56, rarity: "mil-spec" },
  { name: "Galil AR | Shattered", value: 23.25, rarity: "mil-spec" },
  { name: "Nova | Tempest", value: 8.32, rarity: "mil-spec" },
  { name: "M4A1-S | Bright Water", value: 45.00, rarity: "restricted" },
  { name: "MAC-10 | Graven", value: 39.12, rarity: "restricted" },
  { name: "USP-S | Overgrowth", value: 63.00, rarity: "restricted" },
  { name: "M4A4 | Zirka", value: 60.00, rarity: "restricted" },
  { name: "P90 | Emerald Dragon", value: 240.00, rarity: "classified" },
  { name: "P200 | Ocean Foam", value: 132.12, rarity: "classified" },
  { name: "AWP | Graphite", value: 200.07, rarity: "classified" },
  { name: "AK-47 | Fire Serpent", value: 3154.32, rarity: "covert" },
  { name: "Desert Eagle | Golden Koi", value: 283.07, rarity: "covert" },
  { name: "Karambit | Fade", value: 2045.65, rarity: "contraband" },

]

const relationHigh: Record<string, { name: string; value: number; rarity: string; }[]> = {
  "CS:GO Weapon Case" : weaponItems,
  "eSports 2013 Winter Case" : esports2013Items,
  "Operation Bravo Case" : bravoItems,
  "CS:GO Weapon Case 2" : weaponItems,
  "eSports 2014 Summer Case" : esports2013Items,
}


async function fetchPriceLow(caseType: string): Promise<void> {
  caseLoaded = false
  if (cachedPrices[caseType]) {
    marketPriceLow = parseFloat(cachedPrices[caseType])
    marketTextLow.innerText = "Market price: £" + String(marketPriceLow)
    caseLoaded = true
    return
  }
  marketTextLow.innerText = "Market price: Loading..."
  var validCase: string[] = caseType.split(" ")
  var caseUrl: string = ""
  for (let e of validCase) {
    caseUrl += e + "%20"
  }
  const fetched = await fetch(`https://api.flik.host/steam_market.php?item=${caseUrl}`)
  
  const data = await fetched.json();

  if (!data || !data.mean_price) {
    return;
  }

  marketPriceLow = data.mean_price
  cachedPrices[caseType] = String(marketPriceLow)
  marketTextLow.innerText = "Market price: £" + String(marketPriceLow)
  caseLoaded = true
} 

async function fetchPriceHigh(caseType: string): Promise<void> {
  caseLoaded = false
  if (cachedPrices[caseType]) {
    marketPriceHigh = parseFloat(cachedPrices[caseType])
    marketTextHigh.innerText = "Market price: £" + String(marketPriceHigh)
    caseLoaded = true
    return
  }
  marketTextHigh.innerText = "Market price: Loading..."
  var validCase: string[] = caseType.split(" ")
  var caseUrl: string = ""
  for (let e of validCase) {
    caseUrl += e + "%20"
  }
  console.log(caseType)
  const fetched = await fetch(`https://api.flik.host/steam_market.php?item=${caseUrl}`)
  
  const data = await fetched.json();

  if (!data || !data.mean_price) {
    console.log(data)
    return;
  }

  marketPriceHigh = data.mean_price
  cachedPrices[caseType] = String(marketPriceHigh)
  marketTextHigh.innerText = "Market price: £" + String(marketPriceHigh)
  caseLoaded = true
} 

function getRandomItem(
  source: Array<{ name: string; value: number; rarity: string }> | Record<string, any> = kilowattItems
) {
  const items = Array.isArray(source)
    ? source
    : Object.keys(source).map((k) => {
        const v = source[k];
        if (typeof v === "number") return { name: k, value: v, rarity: "consumer" };
        return { name: k, value: typeof v.value === "number" ? v.value : 0, rarity: v.rarity ?? "consumer" };
      });

  const chances = {
    consumerGroup: 50,
    restricted: 30,
    classified: 15,
    covert: 4.74,
    contraband: 0.26,
  };

  const rand = Math.random() * 100;
  let pool: typeof items = [];

  if (rand < chances.consumerGroup) {
    pool = items.filter((i) => i.rarity === "consumer" || i.rarity === "mil-spec");
  } else if (rand < chances.consumerGroup + chances.restricted) {
    pool = items.filter((i) => i.rarity === "restricted");
  } else if (rand < chances.consumerGroup + chances.restricted + chances.classified) {
    pool = items.filter((i) => i.rarity === "classified");
  } else if (rand < chances.consumerGroup + chances.restricted + chances.classified + chances.covert) {
    pool = items.filter((i) => i.rarity === "covert");
  } else {
    pool = items.filter((i) => i.rarity === "contraband");
  }

  if (!pool || pool.length === 0) {
    return items[Math.floor(Math.random() * items.length)];
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

function createWheelItems(caseItems: { name: string; value: number; rarity: string }[], winningItem: { name: string; value: number; rarity: string }, isHighCase: boolean = false): void {
  wheelItems.innerHTML = '';
  
  const rarityWeights: Record<string, number> = {
    consumer: 500,
    "mil-spec": 500,
    restricted: 100,
    classified: 30,
    covert: 8,
    contraband: 1
  };
  
  const createWeightedPool = (items: typeof caseItems): typeof caseItems => {
    const weightedPool: typeof caseItems = [];
    items.forEach(item => {
      const weight = rarityWeights[item.rarity] || 1;
      for (let i = 0; i < weight; i++) {
        weightedPool.push(item);
      }
    });
    return weightedPool;
  };
  
  const getItemImage = (itemName: string, rarity: string): string => {
    if (rarity === 'contraband') {
      return '/assets/gold.png';
    }
    
    let folder = '';
    
    if (isHighCase) {
      const currentCaseHigh = caseNamesHigh[onCaseHigh];
      if (currentCaseHigh === 'Operation Bravo Case') folder = 'operation bravo';
      else if (currentCaseHigh === 'CS:GO Weapon Case') folder = 'weapon case 1';
      else if (currentCaseHigh === 'CS:GO Weapon Case 2') folder = 'kilowatt';
      else if (currentCaseHigh === 'eSports 2013 Winter Case') folder = 'kilowatt';
      else if (currentCaseHigh === 'eSports 2014 Summer Case') folder = 'revolution';
      else folder = 'kilowatt';
    } else {
      const currentCaseLow = caseNamesLow[onCaseLow];
      if (currentCaseLow === 'Kilowatt Case') folder = 'kilowatt';
      else if (currentCaseLow === 'Revolution Case') folder = 'revolution';
      else if (currentCaseLow === 'Fracture Case') folder = 'fracture';
      else folder = 'kilowatt';
    }
    
    const imageName = itemName.split(' | ')[1]?.toLowerCase().replace(/\s+/g, ' ') || 'slag';
    return `/assets/${folder}/${imageName}.png`;
  };
  
  const weightedPool = createWeightedPool(caseItems);
  const wheelItemsArray: { name: string; value: number; rarity: string }[] = [];
  
  for (let i = 0; i < 200; i++) {
    const randomItem = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    wheelItemsArray.push(randomItem);
  }
  
  wheelItemsArray.push(winningItem);
  const winningPosition = wheelItemsArray.length - 1;
  
  for (let i = 0; i < 20; i++) {
    const randomItem = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    wheelItemsArray.push(randomItem);
  }
  
  wheelItemsArray.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = `wheel-item rarity-${item.rarity}`;
    
    const imageUrl = getItemImage(item.name, item.rarity);
    
    itemDiv.innerHTML = `
      <img src="${imageUrl}" alt="${item.name}" class="w-16 h-16 object-contain" onerror="this.style.display='none'">
    `;
    
    wheelItems.appendChild(itemDiv);
  });
  
  const itemWidth = 84;
  const wheelCenter = weaponWheel.offsetWidth / 2;
  
  const finalPosition = -(winningPosition * itemWidth) + wheelCenter - (itemWidth / 2);
  
  document.documentElement.style.setProperty('--final-position', `${finalPosition}px`);
}

function getActualItemImage(itemName: string, onHigh: boolean = false): string {
  let folder = '';
  
  const currentCaseLow = caseNamesLow[onCaseLow];
  const currentCaseHigh = caseNamesHigh[onCaseHigh];
  
  if (onHigh) {
    if (currentCaseHigh === 'Operation Bravo Case') folder = 'operation bravo';
    else if (currentCaseHigh === 'CS:GO Weapon Case') folder = 'weapon case 1';
    else if (currentCaseHigh === 'CS:GO Weapon Case 2') folder = 'weapon case 2';
    else if (currentCaseHigh === 'eSports 2013 Winter Case') folder = 'esports 2013 winter';
    else if (currentCaseHigh === 'eSports 2014 Summer Case') folder = 'esports 2014 summer';
  } else {
    if (currentCaseLow === 'Kilowatt Case') folder = 'kilowatt';
    else if (currentCaseLow === 'Revolution Case') folder = 'revolution';
    else if (currentCaseLow === 'Fracture Case') folder = 'fracture';
    else folder = 'kilowatt';
  }

  const imageName = itemName.split(' | ')[1]?.toLowerCase().replace(/\s+/g, ' ') || 'slag';
  return `/assets/${folder}/${imageName}.png`;
}

function startWheelSpin(): void {
  weaponWheel.classList.add('wheel-spinning');
}

function startCaseOpeningLow() {  
  openSound.pause()
  openSound.currentTime = 0.0
  openSound.play()
  
  openScreen.classList.remove("hidden");
  openScreen.classList.add("absolute");
  
  revealedItem.classList.add("hidden");
  closeOpeningButton.classList.add("hidden");
  weaponWheel.classList.remove('wheel-spinning');
  
  const item = getRandomItem(relationLow[caseNamesLow[onCaseLow]]);
  
  createWheelItems(relationLow[caseNamesLow[onCaseLow]], item, false);
  
  setTimeout(() => {
    startWheelSpin();
  }, 500);
  
  setTimeout(() => {
    totalGain += item.value;
    gainAmountText.innerHTML = "£" + String(totalGain.toFixed(2));
    
    itemName.innerText = item.name;
    itemValue.innerText = "£" + item.value.toFixed(2);
    
    // Set the actual item image (not gold.png for contraband)
    const itemImage = document.getElementById('item-image') as HTMLImageElement;
    if (itemImage) {
      itemImage.src = getActualItemImage(item.name);
      itemImage.alt = item.name;
    }
    
    revealedItem.classList.remove("hidden");
    closeOpeningButton.classList.remove("hidden");
    
  }, 6500);
} 

function startCaseOpeningHigh() {  
  openSound.pause()
  openSound.currentTime = 0.0
  openSound.play()
  
  openScreen.classList.remove("hidden");
  openScreen.classList.add("absolute");
  
  revealedItem.classList.add("hidden");
  closeOpeningButton.classList.add("hidden");
  weaponWheel.classList.remove('wheel-spinning');
  
  const item = getRandomItem(relationHigh[caseNamesHigh[onCaseHigh]]);
  
  createWheelItems(relationHigh[caseNamesHigh[onCaseHigh]], item, true);
  
  setTimeout(() => {
    startWheelSpin();
  }, 500);
  
  setTimeout(() => {
    totalGain += item.value;
    gainAmountText.innerHTML = "£" + String(totalGain.toFixed(2));
    
    itemName.innerText = item.name;
    itemValue.innerText = "£" + item.value.toFixed(2);
    
    // Set the actual item image (not gold.png for contraband)
    const itemImage = document.getElementById('item-image') as HTMLImageElement;
    if (itemImage) {
      itemImage.src = getActualItemImage(item.name);
      itemImage.alt = item.name;
    }
    
    revealedItem.classList.remove("hidden");
    closeOpeningButton.classList.remove("hidden");
    
  }, 6500);
} 


nextButtonLow.addEventListener("click", async () => {
  if (! caseLoaded) {
    return
  }
  onCaseLow += 1
  if (onCaseLow > caseNamesLow.length - 1) {
    onCaseLow = 0
  }
  caseImageLow.src = casesLow[caseNamesLow[onCaseLow]]
  caseNameLow.innerText = caseNamesLow[onCaseLow]
  await fetchPriceLow(caseNamesLow[onCaseLow])

})

prevButtonLow.addEventListener("click", async () => {
  if (! caseLoaded) {
    return
  }
  onCaseLow -= 1
  if (onCaseLow <= -1) {
    onCaseLow = caseNamesLow.length - 1
  }
  caseImageLow.src = casesLow[caseNamesLow[onCaseLow]]
  caseNameLow.innerText = caseNamesLow[onCaseLow]
  await fetchPriceLow(caseNamesLow[onCaseLow])

})

buyButtonLow.addEventListener("click", () => {
  if (!caseLoaded) {
    return
  }
  totalSpent += marketPriceLow
  totalGain -= marketPriceLow
  spentAmountText.innerHTML = "£" + String(totalSpent.toFixed(2))
  gainAmountText.innerHTML = "£" + String(totalGain.toFixed(2))
  
  startCaseOpeningLow()
})

nextButtonHigh.addEventListener("click", async () => {
  if (! caseLoaded) {
    return
  }
  onCaseHigh += 1
  if (onCaseHigh > caseNamesHigh.length - 1) {
    onCaseHigh = 0
  }
  caseImageHigh.src = casesHigh[caseNamesHigh[onCaseHigh]]
  caseNameHigh.innerText = caseNamesHigh[onCaseHigh]
  await fetchPriceHigh(caseNamesHigh[onCaseHigh])

})

prevButtonHigh.addEventListener("click", async () => {
  if (! caseLoaded) {
    return
  }
  onCaseHigh -= 1
  if (onCaseHigh <= -1) {
    onCaseHigh = caseNamesHigh.length - 1
  }
  caseImageHigh.src = casesHigh[caseNamesHigh[onCaseHigh]]
  caseNameHigh.innerText = caseNamesHigh[onCaseHigh]
  await fetchPriceHigh(caseNamesHigh[onCaseHigh])

})

buyButtonHigh.addEventListener("click", () => {
  if (!caseLoaded) {
    return
  }
  totalSpent += marketPriceHigh
  totalGain -= marketPriceHigh
  spentAmountText.innerHTML = "£" + String(totalSpent.toFixed(2))
  gainAmountText.innerHTML = "£" + String(totalGain.toFixed(2))
  
  startCaseOpeningHigh()
})

closeOpeningButton.addEventListener("click", () => {
  openScreen.classList.add("hidden")
  openScreen.classList.remove("absolute")
  weaponWheel.classList.remove('wheel-spinning')
  wheelItems.innerHTML = ''
})

document.addEventListener("DOMContentLoaded", async () => {
  await fetchPriceLow("Kilowatt Case")
  await fetchPriceHigh("Operation Bravo Case")
});

//(window as any).fetchPrice = fetchPriceLow