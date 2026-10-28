import assert from 'node:assert';
import http from 'node:http';
import app from '../src/app.js';
import { notFound } from '../src/middleware/notFound.js';
import { errorHandler } from '../src/middleware/errorHandler.js';

// Setup test server on ephemeral port
const testApp = app;
testApp.use(notFound);
testApp.use(errorHandler);

let server;
let baseUrl = '';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const reqOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    };

    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed, headers: res.headers });
        } catch {
          resolve({ status: res.statusCode, raw: data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n🧪 [RecipeHub API Test Suite]');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Error: ${err.message}`);
      failed++;
    }
  }

  // Start test server
  await new Promise((resolve) => {
    server = testApp.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });

  let createdRecipeId = null;

  try {
    // 1. Health check
    await test('GET /api/health returns 200 and healthy status', async () => {
      const res = await request('/api/health');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.status, 'healthy');
    });

    // 2. List recipes
    await test('GET /api/recipes returns paginated recipe list', async () => {
      const res = await request('/api/recipes');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert(Array.isArray(res.body.data));
      assert(res.body.pagination);
      assert(res.body.data.length > 0);
    });

    // 3. Category filtering
    await test('GET /api/recipes?category=Breakfast filters by category', async () => {
      const res = await request('/api/recipes?category=Breakfast');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      for (const item of res.body.data) {
        assert.strictEqual(item.category, 'Breakfast');
      }
    });

    // 4. Difficulty filtering
    await test('GET /api/recipes?difficulty=Easy filters by difficulty', async () => {
      const res = await request('/api/recipes?difficulty=Easy');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      for (const item of res.body.data) {
        assert.strictEqual(item.difficulty, 'Easy');
      }
    });

    // 5. Search filtering
    await test('GET /api/recipes?search=pasta matches relevant recipes', async () => {
      const res = await request('/api/recipes?search=pasta');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert(res.body.data.length > 0);
    });

    // 6. Pagination limits
    await test('GET /api/recipes?page=1&limit=2 respects pagination boundaries', async () => {
      const res = await request('/api/recipes?page=1&limit=2');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.pagination.limit, 2);
      assert.strictEqual(res.body.data.length, 2);
      assert.strictEqual(res.body.pagination.page, 1);
    });

    // 7. Create a valid recipe
    await test('POST /api/recipes creates a new recipe and returns 201', async () => {
      const newRecipePayload = {
        title: 'Citrus Thyme Glazed Salmon',
        description: 'Pan roasted salmon fillet glazed with fresh orange reduction and wild garden thyme.',
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
        category: 'Dinner',
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        difficulty: 'Easy',
        ingredients: [
          { name: 'Salmon fillet', quantity: '2 portions' },
          { name: 'Fresh orange juice', quantity: '1/2 cup' },
          { name: 'Thyme sprigs', quantity: '4 stems' }
        ],
        instructions: [
          { stepNumber: 1, description: 'Season salmon with salt and pepper.' },
          { stepNumber: 2, description: 'Sear in hot skillet for 4 minutes per side with orange glaze.' }
        ]
      };

      const res = await request('/api/recipes', {
        method: 'POST',
        body: newRecipePayload,
      });

      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      assert(res.body.data._id || res.body.data.id);
      createdRecipeId = res.body.data._id || res.body.data.id;
    });

    // 8. Fetch newly created recipe by ID
    await test('GET /api/recipes/:id retrieves the created recipe', async () => {
      assert(createdRecipeId, 'Requires createdRecipeId');
      const res = await request(`/api/recipes/${createdRecipeId}`);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.title, 'Citrus Thyme Glazed Salmon');
    });

    // 9. Reject invalid recipe data (missing required title & negative prep time)
    await test('POST /api/recipes rejects invalid recipe payload with 400', async () => {
      const badPayload = {
        title: '',
        description: '',
        category: 'InvalidCategory',
        prepTime: -5,
      };

      const res = await request('/api/recipes', {
        method: 'POST',
        body: badPayload,
      });

      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert(Array.isArray(res.body.errors));
      assert(res.body.errors.length > 0);
    });

    // 10. Update an existing recipe
    await test('PUT /api/recipes/:id updates existing recipe fields', async () => {
      assert(createdRecipeId, 'Requires createdRecipeId');
      const updatePayload = {
        title: 'Citrus Thyme Glazed Salmon (Grand Reserve)',
        description: 'Updated description for master edition.',
        category: 'Dinner',
        prepTime: 12,
        cookTime: 18,
        servings: 3,
        difficulty: 'Medium',
        ingredients: [
          { name: 'Wild salmon fillet', quantity: '3 portions' },
          { name: 'Fresh blood orange juice', quantity: '3/4 cup' }
        ],
        instructions: [
          { stepNumber: 1, description: 'Marinate briefly and pan sear.' }
        ]
      };

      const res = await request(`/api/recipes/${createdRecipeId}`, {
        method: 'PUT',
        body: updatePayload,
      });

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.title, 'Citrus Thyme Glazed Salmon (Grand Reserve)');
      assert.strictEqual(res.body.data.servings, 3);
    });

    // 11. Delete the recipe
    await test('DELETE /api/recipes/:id deletes the recipe and returns 200', async () => {
      assert(createdRecipeId, 'Requires createdRecipeId');
      const res = await request(`/api/recipes/${createdRecipeId}`, {
        method: 'DELETE',
      });

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
    });

    // 12. Return 404 for missing or already deleted recipe
    await test('GET /api/recipes/:id returns 404 for nonexistent recipe ID', async () => {
      const res = await request('/api/recipes/nonexistent-id-999999');
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });

  } finally {
    server.close();
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🏁 Test Summary: ${passed} Passed, ${failed} Failed\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
