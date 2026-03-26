import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ExternalLink, MessageCircle, ArrowLeft } from 'lucide-react';
import ImageModal from '../components/ImageModal';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  price?: string;
  type: 'jewelry' | 'clothing' | 'eyeglass' | 'perfume' | 'wristwatch';
}

const allProducts: Product[] = [
  // ── JEWELRY ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Gift Box',
    category: 'Varieties',
    description: 'A beautifully packaged gift box for your special occasions.',
    image: '/images/gift box.jpeg',
    type: 'jewelry',
  },
  {
    id: 2,
    name: 'Gift Package',
    category: 'Varieties',
    description: 'A curated gift package that includes a selection of our finest jewelry pieces.',
    image: '/images/gift package.jpeg',
    type: 'jewelry',
  },
  {
    id: 3,
    name: 'The Cherry Bloom Necklace',
    category: 'Necklaces',
    description: 'Soft. Playful. Feminine. Memorable. Sweet, but not childish 🍒 Because soft girls still like to be noticed.',
    image: '/images/necklace_3.png',
    price: '₦6,500',
    type: 'jewelry',
  },
  {
    id: 4,
    name: 'Gold Lock Necklace',
    category: 'Necklaces',
    description: 'Layered gold-tone chains designed to rest softly and speak with quiet confidence. Refined, balanced, and effortless.',
    image: '/images/gold lock necklace_1.jpg',
    price: '₦22,000',
    type: 'jewelry',
  },
  {
    id: 5,
    name: 'The Faith & Form Cross Chain',
    category: 'Necklaces',
    description: 'Not loud. Not forced. Just meaning and clean style.',
    image: '/images/necklace_1.jpg',
    price: '₦10,000',
    type: 'jewelry',
  },
  {
    id: 6,
    name: 'The Quiet Power Chain',
    category: 'Bracelets',
    description: 'Strong, subtle, very you.',
    image: '/images/bracelet_5.jpg',
    price: '₦8,500',
    type: 'jewelry',
  },
  {
    id: 7,
    name: 'The Quiet Power Chain (Silver)',
    category: 'Bracelets',
    description: 'Strong, subtle, very you.',
    image: '/images/bracelet_16.JPG',
    price: '₦8,500',
    type: 'jewelry',
  },
  {
    id: 8,
    name: 'The Silver Bar Duo (Cuff + Necklace combo)',
    category: 'Bracelet & Necklace Sets',
    description: 'For the one who likes their jewelry clean and intentional.',
    image: '/images/bracelet & necklace_1.jpg',
    price: '₦22,500',
    type: 'jewelry',
  },
  {
    id: 9,
    name: 'The Executive Chain Bracelets Collection',
    category: 'Bracelets',
    description: 'Statement chain bracelets designed for men who move with confidence and quiet authority. High-quality stainless steel, polished silver-tone, tarnish-resistant.',
    image: '/images/bracelet_4.jpg',
    price: '₦15,000',
    type: 'jewelry',
  },
  {
    id: 10,
    name: 'The Executive Chain Bracelets Collection',
    category: 'Bracelets',
    description: 'Statement chain bracelets designed for men who move with confidence and quiet authority.',
    image: '/images/bracelet_7.jpg',
    price: '₦15,000',
    type: 'jewelry',
  },
  {
    id: 11,
    name: 'The Executive Chain Bracelets Collection',
    category: 'Bracelets',
    description: 'Statement chain bracelets designed for men who move with confidence and quiet authority.',
    image: '/images/bracelet_10.jpeg',
    price: '₦15,000',
    type: 'jewelry',
  },
  {
    id: 12,
    name: 'The Executive Chain Bracelets Collection',
    category: 'Bracelets',
    description: 'Statement chain bracelets designed for men who move with confidence and quiet authority.',
    image: '/images/bracelet_12.jpeg',
    price: '₦15,000',
    type: 'jewelry',
  },
  {
    id: 13,
    name: 'The Executive Chain Bracelets Collection',
    category: 'Bracelets',
    description: 'Statement chain bracelets designed for men who move with confidence and quiet authority.',
    image: '/images/bracelet_13.jpeg',
    price: '₦15,000',
    type: 'jewelry',
  },
  {
    id: 14,
    name: 'The Executive Chain Bracelets Collection',
    category: 'Bracelets',
    description: 'Statement chain bracelets designed for men who move with confidence and quiet authority.',
    image: '/images/bracelet_14.jpeg',
    price: '₦15,000',
    type: 'jewelry',
  },
  {
    id: 15,
    name: 'The Executive Chain Bracelets Collection',
    category: 'Bracelets',
    description: 'Statement chain bracelets designed for men who move with confidence and quiet authority.',
    image: '/images/bracelet_15.jpeg',
    price: '₦15,000',
    type: 'jewelry',
  },
  {
    id: 16,
    name: 'Kaleia Aeris Earrings',
    category: 'Earrings',
    description: 'Delicate, yet impactful. Designed to add a touch of elegance and sparkle to your everyday style.',
    image: '/images/earring_1.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 17,
    name: 'Ice Cream Cone-Shaped Dangle Earrings',
    category: 'Earrings',
    description: 'Fun and whimsical earrings designed to add a playful touch while still maintaining elegance.',
    image: '/images/earring_2.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 18,
    name: 'Han Kou Earrings',
    category: 'Earrings',
    description: 'A bold and unique design combining traditional elements with a modern twist.',
    image: '/images/earring_3.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 19,
    name: 'Pearl Ear Studs',
    category: 'Earrings',
    description: 'Elegant and timeless pearl ear studs perfect for adding classic sophistication to any outfit.',
    image: '/images/earring_4.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 20,
    name: 'Gold-Toned Flower Earrings',
    category: 'Earrings',
    description: 'Delicate gold-toned flower earrings designed to add elegance and charm to any outfit.',
    image: '/images/earring_5.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 21,
    name: 'Statement Dangle Earrings',
    category: 'Earrings',
    description: 'Bold and eye-catching statement dangle earrings perfect for special occasions.',
    image: '/images/earring_6.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 22,
    name: 'Twisted Hoop Pearl Earrings',
    category: 'Earrings',
    description: 'A modern twist on the classic hoop earring with pearl accents.',
    image: '/images/earring_7.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 23,
    name: 'Gold-Plated Double Hoop Earrings',
    category: 'Earrings',
    description: 'Gold-plated double hoop earrings adding glamour for casual and formal occasions.',
    image: '/images/earring_8.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 24,
    name: 'Gold-Plated Flower Stud Earrings',
    category: 'Earrings',
    description: 'Gold-plated flower stud earrings for elegance and femininity.',
    image: '/images/earring_9.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 25,
    name: 'Gold-Toned Sculptural Floral Earrings',
    category: 'Earrings',
    description: 'Sculptural floral earrings with a gold-toned finish.',
    image: '/images/earring_10.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 26,
    name: 'Floral Gold-Toned Stud Earrings',
    category: 'Earrings',
    description: 'Floral gold-toned stud earrings for everyday wear or special occasions.',
    image: '/images/earring_11.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 27,
    name: 'Vintage Tiered Gold-Tone Flower Earrings',
    category: 'Earrings',
    description: 'Vintage tiered gold-tone flower earrings for casual and formal occasions.',
    image: '/images/earring_12.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 28,
    name: 'Gold-Plated Art Deco Swirl Dangle Earrings',
    category: 'Earrings',
    description: 'Gold-plated art deco swirl dangle earrings for vintage glamour.',
    image: '/images/earring_13.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 29,
    name: 'Gold Filigree Studs with Faux Pearl',
    category: 'Earrings',
    description: 'Gold-colored filigree studs featuring a central faux pearl for elegance.',
    image: '/images/earring_14.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 30,
    name: 'Gold-Toned Wire Bow Earrings',
    category: 'Earrings',
    description: 'Gold-toned wire bow earrings for everyday wear or special occasions.',
    image: '/images/earring_15.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 31,
    name: 'Gold-Colored Flower Earrings',
    category: 'Earrings',
    description: 'Gold-colored flower earrings featuring a metallic floral design.',
    image: '/images/earring_16.jpeg',
    price: '₦4,599',
    type: 'jewelry',
  },
  {
    id: 32,
    name: 'Square Charm Necklace',
    category: 'Necklaces',
    description: 'A statement necklace combining intricate design with a touch of glamour.',
    image: '/images/necklace-1.jpeg',
    price: '₦7,000',
    type: 'jewelry',
  },
  {
    id: 33,
    name: 'Golden Tanmaniya Necklace',
    category: 'Necklaces',
    description: 'A stunning gold chain necklace with a delicate pendant.',
    image: '/images/necklace-2.jpeg',
    price: '₦7,000',
    type: 'jewelry',
  },
  {
    id: 34,
    name: 'Palmonas Golden Dragonfly Dance Necklace',
    category: 'Necklaces',
    description: 'A whimsical necklace featuring a golden dragonfly pendant.',
    image: '/images/necklace-3.jpeg',
    price: '₦7,000',
    type: 'jewelry',
  },
  {
    id: 35,
    name: 'Golden Hearts Layered Necklace',
    category: 'Necklaces',
    description: 'A layered necklace featuring delicate golden hearts.',
    image: '/images/necklace-4.jpeg',
    price: '₦7,000',
    type: 'jewelry',
  },
  {
    id: 36,
    name: 'Gold Necklace',
    category: 'Necklaces',
    description: 'A classic gold necklace that adds elegance and sophistication to any outfit.',
    image: '/images/necklace-5.jpeg',
    price: '₦7,000',
    type: 'jewelry',
  },
  {
    id: 37,
    name: 'Sparrow Gold Necklace',
    category: 'Necklaces',
    description: 'A delicate gold necklace featuring a charming sparrow pendant.',
    image: '/images/necklace-6.jpeg',
    price: '₦7,000',
    type: 'jewelry',
  },
  {
    id: 38,
    name: 'The Vita Ambita Kai Bracelet',
    category: 'Bracelets',
    description: 'A bold and unique bracelet combining intricate design with a touch of glamour.',
    image: '/images/gold bracelet.jpeg',
    price: '₦6,500 each',
    type: 'jewelry',
  },
  {
    id: 39,
    name: 'Cartier Juste un Clou Style Bangle',
    category: 'Bracelets',
    description: 'A sleek and modern bangle that adds sophistication and edge to any outfit.',
    image: '/images/cartier bracelet.jpeg',
    price: '₦6,000',
    type: 'jewelry',
  },
  {
    id: 40,
    name: 'Jewelry Set',
    category: 'Sets',
    description: 'A stunning jewelry set including a necklace, bracelet, and earrings.',
    image: '/images/jewelry set.jpeg',
    price: '₦15,000',
    type: 'jewelry',
  },
  {
    id: 41,
    name: 'Gold-Plated Teardrop Necklace, Earring & Bangle Set',
    category: 'Sets',
    description: 'A beautiful gold-plated jewelry set featuring a teardrop necklace, earring, and bangle.',
    image: '/images/gold set.jpeg',
    price: '₦15,000',
    type: 'jewelry',
  },

  // ── CLOTHING ─────────────────────────────────────────────────────────────────
  {
    id: 101,
    name: 'The Green Regal Poise Gown ✨',
    category: 'Gown',
    description: 'Statement kaftan-style gown made from brocade fabric perfect for cultural gatherings, elegant outings, and everyday luxury.',
    image: '/images/clothing_3.png',
    price: '₦25,000',
    type: 'clothing',
  },
  {
    id: 102,
    name: 'The Orange Regal Poise Gown ✨',
    category: 'Gown',
    description: 'Statement kaftan-style gown made from brocade fabric perfect for cultural gatherings, elegant outings, and everyday luxury.',
    image: '/images/clothing_6.png',
    price: '₦25,000',
    type: 'clothing',
  },
  {
    id: 103,
    name: 'The Classic Ivory Boubou 🤍',
    category: 'Boubou',
    description: 'Soft luxury flowing, free-size boubou with effortless elegance. Available in multiple colours. Perfect for outings, errands, and events.',
    image: '/images/clothing_7.png',
    price: '₦16,000',
    type: 'clothing',
  },
  {
    id: 104,
    name: 'The Royal Violet Poise Gown ✨',
    category: 'Gown',
    description: 'Statement kaftan-style gown made from brocade fabric perfect for cultural gatherings, elegant outings, and everyday luxury.',
    image: '/images/clothing_8.png',
    price: '₦25,000',
    type: 'clothing',
  },
  {
    id: 105,
    name: 'The Aurelia Heritage Boubou ✨',
    category: 'Boubou',
    description: 'Royal mustard gold with intricate woven embroidery along a deep V-neckline. A flowing, full-length silhouette for ease, grace, and undeniable presence.',
    image: '/images/clothing_9.png',
    price: '₦25,000',
    type: 'clothing',
  },
  {
    id: 106,
    name: 'Aurelia Flow 🤍',
    category: 'Gown',
    description: 'Soft V-neckline, adjustable tie sleeves, flattering cinched waist. Where strength meets softness. Designed to move with you.',
    image: '/images/clothing_10.png',
    price: '₦16,000',
    type: 'clothing',
  },
  {
    id: 107,
    name: 'The Rosé Whisper Boubou 🎀',
    category: 'Dresses',
    description: 'A flowing, free-fit silhouette with a soft V-neck and delicate ribbon details. For the woman who leads with softness and shows up with presence.',
    image: '/images/clothing_11.png',
    price: '₦16,000',
    type: 'clothing',
  },
  {
    id: 108,
    name: 'The Blue Regal Poise Gown ✨',
    category: 'Gown',
    description: 'Brocade fabric perfect for cultural gatherings, elegant outings, and everyday luxury.',
    image: '/images/clothing_12.png',
    price: '₦25,000',
    type: 'clothing',
  },
  {
    id: 109,
    name: 'The Red Regal Poise Gown ✨',
    category: 'Gown',
    description: 'Brocade fabric perfect for cultural gatherings, elegant outings, and everyday luxury.',
    image: '/images/clothing_13.png',
    price: '₦25,000',
    type: 'clothing',
  },

  // ── WRISTWATCHES ─────────────────────────────────────────────────────────────
  {
    id: 201,
    name: 'Unisex Cartier Medium',
    category: 'Wristwatches',
    description: 'Luxurious presence on the wrist. Soft noise. Fully boxed.',
    image: '/images/Cartier_1.jpg',
    price: '₦140,000',
    type: 'wristwatch',
  },
  {
    id: 202,
    name: 'Unisex Cartier Medium',
    category: 'Wristwatches',
    description: 'Luxurious presence on the wrist. Soft noise. Fully boxed.',
    image: '/images/Cartier_2.jpg',
    price: '₦140,000',
    type: 'wristwatch',
  },
  {
    id: 203,
    name: 'Unisex Cartier Medium',
    category: 'Wristwatches',
    description: 'Luxurious presence on the wrist. Soft noise. Fully boxed.',
    image: '/images/cartier_3.jpg',
    price: '₦140,000',
    type: 'wristwatch',
  },
  {
    id: 204,
    name: 'Unisex Cartier Medium',
    category: 'Wristwatches',
    description: 'Luxurious presence on the wrist. Soft noise. Fully boxed.',
    image: '/images/cartier_4.jpg',
    price: '₦140,000',
    type: 'wristwatch',
  },
  {
    id: 205,
    name: 'The Chanel Wristwatch',
    category: 'Wristwatches',
    description: 'Bold and sophisticated wristwatch design.',
    image: '/images/chanel_1.jpg',
    price: '₦180,000',
    type: 'wristwatch',
  },
  {
    id: 206,
    name: 'The Chanel Wristwatch',
    category: 'Wristwatches',
    description: 'Bold and sophisticated wristwatch design.',
    image: '/images/chanel_2.jpg',
    price: '₦180,000',
    type: 'wristwatch',
  },
  {
    id: 207,
    name: 'The Chanel Wristwatch',
    category: 'Wristwatches',
    description: 'Bold and sophisticated wristwatch design.',
    image: '/images/chanel_3.jpg',
    price: '₦180,000',
    type: 'wristwatch',
  },
  {
    id: 208,
    name: 'The Daniel Wellington Wristwatch',
    category: 'Wristwatches',
    description: 'Classic and versatile wristwatch for everyday elegance.',
    image: '/images/DW.jpg',
    price: '₦25,000',
    type: 'wristwatch',
  },
  {
    id: 209,
    name: 'POEDAGAR Leather Wristwatch',
    category: 'Wristwatches',
    description: 'Waterproof with sapphire glass. Comes with branded box, warranty card and carrier bag.',
    image: '/images/poedagar_1.jpg',
    price: '₦40,000',
    type: 'wristwatch',
  },
  {
    id: 210,
    name: 'POEDAGAR Leather Wristwatch',
    category: 'Wristwatches',
    description: 'Waterproof with sapphire glass. Comes with branded box, warranty card and carrier bag.',
    image: '/images/poedagar_2.jpg',
    price: '₦40,000',
    type: 'wristwatch',
  },
  {
    id: 211,
    name: 'POEDAGAR Leather Wristwatch',
    category: 'Wristwatches',
    description: 'Waterproof with sapphire glass. Comes with branded box, warranty card and carrier bag.',
    image: '/images/poedagar_3.jpg',
    price: '₦40,000',
    type: 'wristwatch',
  },
  {
    id: 212,
    name: 'POEDAGAR Leather Wristwatch',
    category: 'Wristwatches',
    description: 'Waterproof with sapphire glass. Comes with branded box, warranty card and carrier bag.',
    image: '/images/poedagar_4.jpg',
    price: '₦40,000',
    type: 'wristwatch',
  },
  {
    id: 213,
    name: 'POEDAGAR Leather Wristwatch',
    category: 'Wristwatches',
    description: 'Waterproof with sapphire glass. Comes with branded box, warranty card and carrier bag.',
    image: '/images/poedagar_5.jpg',
    price: '₦40,000',
    type: 'wristwatch',
  },
  {
    id: 214,
    name: 'POEDAGAR Leather Wristwatch',
    category: 'Wristwatches',
    description: 'Waterproof with sapphire glass. Comes with branded box, warranty card and carrier bag.',
    image: '/images/poedagar_6.jpg',
    price: '₦40,000',
    type: 'wristwatch',
  },
  {
    id: 215,
    name: 'POEDAGAR Leather Wristwatch',
    category: 'Wristwatches',
    description: 'Waterproof with sapphire glass. Comes with branded box, warranty card and carrier bag.',
    image: '/images/poedagar_7.jpg',
    price: '₦40,000',
    type: 'wristwatch',
  },
  {
    id: 216,
    name: 'POEDAGAR Leather Wristwatch',
    category: 'Wristwatches',
    description: 'Waterproof with sapphire glass. Comes with branded box, warranty card and carrier bag.',
    image: '/images/poedagar_8.jpg',
    price: '₦40,000',
    type: 'wristwatch',
  },
  {
    id: 217,
    name: 'Anthiaornaments | POEDAGAR',
    category: 'Wristwatches',
    description: 'Chronograph-inspired, leather-finished. Built for structure, designed for everyday precision.',
    image: '/images/poedagar_9.jpeg',
    price: '₦35,000',
    type: 'wristwatch',
  },
  {
    id: 218,
    name: 'The Tomi Signature Gentleman Set',
    category: 'Wristwatches',
    description: 'For the man who likes his style clean, intentional, and timeless. No noise. Just class.',
    image: '/images/Tomi_1.jpg',
    price: '₦40,000',
    type: 'wristwatch',
  },
  {
    id: 219,
    name: 'Vacheron Constantin',
    category: 'Wristwatches',
    description: 'Sleek design with a refined finish that speaks presence and precision.',
    image: '/images/Vacheron_1.jpg',
    price: '₦125,000',
    type: 'wristwatch',
  },
  {
    id: 220,
    name: 'Vacheron Constantin',
    category: 'Wristwatches',
    description: 'Sleek design with a refined finish that speaks presence and precision.',
    image: '/images/Vacheron_2.jpg',
    price: '₦125,000',
    type: 'wristwatch',
  },
  {
    id: 221,
    name: 'Vacheron Constantin',
    category: 'Wristwatches',
    description: 'Sleek design with a refined finish that speaks presence and precision.',
    image: '/images/Vacheron_3.jpg',
    price: '₦125,000',
    type: 'wristwatch',
  },
  {
    id: 222,
    name: 'Vacheron Constantin',
    category: 'Wristwatches',
    description: 'Sleek design with a refined finish that speaks presence and precision.',
    image: '/images/Vacheron_4.jpg',
    price: '₦125,000',
    type: 'wristwatch',
  },
  {
    id: 223,
    name: 'Vacheron Constantin',
    category: 'Wristwatches',
    description: 'Sleek design with a refined finish that speaks presence and precision.',
    image: '/images/Vacheron_5.jpg',
    price: '₦125,000',
    type: 'wristwatch',
  },
  {
    id: 224,
    name: 'Vacheron Constantin',
    category: 'Wristwatches',
    description: 'Sleek design with a refined finish that speaks presence and precision.',
    image: '/images/Vacheron_6.jpg',
    price: '₦125,000',
    type: 'wristwatch',
  },
  {
    id: 225,
    name: 'Vacheron Constantin',
    category: 'Wristwatches',
    description: 'Sleek design with a refined finish that speaks presence and precision.',
    image: '/images/Vacheron_7.jpg',
    price: '₦125,000',
    type: 'wristwatch',
  },
  {
    id: 226,
    name: 'Vacheron Constantin',
    category: 'Wristwatches',
    description: 'Sleek design with a refined finish that speaks presence and precision.',
    image: '/images/Vacheron_8.jpg',
    price: '₦125,000',
    type: 'wristwatch',
  },
  {
    id: 227,
    name: 'Vacheron Constantin',
    category: 'Wristwatches',
    description: 'Sleek design with a refined finish that speaks presence and precision.',
    image: '/images/Vacheron_9.jpg',
    price: '₦125,000',
    type: 'wristwatch',
  },
  {
    id: 228,
    name: 'Vacheron Constantin',
    category: 'Wristwatches',
    description: 'Sleek design with a refined finish that speaks presence and precision.',
    image: '/images/Vacheron_10.jpg',
    price: '₦125,000',
    type: 'wristwatch',
  },
  {
    id: 229,
    name: '✨THE ROLEX EDIT✨',
    category: 'Wristwatches',
    description: 'For legacy. For presence. For quiet authority. Crafted with iconic detailing, finished in timeless two-tone steel and gold.',
    image: '/images/rolex.jpeg',
    price: '₦22,000',
    type: 'wristwatch',
  },
  {
    id: 230,
    name: 'Rolex Oyster Perpetual Day-Date Watch',
    category: 'Wristwatches',
    description: 'A timeless masterpiece combining elegance with precision. A symbol of luxury and sophistication.',
    image: '/images/rolex-1.jpeg',
    price: '₦45,000 box inclusive',
    type: 'wristwatch',
  },
  {
    id: 231,
    name: 'Casio Quartz Wristwatch Set',
    category: 'Wristwatches',
    description: 'A sleek and stylish Casio quartz wristwatch paired with a matching bracelet.',
    image: '/images/casio.jpeg',
    price: '₦35,000 box inclusive',
    type: 'wristwatch',
  },

  // ── PERFUMES ─────────────────────────────────────────────────────────────────
  {
    id: 301,
    name: 'Pana Dora Swiss Oud',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/pandora.jpeg',
    price: '₦125,000',
    type: 'perfume',
  },
  {
    id: 302,
    name: 'Qaed Al Fursan',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/perfume_12.jpeg',
    price: '₦40,000',
    type: 'perfume',
  },
  {
    id: 303,
    name: 'Emporio Armani Stronger With You Intensely & Lattafa Pride Vintage Radio',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/perfume_13.jpeg',
    price: '₦140,000',
    type: 'perfume',
  },
  {
    id: 304,
    name: 'Club de Nuit Int',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/perfume_1.JPG',
    price: '₦65,000',
    type: 'perfume',
  },
  {
    id: 305,
    name: 'KHAMRAH Perfume',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/perfume_2.JPG',
    price: '₦12,000',
    type: 'perfume',
  },
  {
    id: 306,
    name: 'SAHEB Perfume',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/perfume_3.JPG',
    price: '₦12,000',
    type: 'perfume',
  },
  {
    id: 307,
    name: 'ASAD Lattafa Perfume',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/perfume_4.JPG',
    price: '₦47,000',
    type: 'perfume',
  },
  {
    id: 308,
    name: 'The Official Crystal Intense Perfume',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/perfume_5.JPG',
    price: '₦12,000',
    type: 'perfume',
  },
  {
    id: 309,
    name: 'AZZARO THE MOST WANTED',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/perfume_6.JPG',
    price: '₦38,000',
    type: 'perfume',
  },
  {
    id: 310,
    name: 'Ard Al Zaafaran Mousuf Eau De Parfum',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/perfume_7.JPG',
    price: '₦20,000',
    type: 'perfume',
  },
  {
    id: 311,
    name: 'NOW (RAVE) Perfume',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/perfume_8.JPG',
    price: '₦19,000',
    type: 'perfume',
  },
  {
    id: 312,
    name: 'SUPREMACY Perfume',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/perfume_9.JPG',
    price: '₦65,000',
    type: 'perfume',
  },
  {
    id: 313,
    name: '9 PM Fragrance Perfume',
    category: 'Perfumes',
    description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
    image: '/images/perfume_11.JPG',
    price: '₦12,000',
    type: 'perfume',
  },

  // ── EYEGLASSES ───────────────────────────────────────────────────────────────
  {
    id: 401,
    name: 'Designer Prada Eyeglasses',
    category: 'Eyeglasses',
    description: 'Stylish frames with premium lenses for clear vision under the sun.',
    image: '/images/prada.png',
    price: '₦20,000',
    type: 'eyeglass',
  },
  {
    id: 402,
    name: 'Cartier Gradient Lens Eyeglasses',
    category: 'Eyeglasses',
    description: 'Luxury frames with gradient lenses for a sophisticated look.',
    image: '/images/cartier.png',
    price: '₦20,000',
    type: 'eyeglass',
  },
  {
    id: 403,
    name: 'Vintage Round Frame Eyeglasses',
    category: 'Eyeglasses',
    description: 'Timeless round frames for a vintage-inspired style.',
    image: '/images/prada_2.png',
    price: '₦22,000',
    type: 'eyeglass',
  },
  {
    id: 404,
    name: 'Chic Square Frame Eyeglasses',
    category: 'Eyeglasses',
    description: 'Chic square frames for a contemporary appearance.',
    image: '/images/prada_3.png',
    price: '₦20,000',
    type: 'eyeglass',
  },
  {
    id: 405,
    name: 'Transparent Frame Eyeglasses',
    category: 'Eyeglasses',
    description: 'Transparent frames for a modern and versatile look.',
    image: '/images/prada_4.png',
    price: '₦22,000',
    type: 'eyeglass',
  },
];

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.type.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const handleWhatsAppClick = (itemName: string) => {
    const message = `Hello! I'm interested in the ${itemName}. Can you provide more details?`;
    window.open(`https://wa.me/2348124238750?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-xl text-gray-600">
            {query ? `Results for "${query}"` : 'Enter a search query'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {searchResults.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600 mb-4">
                {query ? 'No products found matching your search.' : 'Please enter a search term.'}
              </p>
              <button
                onClick={() => navigate('/')}
                className="inline-block px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Browse All Products
              </button>
            </div>
          ) : (
            <>
              <p className="text-lg text-gray-600 mb-8">
                Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <div
                    key={`${product.type}-${product.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-amber-100 to-stone-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:brightness-105 transition-all"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                      <div className="absolute inset-0 flex items-center justify-center gap-3 transition-transform duration-300 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                        <button
                          onClick={() =>
                            setSelectedImage({
                              src: product.image,
                              alt: product.name,
                              title: product.name,
                            })
                          }
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg transition-all font-medium"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleWhatsAppClick(product.name)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all font-medium"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Inquire
                        </button>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      {product.price && (
                        <p className="text-lg font-semibold text-amber-600 mt-3">
                          {product.price}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <ImageModal
        isOpen={selectedImage !== null}
        imageSrc={selectedImage?.src || ''}
        imageAlt={selectedImage?.alt || ''}
        imageTitle={selectedImage?.title || ''}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}