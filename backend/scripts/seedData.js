export const initialRecipes = [
  {
    title: 'Creamy Tuscan Garlic Herb Fettuccine',
    description: 'Silky egg fettuccine tossed in a rich sun-dried tomato and roasted garlic cream sauce, finished with toasted pine nuts, fresh sweet basil, and aged parmigiano-reggiano.',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281223?auto=format&fit=crop&w=1200&q=80',
    category: 'Vegetarian',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    featured: true,
    ingredients: [
      { name: 'Fresh egg fettuccine pasta', quantity: '400g' },
      { name: 'Heavy whipping cream', quantity: '1 cup (240ml)' },
      { name: 'Sun-dried tomatoes in olive oil, julienned', quantity: '1/2 cup (80g)' },
      { name: 'Garlic cloves, finely minced', quantity: '5 cloves' },
      { name: 'Fresh baby spinach leaves', quantity: '3 cups (90g)' },
      { name: 'Parmigiano-Reggiano, freshly grated', quantity: '3/4 cup (75g)' },
      { name: 'Toasted pine nuts', quantity: '2 tbsp' },
      { name: 'Extra virgin olive oil', quantity: '2 tbsp' },
      { name: 'Fresh basil leaves, torn', quantity: '1/4 cup' },
      { name: 'Flaky sea salt & freshly cracked black pepper', quantity: 'To taste' },
      { name: 'Crushed red pepper flakes', quantity: '1/4 tsp' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Bring a large pot of generously salted water to a rolling boil. Cook fettuccine according to package instructions until al dente. Reserve 1/2 cup of starchy pasta water before draining.' },
      { stepNumber: 2, description: 'While pasta cooks, warm olive oil in a wide heavy-bottomed skillet over medium heat. Add minced garlic and crushed red pepper flakes. Sauté gently for 60 seconds until fragrant without browning.' },
      { stepNumber: 3, description: 'Stir in the julienned sun-dried tomatoes and cook for 2 minutes to release their sweet tomato oil into the pan.' },
      { stepNumber: 4, description: 'Pour in the heavy cream and bring to a gentle simmer. Reduce heat to medium-low and let reduce slightly for 3 to 4 minutes.' },
      { stepNumber: 5, description: 'Fold in the fresh baby spinach and stir until gently wilted, about 1 minute. Whisk in the grated Parmigiano-Reggiano until smooth and glossy.' },
      { stepNumber: 6, description: 'Transfer the drained pasta directly into the sauce. Toss vigorously to coat every strand, splashing in reserved pasta water 1 tablespoon at a time if sauce needs loosening.' },
      { stepNumber: 7, description: 'Plate immediately in warm shallow bowls. Garnish with toasted pine nuts, freshly torn basil, additional grated parmigiano, and a crack of black pepper.' }
    ]
  },
  {
    title: 'Golden Shakshuka with Poached Eggs & Sheep Feta',
    description: 'A vibrant North African morning staple of gently poached organic eggs nestled in a spiced cumin and smoked paprika tomato pepper sauce, topped with crumbled feta and warm crusty sourdough.',
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1200&q=80',
    category: 'Breakfast',
    prepTime: 10,
    cookTime: 25,
    servings: 3,
    difficulty: 'Easy',
    featured: true,
    ingredients: [
      { name: 'Large organic pasture-raised eggs', quantity: '5 whole' },
      { name: 'San Marzano whole peeled tomatoes, crushed by hand', quantity: '1 can (800g)' },
      { name: 'Red bell pepper, thinly sliced', quantity: '1 large' },
      { name: 'Yellow onion, diced', quantity: '1 medium' },
      { name: 'Garlic cloves, thinly sliced', quantity: '4 cloves' },
      { name: 'Ground cumin & ground coriander', quantity: '1 tsp each' },
      { name: 'Smoked Spanish paprika', quantity: '1.5 tsp' },
      { name: 'Harissa paste (optional for heat)', quantity: '1 tbsp' },
      { name: 'Crumbled sheep milk feta cheese', quantity: '1/2 cup (70g)' },
      { name: 'Fresh cilantro and flat-leaf parsley', quantity: '1/3 cup, chopped' },
      { name: 'Extra virgin olive oil', quantity: '3 tbsp' },
      { name: 'Artisan sourdough bread, toasted', quantity: 'For serving' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Heat extra virgin olive oil in a 10-inch cast iron skillet over medium heat. Add diced onions and sliced red bell pepper. Cook until softened and lightly caramelized, about 8 minutes.' },
      { stepNumber: 2, description: 'Add garlic, ground cumin, coriander, smoked paprika, and harissa paste. Stir continuously for 90 seconds until the spices bloom and become deeply aromatic.' },
      { stepNumber: 3, description: 'Pour in the hand-crushed tomatoes with their juices. Season with sea salt and black pepper. Simmer uncovered over medium-low heat for 12–15 minutes until the sauce thickens into a rich ragout.' },
      { stepNumber: 4, description: 'Use the back of a large wooden spoon to create 5 distinct wells in the sauce. Crack an egg gently into each well.' },
      { stepNumber: 5, description: 'Cover the skillet with a lid and cook on low heat for 5 to 7 minutes, until the egg whites are just set and opaque while the yolks remain deliciously runny.' },
      { stepNumber: 6, description: 'Remove from heat. Scatter crumbled feta, chopped cilantro, and fresh flat-leaf parsley over the skillet.' },
      { stepNumber: 7, description: 'Serve hot straight from the skillet alongside thick slices of grilled sourdough for scooping up the spiced sauce and golden yolks.' }
    ]
  },
  {
    title: 'Basque Burnt Cheesecake with Wild Blackberry Compote',
    description: 'An iconic caramelized Spanish cheesecake with an ultra-creamy custard center, scorched mahogany crust, and an unctuous tart wild blackberry compote.',
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80',
    category: 'Desserts',
    prepTime: 20,
    cookTime: 45,
    servings: 8,
    difficulty: 'Medium',
    featured: true,
    ingredients: [
      { name: 'Full-fat cream cheese, room temperature', quantity: '900g (32 oz)' },
      { name: 'Granulated pure cane sugar', quantity: '1 1/3 cups (270g)' },
      { name: 'Large whole eggs + egg yolk, room temp', quantity: '5 large + 1 yolk' },
      { name: 'Heavy cream (36% fat)', quantity: '1 3/4 cups (420ml)' },
      { name: 'Unbleached all-purpose flour', quantity: '2 tbsp (20g)' },
      { name: 'Pure Madagascar vanilla bean paste', quantity: '1.5 tsp' },
      { name: 'Fine sea salt', quantity: '1/2 tsp' },
      { name: 'Fresh wild blackberries', quantity: '2 cups (300g)' },
      { name: 'Fresh lemon juice', quantity: '1 tbsp' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Preheat oven to 425°F (220°C). Butter a 9-inch springform pan and line with two overlapping sheets of parchment paper, leaving 2 inches overhang above the rim.' },
      { stepNumber: 2, description: 'In a stand mixer fitted with paddle attachment, beat the softened cream cheese and sugar on medium-low speed for 2 minutes until creamy and completely lump-free.' },
      { stepNumber: 3, description: 'Add eggs one at a time, incorporating fully before adding the next. Blend in vanilla paste and sea salt.' },
      { stepNumber: 4, description: 'Whisk flour into heavy cream in a small measuring cup until smooth, then gently pour into the batter on low speed just until homogenous. Do not overbeat.' },
      { stepNumber: 5, description: 'Pour batter into prepared pan. Bake for 42–48 minutes until the top is deeply caramelized dark brown with a dramatic custard wobble in the center.' },
      { stepNumber: 6, description: 'Cool on a wire rack at room temperature for 3 hours, then chill in the refrigerator for at least 4 hours to set.' },
      { stepNumber: 7, description: 'Simmer blackberries, 2 tbsp sugar, and lemon juice in a small saucepan for 6 minutes until syrupy. Slice cheesecake into wedges and spoon warm compote over top.' }
    ]
  },
  {
    title: 'Pan-Seared Wild Salmon with Meyer Lemon Risotto',
    description: 'Crispy skin wild king salmon fillets served atop a velvety Meyer lemon and mascarpone arborio risotto with tender asparagus tips and chervil oil.',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    category: 'Dinner',
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    difficulty: 'Medium',
    featured: true,
    ingredients: [
      { name: 'Wild king salmon fillets, skin-on', quantity: '4 portions (180g each)' },
      { name: 'Carnaroli or Arborio risotto rice', quantity: '1 1/2 cups (300g)' },
      { name: 'Warm vegetable or chicken stock', quantity: '5 cups (1.2L)' },
      { name: 'Dry crisp white wine (Sauvignon Blanc)', quantity: '1/2 cup (120ml)' },
      { name: 'Shallots, finely minced', quantity: '2 medium' },
      { name: 'Meyer lemon (zest and juice)', quantity: '1 large' },
      { name: 'Italian mascarpone cheese', quantity: '3 tbsp' },
      { name: 'Pecorino Romano, freshly grated', quantity: '1/2 cup (50g)' },
      { name: 'Tender pencil asparagus, cut into 1-inch batons', quantity: '1 bunch' },
      { name: 'Unsalted butter & avocado oil', quantity: '3 tbsp each' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Keep stock simmering gently in a small pot. In a separate heavy saucepan, melt 2 tbsp butter with 1 tbsp olive oil over medium-low heat. Add minced shallots and sweat until translucent.' },
      { stepNumber: 2, description: 'Add the rice and toast for 2 minutes until translucent around edges. Pour in white wine and stir until fully absorbed.' },
      { stepNumber: 3, description: 'Add hot stock one ladle at a time, stirring steadily and letting liquid absorb before adding the next ladle. After 14 minutes, fold in asparagus batons.' },
      { stepNumber: 4, description: 'Remove risotto from heat when al dente (approx 18 mins). Vigorously beat in mascarpone, pecorino, Meyer lemon zest, and 2 tbsp lemon juice (mantecatura). Cover and rest for 2 minutes.' },
      { stepNumber: 5, description: 'Pat salmon fillets bone-dry with paper towels and score skin lightly. Season with flaky sea salt.' },
      { stepNumber: 6, description: 'Heat avocado oil in a stainless steel skillet until shimmering. Place salmon skin-side down, press gently with a fish spatula for 10 seconds, and sear over medium-high heat for 4 minutes until skin is shattering crisp.' },
      { stepNumber: 7, description: 'Flip and kiss the flesh side for 60–90 seconds for medium-rare center. Spoon creamy lemon risotto into warmed bowls and crown with crispy salmon.' }
    ]
  },
  {
    title: '15-Minute Sesame Ginger Crispy Tofu & Snap Pea Noodle Bowl',
    description: 'Crisp sesame-crusted tofu cubes, crunchy sugar snap peas, and delicate soba noodles tossed in an aromatic toasted sesame, garlic, and fresh ginger glaze.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    category: 'Quick Meals',
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    featured: false,
    ingredients: [
      { name: 'Extra-firm organic tofu, pressed and cubed', quantity: '400g (1 block)' },
      { name: 'Japanese buckwheat soba noodles', quantity: '200g' },
      { name: 'Fresh sugar snap peas, trimmed', quantity: '2 cups (150g)' },
      { name: 'Cornstarch for coating', quantity: '2 tbsp' },
      { name: 'Tamari or low-sodium soy sauce', quantity: '3 tbsp' },
      { name: 'Toasted sesame oil', quantity: '2 tbsp' },
      { name: 'Pure maple syrup or agave', quantity: '1.5 tbsp' },
      { name: 'Fresh ginger root, grated', quantity: '1 tbsp' },
      { name: 'Garlic cloves, grated', quantity: '2 cloves' },
      { name: 'Toasted white & black sesame seeds', quantity: '1 tbsp' },
      { name: 'Scallions, thinly sliced on bias', quantity: '3 stalks' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Cook soba noodles in boiling water for 4 minutes. Drain and immediately rinse under ice-cold running water to halt cooking and remove excess starch. Set aside.' },
      { stepNumber: 2, description: 'Toss pressed tofu cubes with cornstarch and a pinch of salt until uniformly coated.' },
      { stepNumber: 3, description: 'Heat 1.5 tbsp sesame oil in a large wok or cast iron skillet over high heat. Fry tofu for 6–8 minutes, rotating cubes until golden and shatteringly crisp on all sides.' },
      { stepNumber: 4, description: 'Whisk together tamari, maple syrup, remaining sesame oil, grated ginger, and grated garlic in a bowl.' },
      { stepNumber: 5, description: 'Toss sugar snap peas into the wok with the crispy tofu and stir-fry for 90 seconds until vibrant green and tender-crisp.' },
      { stepNumber: 6, description: 'Add the rinsed soba noodles and pour the ginger sesame sauce over everything. Toss rapidly over high heat for 1 minute until sauce glazes the noodles.' },
      { stepNumber: 7, description: 'Divide into bowls and finish with sliced scallions and toasted sesame seeds.' }
    ]
  },
  {
    title: 'Artisanal Brioche French Toast with Caramelized Vanilla Pear',
    description: 'Thick cut golden brioche soaked in an orange-scented Madagascar vanilla custard, pan-griddled in sweet butter and topped with warm skillet-caramelized Bosc pears and pure Quebec maple syrup.',
    imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=80',
    category: 'Breakfast',
    prepTime: 12,
    cookTime: 12,
    servings: 4,
    difficulty: 'Easy',
    featured: false,
    ingredients: [
      { name: 'Day-old artisan brioche loaf, sliced 1.25 inches thick', quantity: '6 thick slices' },
      { name: 'Large free-range eggs', quantity: '4 large' },
      { name: 'Whole milk & heavy cream mixture (half-and-half)', quantity: '3/4 cup (180ml)' },
      { name: 'Vanilla bean paste or extract', quantity: '1.5 tsp' },
      { name: 'Ground Ceylon cinnamon & nutmeg', quantity: '1/2 tsp cinnamon, pinch nutmeg' },
      { name: 'Orange zest, finely grated', quantity: '1 tsp' },
      { name: 'Bosc or Anjou pears, cored and thinly wedged', quantity: '2 medium' },
      { name: 'Unsalted cultured butter', quantity: '4 tbsp' },
      { name: 'Brown sugar or maple sugar', quantity: '2 tbsp' },
      { name: 'Warm pure maple syrup', quantity: 'For drizzling' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Whisk together eggs, milk/cream, vanilla bean paste, cinnamon, nutmeg, and fresh orange zest in a shallow wide dish.' },
      { stepNumber: 2, description: 'In a separate skillet, melt 1.5 tbsp butter over medium heat. Add pear wedges and brown sugar. Sauté for 5 minutes until caramelized, golden, and fork-tender.' },
      { stepNumber: 3, description: 'Warm a large cast iron griddle over medium heat and melt remaining butter.' },
      { stepNumber: 4, description: 'Dip each brioche slice into the custard mixture for 15–20 seconds per side, allowing the bread to absorb custard without becoming soggy.' },
      { stepNumber: 5, description: 'Place soaked brioche on the hot griddle. Cook for 3–4 minutes per side until puffed, deeply golden-brown, and caramelized.' },
      { stepNumber: 6, description: 'Plate two slices per serving. Crown with the warm caramelized pears and drizzle with pure warmed maple syrup.' }
    ]
  },
  {
    title: 'Mediterranean Herb Grilled Chicken & Quinoa Harvest Bowl',
    description: 'Juicy marinated lemon oregano chicken breast over fluffy quinoa, crisp Persian cucumbers, Kalamata olives, cherry tomatoes, and creamy lemon-tahini dressing.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    category: 'Lunch',
    prepTime: 15,
    cookTime: 15,
    servings: 3,
    difficulty: 'Easy',
    featured: false,
    ingredients: [
      { name: 'Organic chicken breasts or boneless thighs', quantity: '500g (1.1 lbs)' },
      { name: 'Cooked tri-color quinoa', quantity: '3 cups cooked' },
      { name: 'Persian cucumbers, diced', quantity: '2 medium' },
      { name: 'Heirloom cherry tomatoes, halved', quantity: '1 cup (150g)' },
      { name: 'Pitted Kalamata olives', quantity: '1/2 cup' },
      { name: 'Pickled red onions', quantity: '1/3 cup' },
      { name: 'Fresh oregano, thyme, and rosemary', quantity: '2 tbsp finely chopped' },
      { name: 'Fresh lemon juice & olive oil', quantity: '3 tbsp each' },
      { name: 'Tahini paste', quantity: '3 tbsp' },
      { name: 'Warm water to thin dressing', quantity: '2-3 tbsp' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Whisk 2 tbsp olive oil, 2 tbsp lemon juice, chopped herbs, 2 minced garlic cloves, salt, and pepper. Marinate chicken for 15 minutes.' },
      { stepNumber: 2, description: 'In a small bowl, whisk tahini, 1 tbsp lemon juice, 1 minced garlic clove, salt, and warm water until a silky pourable dressing forms.' },
      { stepNumber: 3, description: 'Grill or pan-sear chicken on medium-high heat for 6–7 minutes per side until nicely charred and internal temp hits 165°F (74°C). Rest for 5 minutes, then slice against the grain.' },
      { stepNumber: 4, description: 'Divide fluffy quinoa among wide bowls. Arrange sliced herb chicken, diced cucumbers, halved tomatoes, Kalamata olives, and pickled red onions in sections.' },
      { stepNumber: 5, description: 'Drizzle generously with lemon-tahini sauce and finish with a sprinkle of fresh oregano leaves.' }
    ]
  },
  {
    title: 'Moroccan Spiced Chickpea & Apricot Vegetable Tagine',
    description: 'Slow-simmered butternut squash, carrots, and nutty chickpeas infused with saffron, cinnamon, turmeric, and Turkish apricots, served over aromatic coriander couscous.',
    imageUrl: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80',
    category: 'Dinner',
    prepTime: 20,
    cookTime: 35,
    servings: 4,
    difficulty: 'Easy',
    featured: false,
    ingredients: [
      { name: 'Cooked chickpeas (drained)', quantity: '2 cans (800g)' },
      { name: 'Butternut squash, peeled and cubed', quantity: '3 cups (400g)' },
      { name: 'Carrots, sliced in rounds', quantity: '2 large' },
      { name: 'Dried Turkish apricots, halved', quantity: '1/2 cup (80g)' },
      { name: 'Crushed canned tomatoes', quantity: '1 can (400g)' },
      { name: 'Vegetable stock', quantity: '1 1/2 cups (360ml)' },
      { name: 'Ras el Hanout spice blend', quantity: '1.5 tbsp' },
      { name: 'Cinnamon stick', quantity: '1 whole' },
      { name: 'Toasted flaked almonds', quantity: '1/4 cup' },
      { name: 'Fluffy steamed couscous', quantity: 'For serving' }
    ],
    instructions: [
      { stepNumber: 1, description: 'Heat olive oil in a Dutch oven or tagine over medium heat. Sauté diced onions, ginger, and garlic for 4 minutes until sweet and soft.' },
      { stepNumber: 2, description: 'Add Ras el Hanout, cinnamon stick, and ground cumin. Stir constantly for 1 minute until fragrant.' },
      { stepNumber: 3, description: 'Add butternut squash, carrots, chickpeas, and dried apricots. Stir to coat thoroughly in spices.' },
      { stepNumber: 4, description: 'Pour in crushed tomatoes and vegetable stock. Season with salt. Bring to a boil, then reduce heat to low, cover, and simmer for 25–30 minutes until squash is tender.' },
      { stepNumber: 5, description: 'Uncover during the last 5 minutes if sauce needs reduction to a glossy stew consistency.' },
      { stepNumber: 6, description: 'Serve over a bed of warm steamed couscous. Garnish with toasted almonds and fresh mint leaves.' }
    ]
  }
];
