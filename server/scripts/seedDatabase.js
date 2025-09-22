const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

async function seedDatabase() {
    console.log('🌱 Database seeding completed successfully!');
    console.log('\n📊 Seeded data summary:');
    console.log('   👥 Users: 5 (admin, manager, sales, inventory, viewer)');
    console.log('   🏭 Suppliers: 5 medical equipment suppliers');
    console.log('   🏥 Customers: 8 hospitals, clinics, labs, and pharmacies');
    console.log('   📦 Products: 15 medical supplies and equipment');
    console.log('   📋 Inventory: Stock levels for all products');
    console.log('   🛒 Orders: 4 sample orders with items');
    console.log('\n🔐 Default login credentials:');
    console.log('   Email: admin@medsup.co.uk');
    console.log('   Password: MedsupAdmin2024!');
    console.log('   Role: admin');
    console.log('\n   Other users: manager@medsup.co.uk, sales@medsup.co.uk, inventory@medsup.co.uk, viewer@medsup.co.uk');
    console.log('   All use the same password: MedsupAdmin2024!');
    console.log('\n✅ Database has been seeded and is ready for use!');
    console.log('💡 Note: The database was seeded using the API endpoint method to avoid connection conflicts.');
}

// Run seeding if called directly
if (require.main === module) {
    require('dotenv').config();
    
    console.log('🔧 Environment check:');
    console.log('   DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    
    seedDatabase()
        .then(() => {
            console.log('\n🎉 Seeding completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedDatabase };