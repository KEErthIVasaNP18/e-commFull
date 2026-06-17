const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./model/category');
const Post = require('./model/post');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const categories = [
  {
    Category: "Men",
    Slug: "Men",
    About: "Discover our exclusive collection of men's dresses, tailored for every occasion."
  },
  {
    Category: "Women",
    Slug: "Women",
    About: "Explore our elegant collection of women's dresses for every style and occasion."
  },
  {
    Category: "Kids",
    Slug: "Kids",
    About: "Discover our adorable and comfortable collection of kids' dresses for all ages."
  },
  {
    Category: "Electronics",
    Slug: "Electronics",
    About: "Upgrade your life with the latest electronics at unbeatable prices."
  }
];

const products = [
  {
    Img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&auto=format",
    Name: "Classic Men's Blazer",
    Category: "Men",
    About: "Premium tailored blazer for men. Perfect for formal occasions and office wear. Made with high-quality fabric.",
    Price: 2999
  },
  {
    Img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format",
    Name: "Elegant Women's Kurta",
    Category: "Women",
    About: "Beautiful embroidered kurta for women. Comfortable cotton fabric with elegant design. Ideal for festivals.",
    Price: 1499
  },
  {
    Img: "https://images.unsplash.com/photo-1628082877849-2e3bf8c26db1?w=500&auto=format",
    Name: "Kids Party Wear Set",
    Category: "Kids",
    About: "Colorful party wear outfit for kids. Soft breathable fabric with fun prints. Perfect for celebrations.",
    Price: 899
  },
  {
    Img: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=500&auto=format",
    Name: "Wireless Bluetooth Headphones",
    Category: "Electronics",
    About: "High-quality wireless headphones with deep bass. 30hr battery life, noise cancellation, comfortable fit.",
    Price: 2499
  },
  {
    Img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format",
    Name: "Smart Fitness Watch",
    Category: "Electronics",
    About: "Advanced smartwatch with heart rate monitor, step tracker, sleep analysis. Water resistant with 7 day battery.",
    Price: 3999
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 60000,
      connectTimeoutMS: 60000,
      socketTimeoutMS: 60000
    });
    console.log('MongoDB connected for seeding');

    await Category.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing categories and posts');

    const createdCategories = await Category.insertMany(categories);
    console.log(`Seeded ${createdCategories.length} categories`);

    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.Category] = cat._id;
    });

    const productsWithCategoryIds = products.map(product => ({
      Img: product.Img,
      Name: product.Name,
      Category: categoryMap[product.Category],
      About: product.About,
      Price: product.Price
    }));

    const createdPosts = await Post.insertMany(productsWithCategoryIds);
    console.log(`Seeded ${createdPosts.length} products`);
    console.log('\n--- Seeded Products ---');
    createdPosts.forEach((p, i) => {
      console.log(`${i + 1}. ${p.Name} - ₹${p.Price} (Img: ${p.Img.substring(0, 50)}...)`);
    });

    await mongoose.disconnect();
    console.log('\nDatabase seeding completed successfully!');
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
}

seed();