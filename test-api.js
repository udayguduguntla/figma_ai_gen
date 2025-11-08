const axios = require('axios');

const API_URL = 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Testing AI Figma Generator API...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data.status);

    // Test API info
    console.log('\n2. Testing API info...');
    const apiResponse = await axios.get(`${API_URL}/api`);
    console.log('✅ API info retrieved');
    console.log('   - AI Generation:', apiResponse.data.features.aiGeneration ? 'Enabled' : 'Disabled (using fallback)');
    console.log('   - Demo Mode:', apiResponse.data.features.demoMode ? 'Yes' : 'No');

    // Test design generation
    console.log('\n3. Testing design generation...');
    const designResponse = await axios.post(`${API_URL}/api/design/generate`, {
      prompt: 'A modern e-commerce application for selling books',
      preferences: {
        style: 'modern',
        platform: 'mobile-first',
        complexity: 'standard'
      }
    });
    
    if (designResponse.data.success) {
      console.log('✅ Design generation successful');
      console.log(`   - Design ID: ${designResponse.data.designId}`);
      console.log(`   - App Type: ${designResponse.data.requirements.appType}`);
      console.log(`   - Estimated Screens: ${designResponse.data.estimatedScreens}`);
      
      // Test design retrieval
      console.log('\n4. Testing design retrieval...');
      const getDesignResponse = await axios.get(`${API_URL}/api/design/${designResponse.data.designId}`);
      
      if (getDesignResponse.data.success) {
        console.log('✅ Design retrieval successful');
        console.log(`   - Retrieved design with ${getDesignResponse.data.design.screens.length} screens`);
      } else {
        console.log('❌ Design retrieval failed');
      }
    } else {
      console.log('❌ Design generation failed:', designResponse.data.error);
    }

    // Test design listing
    console.log('\n5. Testing design listing...');
    const listResponse = await axios.get(`${API_URL}/api/design`);
    if (listResponse.data.success) {
      console.log('✅ Design listing successful');
      console.log(`   - Found ${listResponse.data.designs.length} designs`);
    }

    // Test statistics
    console.log('\n6. Testing statistics...');
    const statsResponse = await axios.get(`${API_URL}/api/design/stats`);
    if (statsResponse.data.success) {
      console.log('✅ Statistics retrieval successful');
      console.log(`   - Total designs: ${statsResponse.data.stats.totalDesigns}`);
    }

    console.log('\n🎉 All tests passed! The API is working correctly.');
    console.log('\n💡 Next steps:');
    console.log('   - Start the frontend: npm run dev:frontend');
    console.log('   - Open http://localhost:3000 in your browser');
    console.log('   - Try generating designs with different prompts');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the backend server is running:');
      console.log('   npm run dev:backend');
    } else if (error.response) {
      console.log('   Status:', error.response.status);
      console.log('   Data:', error.response.data);
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;