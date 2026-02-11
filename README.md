# Anthia & Ornaments - Developer Guide

## Content Management Guide

This website is designed for easy content updates without touching the code. Follow this guide to update images, videos, and content.

## Folder Structure for Media Files

Create these folders in the `public` directory:

```
public/
├── images/
│   ├── jewelry/
│   │   ├── necklace-1.jpg
│   │   ├── necklace-2.jpg
│   │   ├── earrings-1.jpg
│   │   ├── earrings-2.jpg
│   │   ├── bracelet-1.jpg
│   │   ├── ring-1.jpg
│   │   ├── set-1.jpg
│   │   └── anklet-1.jpg
│   ├── clothing/
│   │   ├── dress-1.jpg
│   │   ├── jumpsuit-1.jpg
│   │   ├── gele-1.jpg
│   │   ├── gown-1.jpg
│   │   ├── set-1.jpg
│   │   ├── blouse-1.jpg
│   │   ├── asoebi-1.jpg
│   │   └── kaftan-1.jpg
│   ├── gallery/
│   │   ├── image-1.jpg
│   │   ├── image-2.jpg
│   │   ├── image-3.jpg
│   │   └── ... (up to image-9.jpg)
│   ├── jewelry-featured-1.jpg
│   ├── jewelry-featured-2.jpg
│   └── clothing-featured-1.jpg
└── videos/
    ├── video-1.mp4
    ├── video-2.mp4
    ├── video-3.mp4
    └── video-4.mp4
```

## How to Update Content

### 1. Update Images

**Jewelry Collection:**
- Navigate to `src/pages/Jewelry.tsx`
- Find the `jewelryItems` array
- Replace image paths and item names as needed

**Clothing Collection:**
- Navigate to `src/pages/Clothing.tsx`
- Find the `clothingItems` array
- Replace image paths and item names as needed

**Gallery:**
- Navigate to `src/pages/Gallery.tsx`
- Update `galleryImages` array with new image paths
- Update `galleryVideos` array with new video paths

### 2. Update Contact Information

**WhatsApp Number:**
- Open `src/components/WhatsAppButton.tsx`
- Change the `whatsappNumber` variable (format: country code + number without +)
- Example: `2348012345678` for Nigerian number

**TikTok Handle:**
- Open `src/components/Footer.tsx`
- Update the TikTok link URL
- Also update in `src/pages/Gallery.tsx` and `src/pages/Contact.tsx`

### 3. Update Text Content

**Homepage Hero Section:**
- File: `src/pages/Home.tsx`
- Edit the tagline and call-to-action text

**About Page:**
- File: `src/pages/About.tsx`
- Update the story, values, and mission text

**Footer:**
- File: `src/components/Footer.tsx`
- Edit the brand description

### 4. Add More Items to Collections

To add more jewelry or clothing items:

1. Add the image to the appropriate folder
2. Open the corresponding page file
3. Add a new object to the array:

```javascript
{
  name: 'Item Name',
  category: 'Category',
  image: '/images/folder/filename.jpg',
}
```

### 5. Change Color Scheme

The site uses Tailwind CSS with these primary colors:
- **Primary:** Amber (amber-50, amber-100, amber-600, etc.)
- **Secondary:** Stone/Gray (stone-50, gray-900, etc.)
- **Accent:** Green (for WhatsApp button)

To change colors globally, search and replace color classes in all files.

## Image Specifications

### Recommended Image Sizes:
- **Jewelry items:** 800x800px (square)
- **Clothing items:** 800x1200px (portrait, 3:4 ratio)
- **Gallery images:** 1200x1200px (square)
- **Featured images:** 1200x1600px (portrait)

### Image Format:
- Use JPG for photographs
- Optimize images before uploading (recommended: under 500KB each)
- Use descriptive filenames

## Video Specifications

- **Format:** MP4 (H.264 codec)
- **Resolution:** 1080p or 720p
- **Duration:** Keep under 2 minutes for web performance
- **File size:** Compress to under 10MB if possible

## SEO Updates

To update meta tags for SEO:
1. Open `index.html`
2. Update the `<title>` tag
3. Add custom meta descriptions if needed

## Running the Development Server

```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## Support

For technical issues or questions about updating content, refer to the React and Vite documentation or contact your web developer.

---

**Note:** Always test changes locally before deploying to production. Keep backups of your media files.
