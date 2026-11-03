# Anthia & Ornaments - Developer Guide

## Content Management Guide

Product catalog changes should be made in the admin dashboard at `/admin`. In Supabase mode, products and uploaded images are shared across devices. Without Supabase credentials, the dashboard runs in local preview mode and changes are saved only in the current browser.

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
- Manage product images and details from the admin dashboard.

**Clothing Collection:**
- Manage product images and details from the admin dashboard.

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

### 4. Manage Products

Use the admin dashboard to add, edit, or delete products. Product records include a collection, category, description, available sizes, price, currency (NGN or USD), and image. Uploaded product images are stored in the `product-images` Supabase bucket when cloud mode is configured.

To enable cloud mode:

1. Run `supabase/schema.sql` in the Supabase SQL Editor.
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`.
3. Create an admin login under Supabase Authentication.
4. Add that user's email to `public.admin_users` using the SQL Editor. Only allowlisted accounts can change products or upload/delete product images.
5. Restart the development server or redeploy the site.

Use **Sync Seed to Cloud** in the dashboard to add the sample products once. The operation skips sample products already synced.

### Reset the Admin Password

On `/admin/login`, enter the admin email and select **Forgot password? Send reset link**. Open the Supabase email on the same computer, follow its link, and set a new password on `/admin/reset-password`. For local development, add `http://127.0.0.1:5173/admin/reset-password` to Supabase **Authentication > URL Configuration > Redirect URLs** if it is not already allowed. Never store admin passwords in the repository or share them in chat.

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
