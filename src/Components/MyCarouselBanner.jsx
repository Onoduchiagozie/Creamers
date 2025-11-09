// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');
//
// // Your API Key and Base URL for Pixabay
// const API_KEY = '47388003-6bc93658f1f5d4e7d32f911b1';
// const BASE_URL = 'https://pixabay.com/api/';
//
// // Array of body parts
// const BodyParts = [
//   'back',
//   'cardio',
//   'chest',
//   'lower arms',
//   'lower legs',
//   'neck',
//   'shoulders',
//   'upper arms',
//   'upper legs',
//   'waist',
// ];
//
// // Directory to save the images
// const outputDir = path.join(__dirname, 'body_parts_images');
// if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
//
// // Function to fetch and save images
// const fetchAndSaveBodyPartsImages = async () => {
//   for (const bodyPart of BodyParts) {
//     const query = encodeURIComponent(`${bodyPart} gym exercise`); // Add "gym exercise" to refine search
//     const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&category=sports&per_page=3`;
//
//     try {
//       const response = await axios.get(url);
//
//       // Filter results to include only images tagged with "gym", "exercise", or "fitness"
//       const relevantImage = response.data.hits.find(hit =>
//         hit.tags.toLowerCase().includes('gym') ||
//         hit.tags.toLowerCase().includes('exercise') ||
//         hit.tags.toLowerCase().includes('fitness')
//       );
//
//       if (relevantImage) {
//         const imageUrl = relevantImage.largeImageURL;
//         const imagePath = path.join(outputDir, `${bodyPart.replace(/ /g, '_')}.jpg`); // Replace spaces with underscores
//
//         // Fetch and save the image
//         const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
//         const writer = fs.createWriteStream(imagePath);
//         imageResponse.data.pipe(writer);
//
//         await new Promise((resolve, reject) => {
//           writer.on('finish', resolve);
//           writer.on('error', reject);
//         });
//
//         console.log(`Downloaded and saved: ${bodyPart}`);
//       } else {
//         console.log(`No relevant images found for: ${bodyPart}`);
//       }
//     } catch (error) {
//       console.error(`Error fetching image for ${bodyPart}: ${error.message}`);
//     }
//   }
// };
//
// // Execute the function
// fetchAndSaveBodyPartsImages().then(() => {
//   console.log('Image downloading for body parts completed.');
// }).catch((err) => {
//   console.error('Error in downloading body parts images:', err);
// });
